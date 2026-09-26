import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Users,
  Search,
  Filter,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Star,
  Copy,
  Check,
  Download,
  UserPlus,
  ExternalLink,
  MessageSquare,
  Briefcase,
  ChevronDown,
  LayoutList,
  LayoutGrid,
  Eye,
  SlidersHorizontal,
  Trash2,
} from "lucide-react";
import { base44, ApplicationEntity, JobEntity } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import ApplicantDetailModal from "./ApplicantDetailModal";
import AddApplicantModal from "./AddApplicantModal";

interface ApplicantsManagerProps {
  initialJobFilter?: string;
  onJobFilterChange?: (jobId: string) => void;
}

export default function ApplicantsManager({
  initialJobFilter = "all",
  onJobFilterChange,
}: ApplicantsManagerProps) {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [jobFilter, setJobFilter] = useState(initialJobFilter);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [ratingFilter, setRatingFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [viewMode, setViewMode] = useState<"table" | "cards">("table");

  const [selectedApplicant, setSelectedApplicant] = useState<ApplicationEntity | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Queries
  const { data: applications = [], isLoading: isLoadingApps } = useQuery<ApplicationEntity[]>({
    queryKey: ["applications"],
    queryFn: () => base44.entities.Application.list("-created_date", 500),
  });

  const { data: jobs = [] } = useQuery<JobEntity[]>({
    queryKey: ["jobs"],
    queryFn: () => base44.entities.Job.list("-created_date", 200),
  });

  // Mutations
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: ApplicationEntity["status"] }) => {
      return base44.entities.Application.update(id, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
  });

  const updateApplicantMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<ApplicationEntity> }) => {
      return base44.entities.Application.update(id, updates);
    },
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      if (selectedApplicant?.id === updated.id) {
        setSelectedApplicant(updated);
      }
    },
  });

  const deleteApplicantMutation = useMutation({
    mutationFn: async (id: string) => {
      return base44.entities.Application.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      toast({
        title: "Candidate Removed",
        description: "Application record removed successfully.",
        variant: "default",
      });
    },
  });

  // KPI calculations
  const stats = useMemo(() => {
    const total = applications.length;
    const applied = applications.filter((a) => a.status === "Applied").length;
    const underReview = applications.filter((a) => a.status === "Under Review").length;
    const shortlisted = applications.filter((a) => a.status === "Shortlisted").length;
    const interview = applications.filter((a) => a.status === "Interview").length;
    const selected = applications.filter((a) => a.status === "Selected").length;
    return { total, applied, underReview, shortlisted, interview, selected };
  }, [applications]);

  // Filtering and Sorting
  const filteredApplicants = useMemo(() => {
    let result = [...applications];

    if (jobFilter !== "all") {
      result = result.filter((a) => a.job_id === jobFilter);
    }

    if (statusFilter !== "all") {
      result = result.filter((a) => a.status === statusFilter);
    }

    if (ratingFilter !== "all") {
      const minRating = Number(ratingFilter);
      result = result.filter((a) => (a.rating || 0) >= minRating);
    }

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter(
        (a) =>
          a.full_name.toLowerCase().includes(q) ||
          a.email.toLowerCase().includes(q) ||
          (a.phone && a.phone.toLowerCase().includes(q)) ||
          (a.location && a.location.toLowerCase().includes(q)) ||
          a.job_title.toLowerCase().includes(q) ||
          a.company.toLowerCase().includes(q) ||
          (a.notes && a.notes.toLowerCase().includes(q))
      );
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.created_date).getTime() - new Date(a.created_date).getTime();
      }
      if (sortBy === "oldest") {
        return new Date(a.created_date).getTime() - new Date(b.created_date).getTime();
      }
      if (sortBy === "name") {
        return a.full_name.localeCompare(b.full_name);
      }
      if (sortBy === "rating") {
        return (b.rating || 0) - (a.rating || 0);
      }
      return 0;
    });

    return result;
  }, [applications, jobFilter, statusFilter, ratingFilter, searchTerm, sortBy]);

  // Export to CSV
  const handleExportCsv = () => {
    if (filteredApplicants.length === 0) {
      toast({
        title: "No Data to Export",
        description: "There are no applicants matching the current filters.",
        variant: "destructive",
      });
      return;
    }

    const headers = [
      "ID",
      "Full Name",
      "Email Address",
      "Phone Number",
      "Location",
      "Applied Job Title",
      "Company",
      "Status",
      "Rating (1-5)",
      "Applied Date",
      "Interview Date",
      "Recruiter Notes",
    ];

    const rows = filteredApplicants.map((app) => [
      `"${app.id}"`,
      `"${app.full_name.replace(/"/g, '""')}"`,
      `"${app.email}"`,
      `"${(app.phone || "").replace(/"/g, '""')}"`,
      `"${(app.location || "").replace(/"/g, '""')}"`,
      `"${app.job_title.replace(/"/g, '""')}"`,
      `"${app.company.replace(/"/g, '""')}"`,
      `"${app.status}"`,
      app.rating || "",
      `"${new Date(app.created_date).toISOString()}"`,
      `"${app.interview_date ? new Date(app.interview_date).toISOString() : ""}"`,
      `"${(app.notes || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\r\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `JobKota_Candidates_Export_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Export Generated",
      description: `Downloaded ${filteredApplicants.length} candidate contacts as CSV.`,
      variant: "success",
    });
  };

  const handleCopyContact = (app: ApplicationEntity) => {
    const contactText = `${app.full_name} | ${app.job_title} (${app.company})\nEmail: ${app.email}${
      app.phone ? `\nPhone: ${app.phone}` : ""
    }${app.location ? `\nLocation: ${app.location}` : ""}`;
    navigator.clipboard.writeText(contactText);
    setCopiedId(app.id);
    toast({
      title: "Contact Info Copied",
      description: `Copied contact details for ${app.full_name}.`,
      variant: "success",
    });
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getStatusBadgeVariant = (status: ApplicationEntity["status"]) => {
    switch (status) {
      case "Selected":
        return "success";
      case "Shortlisted":
      case "Interview":
        return "signal";
      case "Under Review":
        return "warning";
      case "Rejected":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      {/* KPI Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <button
          type="button"
          onClick={() => setStatusFilter("all")}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
            statusFilter === "all"
              ? "bg-signal/15 border-signal shadow-xs"
              : "bg-card border-border hover:border-foreground/20"
          }`}
        >
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
            Total Candidates
          </span>
          <span className="font-mono text-2xl font-black text-foreground mt-1 block">
            {stats.total}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setStatusFilter("Applied")}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
            statusFilter === "Applied"
              ? "bg-signal/15 border-signal shadow-xs"
              : "bg-card border-border hover:border-foreground/20"
          }`}
        >
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
            New / Applied
          </span>
          <span className="font-mono text-2xl font-black text-foreground mt-1 block">
            {stats.applied}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setStatusFilter("Under Review")}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
            statusFilter === "Under Review"
              ? "bg-signal/15 border-signal shadow-xs"
              : "bg-card border-border hover:border-foreground/20"
          }`}
        >
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 block">
            Under Review
          </span>
          <span className="font-mono text-2xl font-black text-amber-600 mt-1 block">
            {stats.underReview}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setStatusFilter("Shortlisted")}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
            statusFilter === "Shortlisted"
              ? "bg-signal/15 border-signal shadow-xs"
              : "bg-card border-border hover:border-foreground/20"
          }`}
        >
          <span className="text-[10px] font-bold uppercase tracking-wider text-signal font-extrabold block">
            Shortlisted
          </span>
          <span className="font-mono text-2xl font-black text-foreground mt-1 block">
            {stats.shortlisted}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setStatusFilter("Interview")}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
            statusFilter === "Interview"
              ? "bg-signal/15 border-signal shadow-xs"
              : "bg-card border-border hover:border-foreground/20"
          }`}
        >
          <span className="text-[10px] font-bold uppercase tracking-wider text-foreground block">
            In Interview
          </span>
          <span className="font-mono text-2xl font-black text-foreground mt-1 block">
            {stats.interview}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setStatusFilter("Selected")}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
            statusFilter === "Selected"
              ? "bg-emerald-500/15 border-emerald-500 shadow-xs"
              : "bg-card border-border hover:border-foreground/20"
          }`}
        >
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 block">
            Selected / Hired
          </span>
          <span className="font-mono text-2xl font-black text-emerald-600 mt-1 block">
            {stats.selected}
          </span>
        </button>
      </div>

      {/* Control & Search Toolbar */}
      <div className="rounded-2xl border border-border bg-card p-4 space-y-4 shadow-xs">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search candidate by name, email, phone, location, job, notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 h-10 text-xs"
            />
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportCsv}
              className="h-10 text-xs font-bold gap-2 cursor-pointer"
            >
              <Download className="h-4 w-4" />
              <span>Export CSV ({filteredApplicants.length})</span>
            </Button>

            <Button
              variant="signal"
              size="sm"
              onClick={() => setAddModalOpen(true)}
              className="h-10 text-xs font-bold gap-2 cursor-pointer"
            >
              <UserPlus className="h-4 w-4" />
              <span>Add Candidate</span>
            </Button>

            {/* View Mode Toggle */}
            <div className="flex items-center border border-border rounded-xl p-0.5 bg-muted/40">
              <button
                type="button"
                onClick={() => setViewMode("table")}
                className={`p-2 rounded-lg transition-colors cursor-pointer ${
                  viewMode === "table"
                    ? "bg-card text-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                title="List View"
              >
                <LayoutList className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("cards")}
                className={`p-2 rounded-lg transition-colors cursor-pointer ${
                  viewMode === "cards"
                    ? "bg-card text-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                title="Grid Cards View"
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Dropdowns Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1 border-t border-border/60">
          {/* Job Filter */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Filter by Mandate / Job
            </label>
            <select
              value={jobFilter}
              onChange={(e) => {
                setJobFilter(e.target.value);
                if (onJobFilterChange) onJobFilterChange(e.target.value);
              }}
              className="w-full h-9 rounded-xl border border-input bg-card px-3 text-xs font-semibold text-foreground cursor-pointer"
            >
              <option value="all">All Positions ({applications.length})</option>
              {jobs.map((j) => {
                const count = applications.filter((a) => a.job_id === j.id).length;
                return (
                  <option key={j.id} value={j.id}>
                    {j.title} ({count})
                  </option>
                );
              })}
            </select>
          </div>

          {/* Status Filter */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Pipeline Stage
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full h-9 rounded-xl border border-input bg-card px-3 text-xs font-semibold text-foreground cursor-pointer"
            >
              <option value="all">All Stages ({stats.total})</option>
              <option value="Applied">Applied ({stats.applied})</option>
              <option value="Under Review">Under Review ({stats.underReview})</option>
              <option value="Shortlisted">Shortlisted ({stats.shortlisted})</option>
              <option value="Interview">Interview ({stats.interview})</option>
              <option value="Selected">Selected ({stats.selected})</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          {/* Rating Filter */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Candidate Rating
            </label>
            <select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
              className="w-full h-9 rounded-xl border border-input bg-card px-3 text-xs font-semibold text-foreground cursor-pointer"
            >
              <option value="all">All Ratings</option>
              <option value="5">★ 5 Stars Only</option>
              <option value="4">★ 4 Stars & Above</option>
              <option value="3">★ 3 Stars & Above</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full h-9 rounded-xl border border-input bg-card px-3 text-xs font-semibold text-foreground cursor-pointer"
            >
              <option value="newest">Newest Applications</option>
              <option value="oldest">Oldest Applications</option>
              <option value="name">Candidate Name (A-Z)</option>
              <option value="rating">Highest Rated First</option>
            </select>
          </div>
        </div>
      </div>

      {/* Candidate List Display */}
      {isLoadingApps ? (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className="h-24 rounded-2xl border border-border bg-muted/40 animate-pulse p-4"
            />
          ))}
        </div>
      ) : filteredApplicants.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border bg-card p-12 text-center space-y-4">
          <Users className="h-10 w-10 text-muted-foreground mx-auto" />
          <h3 className="text-xl font-bold text-foreground">
            No applicants found matching your filters.
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-sm mx-auto">
            Try adjusting your search query, selecting "All Positions", or adding a candidate manually.
          </p>
          <div className="pt-2 flex items-center justify-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchTerm("");
                setJobFilter("all");
                setStatusFilter("all");
                setRatingFilter("all");
              }}
              className="font-bold text-xs"
            >
              Reset Filters
            </Button>
            <Button
              variant="signal"
              size="sm"
              onClick={() => setAddModalOpen(true)}
              className="font-bold text-xs gap-1.5"
            >
              <UserPlus className="h-4 w-4" />
              <span>Add Candidate</span>
            </Button>
          </div>
        </div>
      ) : viewMode === "table" ? (
        /* Table / List View */
        <div className="space-y-3">
          {filteredApplicants.map((applicant) => {
            const cleanPhone = applicant.phone?.replace(/[^0-9]/g, "") || "";
            const whatsappUrl = cleanPhone
              ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                  `Hello ${applicant.full_name}, JobKota recruiter team contacting you regarding the ${applicant.job_title} role.`
                )}`
              : null;

            return (
              <div
                key={applicant.id}
                className="p-4 sm:p-5 rounded-2xl border border-border bg-card shadow-xs transition-all hover:border-foreground/20 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
              >
                {/* Left: Avatar & Candidate Info */}
                <div className="flex items-start gap-3.5 min-w-0">
                  <div className="h-12 w-12 rounded-xl bg-signal/20 text-foreground font-black flex items-center justify-center text-sm border border-signal/30 shrink-0">
                    {applicant.full_name
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </div>

                  <div className="space-y-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4
                        onClick={() => {
                          setSelectedApplicant(applicant);
                          setDetailModalOpen(true);
                        }}
                        className="text-base font-bold text-foreground hover:text-primary cursor-pointer hover:underline truncate"
                      >
                        {applicant.full_name}
                      </h4>

                      <Badge variant={getStatusBadgeVariant(applicant.status)}>
                        {applicant.status}
                      </Badge>

                      {/* Interactive Star rating */}
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() =>
                              updateApplicantMutation.mutate({
                                id: applicant.id,
                                updates: { rating: star },
                              })
                            }
                            className="p-0.5 cursor-pointer hover:scale-110 transition-transform"
                            title={`Rate ${star} star`}
                          >
                            <Star
                              className={`h-3 w-3 ${
                                star <= (applicant.rating || 0)
                                  ? "fill-amber-400 text-amber-500"
                                  : "text-muted-foreground/30"
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Applied Role & Company */}
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
                      <span className="font-semibold text-foreground/90 flex items-center gap-1">
                        <Briefcase className="h-3 w-3 text-signal" />
                        {applicant.job_title}
                      </span>
                      <span>·</span>
                      <span>{applicant.company}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {applicant.location || "Dubai, UAE"}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(applicant.created_date).toLocaleDateString()}
                      </span>
                    </div>

                    {/* Recruiter Notes excerpt if present */}
                    {applicant.notes && (
                      <p className="text-[11px] text-muted-foreground line-clamp-1 italic bg-muted/40 px-2 py-0.5 rounded-md inline-block mt-0.5">
                        Note: {applicant.notes}
                      </p>
                    )}
                  </div>
                </div>

                {/* Right: Contact Hub & Actions */}
                <div className="flex flex-wrap sm:flex-nowrap items-center justify-between lg:justify-end gap-2.5 pt-3 lg:pt-0 border-t lg:border-t-0 border-border/60 shrink-0">
                  {/* Phone action */}
                  {applicant.phone && (
                    <div className="flex items-center gap-1">
                      <a
                        href={`tel:${applicant.phone}`}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-muted/70 hover:bg-muted text-xs font-bold text-foreground border border-border transition-colors"
                        title={`Call ${applicant.phone}`}
                      >
                        <Phone className="h-3.5 w-3.5 text-emerald-600" />
                        <span className="hidden sm:inline">{applicant.phone}</span>
                      </a>

                      {whatsappUrl && (
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-xl bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20 border border-emerald-500/20 transition-colors"
                          title="WhatsApp Chat"
                        >
                          <MessageSquare className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  )}

                  {/* Email action */}
                  <a
                    href={`mailto:${applicant.email}?subject=${encodeURIComponent(
                      `JobKota Application: ${applicant.job_title}`
                    )}`}
                    className="p-2 rounded-xl bg-muted/70 hover:bg-muted text-foreground border border-border transition-colors"
                    title={`Email ${applicant.email}`}
                  >
                    <Mail className="h-3.5 w-3.5" />
                  </a>

                  {/* Copy Contact action */}
                  <button
                    type="button"
                    onClick={() => handleCopyContact(applicant)}
                    className="p-2 rounded-xl bg-muted/70 hover:bg-muted text-foreground border border-border transition-colors cursor-pointer"
                    title="Copy Contact Card"
                  >
                    {copiedId === applicant.id ? (
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </button>

                  {/* Quick Pipeline Status Dropdown */}
                  <select
                    value={applicant.status}
                    onChange={(e) =>
                      updateStatusMutation.mutate({
                        id: applicant.id,
                        status: e.target.value as ApplicationEntity["status"],
                      })
                    }
                    className="h-8 rounded-xl border border-input bg-card px-2 text-xs font-semibold text-foreground cursor-pointer"
                  >
                    <option value="Applied">Applied</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Shortlisted">Shortlisted</option>
                    <option value="Interview">Interview</option>
                    <option value="Selected">Selected</option>
                    <option value="Rejected">Rejected</option>
                  </select>

                  {/* View Full Dossier Button */}
                  <Button
                    variant="signal"
                    size="sm"
                    onClick={() => {
                      setSelectedApplicant(applicant);
                      setDetailModalOpen(true);
                    }}
                    className="h-8 text-xs font-bold gap-1 cursor-pointer shrink-0"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    <span>View Dossier</span>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Cards Grid View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredApplicants.map((applicant) => {
            const cleanPhone = applicant.phone?.replace(/[^0-9]/g, "") || "";
            const whatsappUrl = cleanPhone
              ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                  `Hello ${applicant.full_name}, contacting regarding your application for ${applicant.job_title}.`
                )}`
              : null;

            return (
              <div
                key={applicant.id}
                className="p-5 rounded-3xl border border-border bg-card shadow-xs transition-all hover:border-foreground/20 flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="h-11 w-11 rounded-2xl bg-signal/20 text-foreground font-black flex items-center justify-center text-sm border border-signal/30 shrink-0">
                        {applicant.full_name
                          .split(" ")
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join("")}
                      </div>
                      <div>
                        <h4
                          onClick={() => {
                            setSelectedApplicant(applicant);
                            setDetailModalOpen(true);
                          }}
                          className="font-bold text-foreground text-sm hover:underline cursor-pointer"
                        >
                          {applicant.full_name}
                        </h4>
                        <p className="text-[11px] text-muted-foreground">
                          {applicant.location || "Dubai, UAE"}
                        </p>
                      </div>
                    </div>

                    <Badge variant={getStatusBadgeVariant(applicant.status)}>
                      {applicant.status}
                    </Badge>
                  </div>

                  <div className="mt-3 pt-3 border-t border-border/60 space-y-1.5 text-xs">
                    <p className="font-semibold text-foreground flex items-center gap-1.5">
                      <Briefcase className="h-3.5 w-3.5 text-signal shrink-0" />
                      <span className="truncate">{applicant.job_title}</span>
                    </p>
                    <p className="text-muted-foreground text-[11px] pl-5">
                      {applicant.company}
                    </p>
                  </div>

                  {/* Rating */}
                  <div className="mt-3 flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-3 w-3 ${
                          star <= (applicant.rating || 0)
                            ? "fill-amber-400 text-amber-500"
                            : "text-muted-foreground/30"
                        }`}
                      />
                    ))}
                    <span className="text-[10px] text-muted-foreground ml-1">
                      {applicant.rating ? `${applicant.rating}/5` : "Unrated"}
                    </span>
                  </div>

                  {applicant.notes && (
                    <p className="mt-2 text-[11px] text-muted-foreground bg-muted/40 p-2 rounded-xl line-clamp-2 italic">
                      "{applicant.notes}"
                    </p>
                  )}
                </div>

                {/* Bottom Card Controls */}
                <div className="pt-3 border-t border-border flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    {applicant.phone && (
                      <a
                        href={`tel:${applicant.phone}`}
                        className="p-1.5 rounded-lg bg-muted text-foreground hover:bg-muted/80 transition-colors"
                        title="Call Candidate"
                      >
                        <Phone className="h-3.5 w-3.5 text-emerald-600" />
                      </a>
                    )}
                    <a
                      href={`mailto:${applicant.email}`}
                      className="p-1.5 rounded-lg bg-muted text-foreground hover:bg-muted/80 transition-colors"
                      title="Email Candidate"
                    >
                      <Mail className="h-3.5 w-3.5" />
                    </a>
                    {whatsappUrl && (
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20 transition-colors"
                        title="WhatsApp"
                      >
                        <MessageSquare className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>

                  <Button
                    variant="signal"
                    size="sm"
                    onClick={() => {
                      setSelectedApplicant(applicant);
                      setDetailModalOpen(true);
                    }}
                    className="h-8 text-xs font-bold cursor-pointer"
                  >
                    View Dossier
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modals */}
      <ApplicantDetailModal
        applicant={selectedApplicant}
        open={detailModalOpen}
        onOpenChange={setDetailModalOpen}
        onUpdateStatus={(id, status) => updateStatusMutation.mutate({ id, status })}
        onUpdateApplicant={(id, updates) => updateApplicantMutation.mutate({ id, updates })}
        onDeleteApplicant={(id) => deleteApplicantMutation.mutate(id)}
      />

      <AddApplicantModal
        open={addModalOpen}
        onOpenChange={setAddModalOpen}
        jobs={jobs}
        onApplicantCreated={() => queryClient.invalidateQueries({ queryKey: ["applications"] })}
      />
    </div>
  );
}
