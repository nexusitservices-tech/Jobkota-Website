import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Briefcase,
  Users,
  Search,
  Phone,
  Mail,
  MapPin,
  Calendar,
  DollarSign,
  Download,
  Building,
  CheckCircle2,
  Clock,
  MessageSquare,
  FileSpreadsheet,
  AlertCircle,
  Save,
  Check,
  Copy,
} from "lucide-react";
import { base44, WorkforceRequestEntity } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";

export default function WorkforceManager() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedRequest, setSelectedRequest] = useState<WorkforceRequestEntity | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [notes, setNotes] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const { data: requests = [], isLoading } = useQuery<WorkforceRequestEntity[]>({
    queryKey: ["workforce_requests"],
    queryFn: () => base44.entities.WorkforceRequest.list("-created_date", 200),
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<WorkforceRequestEntity> }) => {
      return base44.entities.WorkforceRequest.update(id, updates);
    },
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: ["workforce_requests"] });
      if (selectedRequest?.id === updated.id) {
        setSelectedRequest(updated);
      }
      toast({
        title: "Mandate Updated",
        description: "Workforce request status and notes saved.",
        variant: "success",
      });
    },
  });

  const filteredRequests = useMemo(() => {
    return requests.filter((req) => {
      if (statusFilter !== "all" && req.status !== statusFilter) return false;
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        return (
          req.company.toLowerCase().includes(q) ||
          req.contact_name.toLowerCase().includes(q) ||
          req.email.toLowerCase().includes(q) ||
          (req.phone && req.phone.toLowerCase().includes(q)) ||
          req.position.toLowerCase().includes(q) ||
          (req.location && req.location.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [requests, statusFilter, searchTerm]);

  const handleExportCsv = () => {
    if (filteredRequests.length === 0) {
      toast({
        title: "No Data",
        description: "No workforce mandates match the current filter.",
        variant: "destructive",
      });
      return;
    }

    const headers = [
      "ID",
      "Company",
      "Contact Person",
      "Email",
      "Phone",
      "Position",
      "Headcount Needed",
      "Employment Type",
      "Location",
      "Budget",
      "Start Date",
      "Status",
      "Notes",
    ];

    const rows = filteredRequests.map((r) => [
      `"${r.id}"`,
      `"${r.company.replace(/"/g, '""')}"`,
      `"${r.contact_name.replace(/"/g, '""')}"`,
      `"${r.email}"`,
      `"${(r.phone || "").replace(/"/g, '""')}"`,
      `"${r.position.replace(/"/g, '""')}"`,
      r.employees_needed || "",
      `"${r.employment_type || ""}"`,
      `"${(r.location || "").replace(/"/g, '""')}"`,
      `"${(r.budget || "").replace(/"/g, '""')}"`,
      `"${r.start_date || ""}"`,
      `"${r.status}"`,
      `"${(r.notes || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\r\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `JobKota_Workforce_Mandates_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadge = (status: WorkforceRequestEntity["status"]) => {
    switch (status) {
      case "Active":
        return <Badge variant="success">Active Mandate</Badge>;
      case "In Review":
        return <Badge variant="warning">In Review</Badge>;
      case "Fulfilled":
        return <Badge variant="signal">Fulfilled</Badge>;
      case "Closed":
        return <Badge variant="secondary">Closed</Badge>;
      default:
        return <Badge variant="outline">New Request</Badge>;
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
              placeholder="Search by company, contact person, role, location..."
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
              <option value="all">All Mandates ({requests.length})</option>
              <option value="New">New ({requests.filter((r) => r.status === "New").length})</option>
              <option value="In Review">In Review</option>
              <option value="Active">Active</option>
              <option value="Fulfilled">Fulfilled</option>
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

      {/* Requests Grid */}
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-28 rounded-2xl bg-muted/40 animate-pulse border border-border" />
          ))}
        </div>
      ) : filteredRequests.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border bg-card p-12 text-center space-y-3">
          <Building className="h-10 w-10 text-muted-foreground mx-auto" />
          <h3 className="text-xl font-bold text-foreground">No workforce mandates found.</h3>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            Corporate talent requests submitted via /employers/request-talent will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredRequests.map((req) => {
            const cleanPhone = req.phone?.replace(/[^0-9]/g, "") || "";
            const waUrl = cleanPhone ? `https://wa.me/${cleanPhone}` : null;

            return (
              <div
                key={req.id}
                className="p-5 rounded-2xl border border-border bg-card shadow-xs transition-all hover:border-foreground/20 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
              >
                <div className="space-y-2 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4
                      onClick={() => {
                        setSelectedRequest(req);
                        setNotes(req.notes || "");
                        setModalOpen(true);
                      }}
                      className="text-base font-bold text-foreground hover:text-primary cursor-pointer hover:underline truncate"
                    >
                      {req.position}
                    </h4>
                    {getStatusBadge(req.status)}
                    {req.employees_needed && (
                      <span className="text-[11px] font-bold bg-signal/20 text-foreground border border-signal/30 px-2 py-0.5 rounded-full">
                        {req.employees_needed} Openings Needed
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground flex items-center gap-1">
                      <Building className="h-3.5 w-3.5 text-signal" />
                      {req.company}
                    </span>
                    <span>·</span>
                    <span>Contact: {req.contact_name}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {req.location || "UAE"}
                    </span>
                    {req.budget && (
                      <>
                        <span>·</span>
                        <span className="font-medium text-foreground">{req.budget}</span>
                      </>
                    )}
                  </div>

                  {req.notes && (
                    <p className="text-[11px] text-muted-foreground italic bg-muted/40 px-2.5 py-1 rounded-lg line-clamp-1 inline-block">
                      Recruiter Note: {req.notes}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between lg:justify-end gap-2.5 pt-3 lg:pt-0 border-t lg:border-t-0 border-border/60 shrink-0">
                  {req.phone && (
                    <a
                      href={`tel:${req.phone}`}
                      className="p-2 rounded-xl bg-muted/70 hover:bg-muted text-foreground border border-border transition-colors"
                      title={`Call ${req.phone}`}
                    >
                      <Phone className="h-3.5 w-3.5 text-emerald-600" />
                    </a>
                  )}

                  <a
                    href={`mailto:${req.email}?subject=${encodeURIComponent(
                      `JobKota: ${req.position} Mandate for ${req.company}`
                    )}`}
                    className="p-2 rounded-xl bg-muted/70 hover:bg-muted text-foreground border border-border transition-colors"
                    title={`Email ${req.email}`}
                  >
                    <Mail className="h-3.5 w-3.5" />
                  </a>

                  {waUrl && (
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-xl bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20 border border-emerald-500/20 transition-colors"
                      title="WhatsApp Client"
                    >
                      <MessageSquare className="h-3.5 w-3.5" />
                    </a>
                  )}

                  <select
                    value={req.status}
                    onChange={(e) =>
                      updateMutation.mutate({
                        id: req.id,
                        updates: { status: e.target.value as WorkforceRequestEntity["status"] },
                      })
                    }
                    className="h-9 rounded-xl border border-input bg-card px-2.5 text-xs font-semibold text-foreground cursor-pointer"
                  >
                    <option value="New">New</option>
                    <option value="In Review">In Review</option>
                    <option value="Active">Active</option>
                    <option value="Fulfilled">Fulfilled</option>
                    <option value="Closed">Closed</option>
                  </select>

                  <Button
                    variant="signal"
                    size="sm"
                    onClick={() => {
                      setSelectedRequest(req);
                      setNotes(req.notes || "");
                      setModalOpen(true);
                    }}
                    className="h-9 text-xs font-bold cursor-pointer"
                  >
                    Manage Mandate
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Mandate Details Modal */}
      {selectedRequest && (
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogContent
            className="max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8"
            onClose={() => setModalOpen(false)}
          >
            <DialogHeader>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-signal">
                    Corporate Workforce Mandate
                  </span>
                  <DialogTitle className="text-xl font-black text-foreground mt-0.5">
                    {selectedRequest.position}
                  </DialogTitle>
                  <p className="text-xs text-muted-foreground mt-1">
                    {selectedRequest.company} · Headcount: {selectedRequest.employees_needed || "Multiple"}
                  </p>
                </div>
                {getStatusBadge(selectedRequest.status)}
              </div>
            </DialogHeader>

            <div className="space-y-5 pt-2">
              {/* Client Contact Hub */}
              <div className="p-4 rounded-2xl bg-muted/40 border border-border/80 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Client Point of Contact
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[10px] text-muted-foreground uppercase font-bold block">
                      Authorized Representative
                    </span>
                    <span className="font-bold text-foreground text-sm">
                      {selectedRequest.contact_name}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground uppercase font-bold block">
                      Target Start Date
                    </span>
                    <span className="font-semibold text-foreground">
                      {selectedRequest.start_date || "Immediate / ASAP"}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground uppercase font-bold block">
                      Direct Email
                    </span>
                    <a
                      href={`mailto:${selectedRequest.email}`}
                      className="font-bold text-primary hover:underline"
                    >
                      {selectedRequest.email}
                    </a>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground uppercase font-bold block">
                      Phone / Mobile
                    </span>
                    <a
                      href={`tel:${selectedRequest.phone || ""}`}
                      className="font-bold text-foreground hover:underline"
                    >
                      {selectedRequest.phone || "Not provided"}
                    </a>
                  </div>
                </div>
              </div>

              {/* Mandate Specifications */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-card border border-border">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase block">
                    Headcount Required
                  </span>
                  <span className="font-mono text-lg font-black text-foreground">
                    {selectedRequest.employees_needed || "Open"}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-card border border-border">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase block">
                    Employment Type
                  </span>
                  <span className="font-bold text-foreground">
                    {selectedRequest.employment_type || "Contract / Full-time"}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-card border border-border">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase block">
                    Allocated Budget
                  </span>
                  <span className="font-bold text-foreground">
                    {selectedRequest.budget || "Negotiable"}
                  </span>
                </div>
              </div>

              {/* Skills & Requirements */}
              {(selectedRequest.skills || selectedRequest.requirements) && (
                <div className="p-4 rounded-2xl bg-card border border-border space-y-2 text-xs">
                  <span className="font-bold uppercase text-muted-foreground tracking-wider block">
                    Required Competencies & Scope
                  </span>
                  {selectedRequest.skills && (
                    <p className="text-foreground">
                      <span className="font-bold">Skills:</span> {selectedRequest.skills}
                    </p>
                  )}
                  {selectedRequest.requirements && (
                    <p className="text-foreground/90 mt-1">
                      <span className="font-bold">Special Terms:</span> {selectedRequest.requirements}
                    </p>
                  )}
                </div>
              )}

              {/* Internal Notes & Status */}
              <div className="space-y-3 pt-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-foreground uppercase tracking-wider">
                    Internal Recruiter Notes & Pipeline Status
                  </label>
                  <select
                    value={selectedRequest.status}
                    onChange={(e) =>
                      updateMutation.mutate({
                        id: selectedRequest.id,
                        updates: { status: e.target.value as WorkforceRequestEntity["status"] },
                      })
                    }
                    className="h-8 rounded-lg border border-input bg-card px-2 text-xs font-bold text-foreground cursor-pointer"
                  >
                    <option value="New">New</option>
                    <option value="In Review">In Review</option>
                    <option value="Active">Active</option>
                    <option value="Fulfilled">Fulfilled</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>

                <Textarea
                  placeholder="Record mandate briefing notes, candidate dossiers sent, interview dates, visa clearance progress..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="text-xs min-h-[90px]"
                />

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
                        id: selectedRequest.id,
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
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
