import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Plus,
  Briefcase,
  CheckCircle2,
  FileText,
  Clock,
  Users,
  Search,
  Building,
  MessageSquare,
  BarChart3,
  RotateCcw,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";
import useSeo from "@/lib/useSeo";
import {
  base44,
  JobEntity,
  ApplicationEntity,
  WorkforceRequestEntity,
  LeadEntity,
} from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";
import JobRow from "@/components/employer/JobRow";
import ApplicantsManager from "@/components/employer/ApplicantsManager";
import WorkforceManager from "@/components/employer/WorkforceManager";
import LeadsManager from "@/components/employer/LeadsManager";
import AdminAnalytics from "@/components/employer/AdminAnalytics";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";

type TabKey = "applicants" | "jobs" | "workforce" | "leads" | "analytics";

export default function EmployerDashboard() {
  useSeo(
    "Admin & Employer Management Console",
    "Comprehensive workforce portal to manage applicants, contact candidates, corporate mandates, and job listings."
  );

  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();

  const tabParam = (searchParams.get("tab") as TabKey) || "applicants";
  const initialJobFilter = searchParams.get("jobId") || "all";

  const [activeTab, setActiveTab] = useState<TabKey>(tabParam);
  const [selectedJobFilter, setSelectedJobFilter] = useState<string>(initialJobFilter);
  const [jobSearchTerm, setJobSearchTerm] = useState("");
  const [jobStatusFilter, setJobStatusFilter] = useState<string>("all");
  const [resetDialogOpen, setResetDialogOpen] = useState(false);

  // Sync state when URL params change
  useEffect(() => {
    const t = searchParams.get("tab") as TabKey;
    if (t && ["applicants", "jobs", "workforce", "leads", "analytics"].includes(t)) {
      setActiveTab(t);
    }
    const jId = searchParams.get("jobId");
    if (jId) {
      setSelectedJobFilter(jId);
    }
  }, [searchParams]);

  const handleTabChange = (tab: TabKey, jobId?: string) => {
    setActiveTab(tab);
    const newParams = new URLSearchParams(searchParams);
    newParams.set("tab", tab);
    if (jobId) {
      newParams.set("jobId", jobId);
      setSelectedJobFilter(jobId);
    } else if (tab !== "applicants") {
      newParams.delete("jobId");
    }
    setSearchParams(newParams);
  };

  // Queries
  const { data: allJobs = [], isLoading: isLoadingJobs } = useQuery<JobEntity[]>({
    queryKey: ["jobs"],
    queryFn: () => base44.entities.Job.list("-created_date", 300),
  });

  const { data: allApplications = [] } = useQuery<ApplicationEntity[]>({
    queryKey: ["applications"],
    queryFn: () => base44.entities.Application.list("-created_date", 500),
  });

  const { data: allWorkforce = [] } = useQuery<WorkforceRequestEntity[]>({
    queryKey: ["workforce_requests"],
    queryFn: () => base44.entities.WorkforceRequest.list("-created_date", 300),
  });

  const { data: allLeads = [] } = useQuery<LeadEntity[]>({
    queryKey: ["leads"],
    queryFn: () => base44.entities.Lead.list("-created_date", 300),
  });

  // Compute application count map by job_id
  const appCountMap: Record<string, number> = {};
  for (const app of allApplications) {
    if (app.job_id) {
      appCountMap[app.job_id] = (appCountMap[app.job_id] || 0) + 1;
    }
  }

  // Filter jobs
  const userJobs = allJobs.filter((j) => {
    if (!user) return true;
    if (user.role === "admin") return true;
    return j.created_by_id === user.id;
  });

  const totalListings = userJobs.length;
  const publishedListings = userJobs.filter((j) => j.status === "Published").length;

  // Status mutation for jobs
  const statusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: JobEntity["status"] }) => {
      return base44.entities.Job.update(id, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      toast({
        title: "Position Updated",
        description: "Listing status successfully changed.",
        variant: "default",
      });
    },
  });

  // Delete mutation for jobs
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return base44.entities.Job.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      toast({
        title: "Position Removed",
        description: "Job posting permanently deleted.",
        variant: "default",
      });
    },
  });

  // Filtered display jobs
  const displayedJobs = userJobs.filter((job) => {
    if (jobStatusFilter !== "all" && job.status !== jobStatusFilter) return false;
    if (jobSearchTerm.trim()) {
      const q = jobSearchTerm.toLowerCase();
      const inTitle = job.title.toLowerCase().includes(q);
      const inCompany = job.company.toLowerCase().includes(q);
      const inLoc = job.location.toLowerCase().includes(q);
      return inTitle || inCompany || inLoc;
    }
    return true;
  });

  // Reset demo data handler
  const handleResetDemoData = () => {
    base44.demo.resetToSeedData();
    queryClient.invalidateQueries();
    setResetDialogOpen(false);
    toast({
      title: "Data Re-seeded",
      description: "Restored sample candidates, corporate mandates, and client inquiries.",
      variant: "success",
    });
  };

  return (
    <div className="min-h-screen bg-background pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Header Console */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-border">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest text-signal font-black">
                JobKota Management Portal
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-signal/20 text-foreground border border-signal/40 px-2 py-0.5 rounded-full">
                <ShieldCheck className="h-3 w-3 text-signal" />
                <span>Verified Admin Console</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
              Recruitment & Candidate Operations
            </h1>

            <p className="text-xs text-muted-foreground">
              Authenticated Session:{" "}
              <span className="font-bold text-foreground">{user?.email || "admiin@jobkota.com"}</span>{" "}
              ({user?.role?.toUpperCase() || "ADMIN"}) · Active Regional Pipeline
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Reset / Reseed Demo Data */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setResetDialogOpen(true)}
              className="text-xs font-bold gap-1.5 cursor-pointer text-muted-foreground hover:text-foreground"
              title="Reset sample candidate files and mandates"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset Sample Data</span>
            </Button>

            {/* Post Job Action */}
            <Link to="/dashboard/post">
              <Button variant="signal" size="default" className="font-bold text-xs gap-2 cursor-pointer shadow-xs">
                <Plus className="h-4 w-4" />
                <span>Post New Position</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Modern Elevated Tab Navigation */}
        <div className="flex items-center gap-1 border-b border-border/80 overflow-x-auto pb-0.5 no-scrollbar">
          <button
            type="button"
            onClick={() => handleTabChange("applicants")}
            className={`flex items-center gap-2 px-5 py-3 rounded-t-2xl text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "applicants"
                ? "border-signal text-foreground bg-muted/40"
                : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/20"
            }`}
          >
            <Users className="h-4 w-4" />
            <span>Candidates & Contacts</span>
            <span
              className={`text-[11px] font-mono font-black px-2 py-0.5 rounded-full ${
                activeTab === "applicants"
                  ? "bg-signal text-primary"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {allApplications.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange("jobs")}
            className={`flex items-center gap-2 px-5 py-3 rounded-t-2xl text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "jobs"
                ? "border-signal text-foreground bg-muted/40"
                : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/20"
            }`}
          >
            <Briefcase className="h-4 w-4" />
            <span>Job Postings</span>
            <span
              className={`text-[11px] font-mono font-black px-2 py-0.5 rounded-full ${
                activeTab === "jobs"
                  ? "bg-signal text-primary"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {totalListings}
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange("workforce")}
            className={`flex items-center gap-2 px-5 py-3 rounded-t-2xl text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "workforce"
                ? "border-signal text-foreground bg-muted/40"
                : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/20"
            }`}
          >
            <Building className="h-4 w-4" />
            <span>Workforce Mandates</span>
            <span
              className={`text-[11px] font-mono font-black px-2 py-0.5 rounded-full ${
                activeTab === "workforce"
                  ? "bg-signal text-primary"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {allWorkforce.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange("leads")}
            className={`flex items-center gap-2 px-5 py-3 rounded-t-2xl text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "leads"
                ? "border-signal text-foreground bg-muted/40"
                : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/20"
            }`}
          >
            <MessageSquare className="h-4 w-4" />
            <span>Client Inquiries</span>
            <span
              className={`text-[11px] font-mono font-black px-2 py-0.5 rounded-full ${
                activeTab === "leads"
                  ? "bg-signal text-primary"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {allLeads.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange("analytics")}
            className={`flex items-center gap-2 px-5 py-3 rounded-t-2xl text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "analytics"
                ? "border-signal text-foreground bg-muted/40"
                : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/20"
            }`}
          >
            <BarChart3 className="h-4 w-4" />
            <span>Analytics & KPIs</span>
          </button>
        </div>

        {/* Tab 1: Candidates & Contacts CRM */}
        {activeTab === "applicants" && (
          <div className="space-y-4 animate-in fade-in-50 duration-200">
            <ApplicantsManager
              initialJobFilter={selectedJobFilter}
              onJobFilterChange={(jobId) => setSelectedJobFilter(jobId)}
            />
          </div>
        )}

        {/* Tab 2: Job Postings */}
        {activeTab === "jobs" && (
          <div className="space-y-6 animate-in fade-in-50 duration-200">
            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-card border border-border p-4 rounded-2xl shadow-xs">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Filter by title, company, or city..."
                  value={jobSearchTerm}
                  onChange={(e) => setJobSearchTerm(e.target.value)}
                  className="pl-9 h-10 text-xs"
                />
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <span className="text-xs text-muted-foreground font-semibold shrink-0">
                  Status:
                </span>
                <select
                  value={jobStatusFilter}
                  onChange={(e) => setJobStatusFilter(e.target.value)}
                  className="h-10 rounded-xl border border-input bg-card px-3 text-xs font-semibold text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-pointer"
                >
                  <option value="all">All Positions ({totalListings})</option>
                  <option value="Published">Published ({publishedListings})</option>
                  <option value="Draft">Draft</option>
                  <option value="Pending Review">Pending Review</option>
                  <option value="Paused">Paused</option>
                  <option value="Closed">Closed</option>
                </select>

                <Link to="/dashboard/post">
                  <Button variant="signal" size="sm" className="h-10 font-bold text-xs gap-1.5">
                    <Plus className="h-4 w-4" />
                    <span>Post Job</span>
                  </Button>
                </Link>
              </div>
            </div>

            {/* List of Jobs */}
            {isLoadingJobs ? (
              <div className="space-y-3">
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className="h-24 rounded-2xl border border-border bg-muted/40 animate-pulse p-4"
                  />
                ))}
              </div>
            ) : displayedJobs.length > 0 ? (
              <div className="space-y-3">
                {displayedJobs.map((job) => (
                  <JobRow
                    key={job.id}
                    job={job}
                    applicantCount={appCountMap[job.id] || 0}
                    onStatusChange={(newStatus) =>
                      statusMutation.mutate({ id: job.id, status: newStatus })
                    }
                    onDelete={() => deleteMutation.mutate(job.id)}
                    onViewApplicants={(jobId) => handleTabChange("applicants", jobId)}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-3xl border border-dashed border-border bg-card p-12 text-center space-y-4">
                <Briefcase className="h-10 w-10 text-muted-foreground mx-auto" />
                <h3 className="text-xl font-bold text-foreground">
                  No positions match the current criteria.
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground max-w-sm mx-auto">
                  Create a new job posting or adjust your search filter to see active mandates.
                </p>
                <div className="pt-2">
                  <Link to="/dashboard/post">
                    <Button variant="signal" className="font-bold text-xs">
                      Post Position
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Workforce Mandates */}
        {activeTab === "workforce" && (
          <div className="space-y-4 animate-in fade-in-50 duration-200">
            <WorkforceManager />
          </div>
        )}

        {/* Tab 4: Inbound Inquiries & Leads */}
        {activeTab === "leads" && (
          <div className="space-y-4 animate-in fade-in-50 duration-200">
            <LeadsManager />
          </div>
        )}

        {/* Tab 5: Analytics & KPIs */}
        {activeTab === "analytics" && (
          <div className="space-y-4 animate-in fade-in-50 duration-200">
            <AdminAnalytics
              jobs={userJobs}
              applications={allApplications}
              workforceRequests={allWorkforce}
              leads={allLeads}
              onSelectTab={(tab, jobId) => handleTabChange(tab as TabKey, jobId)}
            />
          </div>
        )}
      </div>

      {/* Reset Confirmation Dialog */}
      <Dialog open={resetDialogOpen} onOpenChange={setResetDialogOpen}>
        <DialogContent
          className="max-w-md p-6"
          onClose={() => setResetDialogOpen(false)}
        >
          <DialogHeader>
            <DialogTitle className="text-lg font-black text-foreground">
              Reset Sample Candidate & Mandate Data?
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              This will restore all verified sample candidates (with full contacts, CVs, and ratings), workforce mandates, and client inquiries.
            </DialogDescription>
          </DialogHeader>

          <div className="pt-4 flex items-center justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setResetDialogOpen(false)}
              className="text-xs font-semibold"
            >
              Cancel
            </Button>
            <Button
              variant="signal"
              size="sm"
              onClick={handleResetDemoData}
              className="text-xs font-bold gap-1.5 cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Confirm Reset</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
