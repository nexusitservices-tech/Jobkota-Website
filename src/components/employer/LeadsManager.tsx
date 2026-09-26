import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  MessageSquare,
  Search,
  Phone,
  Mail,
  Building,
  Calendar,
  Download,
  CheckCircle2,
  Clock,
  Save,
  Tag,
} from "lucide-react";
import { base44, LeadEntity } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";

export default function LeadsManager() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [topicFilter, setTopicFilter] = useState("all");
  const [selectedLead, setSelectedLead] = useState<LeadEntity | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [notes, setNotes] = useState("");

  const { data: leads = [], isLoading } = useQuery<LeadEntity[]>({
    queryKey: ["leads"],
    queryFn: () => base44.entities.Lead.list("-created_date", 200),
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<LeadEntity> }) => {
      return base44.entities.Lead.update(id, updates);
    },
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
      if (selectedLead?.id === updated.id) {
        setSelectedLead(updated);
      }
      toast({
        title: "Lead Updated",
        description: "Inquiry status and notes saved.",
        variant: "success",
      });
    },
  });

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      if (statusFilter !== "all" && lead.status !== statusFilter) return false;
      if (topicFilter !== "all" && lead.topic !== topicFilter) return false;
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        return (
          lead.name.toLowerCase().includes(q) ||
          (lead.company && lead.company.toLowerCase().includes(q)) ||
          lead.email.toLowerCase().includes(q) ||
          (lead.phone && lead.phone.toLowerCase().includes(q)) ||
          (lead.message && lead.message.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [leads, statusFilter, topicFilter, searchTerm]);

  const handleExportCsv = () => {
    if (filteredLeads.length === 0) {
      toast({
        title: "No Data",
        description: "No inquiries match the current filter.",
        variant: "destructive",
      });
      return;
    }

    const headers = ["ID", "Name", "Company", "Email", "Phone", "Topic", "Status", "Date", "Message", "Notes"];
    const rows = filteredLeads.map((l) => [
      `"${l.id}"`,
      `"${l.name.replace(/"/g, '""')}"`,
      `"${(l.company || "").replace(/"/g, '""')}"`,
      `"${l.email}"`,
      `"${(l.phone || "").replace(/"/g, '""')}"`,
      `"${(l.topic || "").replace(/"/g, '""')}"`,
      `"${l.status}"`,
      `"${new Date(l.created_date).toISOString()}"`,
      `"${(l.message || "").replace(/"/g, '""')}"`,
      `"${(l.notes || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\r\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `JobKota_Inquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadge = (status: LeadEntity["status"]) => {
    switch (status) {
      case "Qualified":
      case "Active Client":
        return <Badge variant="success">{status}</Badge>;
      case "Proposal":
        return <Badge variant="signal">{status}</Badge>;
      case "Contacted":
        return <Badge variant="warning">{status}</Badge>;
      case "Closed":
        return <Badge variant="secondary">{status}</Badge>;
      default:
        return <Badge variant="outline">New Inquiry</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Filter and Actions */}
      <div className="rounded-2xl border border-border bg-card p-4 space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by client name, company, email, inquiry content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 h-10 text-xs"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-10 rounded-xl border border-input bg-card px-3 text-xs font-semibold text-foreground cursor-pointer"
            >
              <option value="all">All Statuses ({leads.length})</option>
              <option value="New Lead">New Lead</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Proposal">Proposal</option>
              <option value="Active Client">Active Client</option>
              <option value="Closed">Closed</option>
            </select>

            <Button
              variant="outline"
              size="sm"
              onClick={handleExportCsv}
              className="h-10 text-xs font-bold gap-2 cursor-pointer shrink-0"
            >
              <Download className="h-4 w-4" />
              <span>Export CSV</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Leads List */}
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-24 rounded-2xl bg-muted/40 animate-pulse border border-border" />
          ))}
        </div>
      ) : filteredLeads.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border bg-card p-12 text-center space-y-3">
          <MessageSquare className="h-10 w-10 text-muted-foreground mx-auto" />
          <h3 className="text-xl font-bold text-foreground">No inquiries found.</h3>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            Contact messages and enterprise service inquiries will show up here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredLeads.map((lead) => {
            return (
              <div
                key={lead.id}
                className="p-5 rounded-2xl border border-border bg-card shadow-xs transition-all hover:border-foreground/20 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
              >
                <div className="space-y-2 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4
                      onClick={() => {
                        setSelectedLead(lead);
                        setNotes(lead.notes || "");
                        setModalOpen(true);
                      }}
                      className="text-base font-bold text-foreground hover:text-primary cursor-pointer hover:underline truncate"
                    >
                      {lead.name}
                    </h4>
                    {lead.company && (
                      <span className="text-xs font-semibold text-muted-foreground">
                        ({lead.company})
                      </span>
                    )}
                    {getStatusBadge(lead.status)}
                    {lead.topic && (
                      <span className="text-[11px] font-bold bg-muted text-foreground px-2 py-0.5 rounded-md border border-border">
                        {lead.topic}
                      </span>
                    )}
                  </div>

                  {lead.message && (
                    <p className="text-xs text-foreground/80 line-clamp-1 italic">
                      "{lead.message}"
                    </p>
                  )}

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      {lead.email}
                    </span>
                    {lead.phone && (
                      <>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {lead.phone}
                        </span>
                      </>
                    )}
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(lead.created_date).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between lg:justify-end gap-2.5 pt-3 lg:pt-0 border-t lg:border-t-0 border-border/60 shrink-0">
                  {lead.phone && (
                    <a
                      href={`tel:${lead.phone}`}
                      className="p-2 rounded-xl bg-muted/70 hover:bg-muted text-foreground border border-border transition-colors"
                      title="Call Lead"
                    >
                      <Phone className="h-3.5 w-3.5 text-emerald-600" />
                    </a>
                  )}

                  <a
                    href={`mailto:${lead.email}?subject=${encodeURIComponent(
                      `JobKota Response: ${lead.topic || "Inquiry"}`
                    )}`}
                    className="p-2 rounded-xl bg-muted/70 hover:bg-muted text-foreground border border-border transition-colors"
                    title="Send Email"
                  >
                    <Mail className="h-3.5 w-3.5" />
                  </a>

                  <select
                    value={lead.status}
                    onChange={(e) =>
                      updateMutation.mutate({
                        id: lead.id,
                        updates: { status: e.target.value as LeadEntity["status"] },
                      })
                    }
                    className="h-9 rounded-xl border border-input bg-card px-2.5 text-xs font-semibold text-foreground cursor-pointer"
                  >
                    <option value="New Lead">New Lead</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Qualified">Qualified</option>
                    <option value="Proposal">Proposal</option>
                    <option value="Active Client">Active Client</option>
                    <option value="Closed">Closed</option>
                  </select>

                  <Button
                    variant="signal"
                    size="sm"
                    onClick={() => {
                      setSelectedLead(lead);
                      setNotes(lead.notes || "");
                      setModalOpen(true);
                    }}
                    className="h-9 text-xs font-bold cursor-pointer"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Inquiry Detail Modal */}
      {selectedLead && (
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogContent
            className="max-w-xl max-h-[90vh] overflow-y-auto p-6 sm:p-8"
            onClose={() => setModalOpen(false)}
          >
            <DialogHeader>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-signal">
                    Corporate Inquiry Details
                  </span>
                  <DialogTitle className="text-xl font-black text-foreground mt-0.5">
                    {selectedLead.name}
                  </DialogTitle>
                  <p className="text-xs text-muted-foreground">
                    {selectedLead.company || "Independent Client"} · {selectedLead.topic || "General"}
                  </p>
                </div>
                {getStatusBadge(selectedLead.status)}
              </div>
            </DialogHeader>

            <div className="space-y-4 pt-2">
              <div className="p-4 rounded-2xl bg-muted/40 border border-border space-y-2 text-xs">
                <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-wider block">
                  Contact Coordinates
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <span className="text-muted-foreground block text-[11px]">Email:</span>
                    <a href={`mailto:${selectedLead.email}`} className="font-bold text-primary hover:underline">
                      {selectedLead.email}
                    </a>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[11px]">Phone:</span>
                    <a href={`tel:${selectedLead.phone || ""}`} className="font-bold text-foreground hover:underline">
                      {selectedLead.phone || "Not provided"}
                    </a>
                  </div>
                </div>
              </div>

              {selectedLead.message && (
                <div className="p-4 rounded-2xl bg-card border border-border space-y-1.5 text-xs">
                  <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-wider block">
                    Message Body
                  </span>
                  <p className="text-foreground leading-relaxed italic">
                    "{selectedLead.message}"
                  </p>
                </div>
              )}

              <div className="space-y-2 pt-2">
                <label className="text-xs font-bold text-foreground uppercase tracking-wider">
                  Internal Sales Notes
                </label>
                <Textarea
                  placeholder="Record follow-up calls, client requirements, pricing quotes..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="text-xs min-h-[90px]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setModalOpen(false)}
                  className="text-xs font-semibold"
                >
                  Close
                </Button>
                <Button
                  variant="signal"
                  size="sm"
                  onClick={() => {
                    updateMutation.mutate({
                      id: selectedLead.id,
                      updates: { notes },
                    });
                  }}
                  className="text-xs font-bold gap-1.5 cursor-pointer"
                >
                  <Save className="h-3.5 w-3.5" />
                  <span>Save Notes</span>
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
