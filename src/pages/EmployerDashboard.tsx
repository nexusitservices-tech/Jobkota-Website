import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Plus,
  Briefcase,
  CheckCircle2,
  FileText,
  Clock,
  Users,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import useSeo from "@/lib/useSeo";
import { base44, JobEntity, ApplicationEntity } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";
import JobRow from "@/components/employer/JobRow";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function EmployerDashboard() {
  useSeo("Employer Dashboard", "Manage corporate job postings, applicant shortlists, and publishing statuses.");

  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Fetch jobs
  const { data: allJobs = [], isLoading: isLoadingJobs } = useQuery<JobEntity[]>({
    queryKey: ["jobs"],
    queryFn: () => base44.entities.Job.list("-created_date", 300),
  });

  // Fetch applications to calculate counts per job
  const { data: allApplications = [] } = useQuery<ApplicationEntity[]>({
    queryKey: ["applications"],
    queryFn: () => base44.entities.Application.list("-created_date", 500),
  });

  // Compute application count map by job_id
  const appCountMap: Record<string, number> = {};
  for (const app of allApplications) {
    if (app.job_id) {
      appCountMap[app.job_id] = (appCountMap[app.job_id] || 0) + 1;
    }
  }

  // Filter jobs belonging to current user or all if admin
  const userJobs = allJobs.filter((j) => {
    if (!user) return true;
    if (user.role === "admin") return true;
    return j.created_by_id === user.id;
  });

  // Calculate stats
  const totalListings = userJobs.length;
  const publishedListings = userJobs.filter((j) => j.status === "Published").length;
  const draftsAndReview = userJobs.filter(
    (j) => j.status === "Draft" || j.status === "Pending Review"
  ).length;
  const pausedAndClosed = userJobs.filter(
    (j) => j.status === "Paused" || j.status === "Closed"
  ).length;
  const totalApplicants = Object.values(appCountMap).reduce((a, b) => a + b, 0);

  // Status mutation
  const statusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: JobEntity["status"] }) => {
      return base44.entities.Job.update(id, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return base44.entities.Job.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
  });

  // Filtered display jobs
  const displayedJobs = userJobs.filter((job) => {
    if (statusFilter !== "all" && job.status !== statusFilter) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const inTitle = job.title.toLowerCase().includes(q);
      const inCompany = job.company.toLowerCase().includes(q);
      const inLoc = job.location.toLowerCase().includes(q);
      return inTitle || inCompany || inLoc;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-background pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
          <div>
            <span className="text-xs uppercase tracking-widest text-muted-foreground font-bold">
              Employer Console
            </span>
            <h1 className="text-3xl font-extrabold text-foreground tracking-tight mt-1">
              Workforce & Job Management
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Logged in as <span className="font-semibold text-foreground">{user?.email}</span> ({user?.role})
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/dashboard/post">
              <Button variant="signal" size="default" className="font-bold gap-2">
                <Plus className="h-4 w-4" />
                <span>Post New Position</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-card border border-border p-6 rounded-3xl shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                Total Positions
              </span>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="font-mono text-3xl font-black text-foreground">
              {totalListings}
            </p>
            <p className="text-[11px] text-muted-foreground">
              Across all regional departments
            </p>
          </div>

          <div className="bg-card border border-border p-6 rounded-3xl shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                Published & Active
              </span>
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            </div>
            <p className="font-mono text-3xl font-black text-foreground">
              {publishedListings}
            </p>
            <p className="text-[11px] text-muted-foreground">
              Live on public JobKota board
            </p>
          </div>

          <div className="bg-card border border-border p-6 rounded-3xl shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                Drafts & Review
              </span>
              <FileText className="h-4 w-4 text-amber-600" />
            </div>
            <p className="font-mono text-3xl font-black text-foreground">
              {draftsAndReview}
            </p>
            <p className="text-[11px] text-muted-foreground">
              Pending stakeholder approval
            </p>
          </div>

          <div className="bg-card border border-border p-6 rounded-3xl shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                Total Applicants
              </span>
              <Users className="h-4 w-4 text-signal" />
            </div>
            <p className="font-mono text-3xl font-black text-foreground">
              {totalApplicants}
            </p>
            <p className="text-[11px] text-muted-foreground">
              {pausedAndClosed} paused / closed mandates
            </p>
          </div>
        </div>

        {/* Listings Section */}
        <div className="space-y-4">
          {/* Filter & Search Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-card border border-border p-4 rounded-2xl">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Filter by title, company, or city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 h-10 text-xs"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs text-muted-foreground font-semibold shrink-0">
                Status:
              </span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-10 rounded-xl border border-input bg-card px-3 text-xs font-semibold text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-pointer"
              >
                <option value="all">All Statuses ({totalListings})</option>
                <option value="Published">Published ({publishedListings})</option>
                <option value="Draft">Draft</option>
                <option value="Pending Review">Pending Review</option>
                <option value="Paused">Paused</option>
                <option value="Closed">Closed</option>
              </select>
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
                />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-border bg-card p-12 text-center space-y-4">
              <Briefcase className="h-10 w-10 text-muted-foreground mx-auto" />
              <h3 className="text-xl font-bold text-foreground">
                You haven't posted any jobs yet.
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-sm mx-auto">
                Create your first opening to attract qualified candidates across UAE, GCC, and International markets.
              </p>
              <div className="pt-2">
                <Link to="/dashboard/post">
                  <Button variant="signal" className="font-bold">
                    Post Your First Job
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
