import { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Briefcase,
  Users,
  CheckCircle2,
  Clock,
  TrendingUp,
  Building,
  MessageSquare,
  ArrowUpRight,
  ShieldCheck,
  Award,
} from "lucide-react";
import { ApplicationEntity, JobEntity, WorkforceRequestEntity, LeadEntity } from "@/api/base44Client";
import { Button } from "@/components/ui/button";

interface AdminAnalyticsProps {
  jobs: JobEntity[];
  applications: ApplicationEntity[];
  workforceRequests: WorkforceRequestEntity[];
  leads: LeadEntity[];
  onSelectTab: (tab: string, jobId?: string) => void;
}

export default function AdminAnalytics({
  jobs,
  applications,
  workforceRequests,
  leads,
  onSelectTab,
}: AdminAnalyticsProps) {
  const publishedJobs = jobs.filter((j) => j.status === "Published").length;

  const funnel = useMemo(() => {
    const total = applications.length;
    const applied = applications.filter((a) => a.status === "Applied").length;
    const underReview = applications.filter((a) => a.status === "Under Review").length;
    const shortlisted = applications.filter((a) => a.status === "Shortlisted").length;
    const interview = applications.filter((a) => a.status === "Interview").length;
    const selected = applications.filter((a) => a.status === "Selected").length;
    return { total, applied, underReview, shortlisted, interview, selected };
  }, [applications]);

  // Compute job popularity
  const jobCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const app of applications) {
      if (app.job_id) {
        counts[app.job_id] = (counts[app.job_id] || 0) + 1;
      }
    }
    return jobs
      .map((j) => ({
        ...j,
        count: counts[j.id] || 0,
      }))
      .sort((a, b) => b.count - a.count);
  }, [jobs, applications]);

  return (
    <div className="space-y-8">
      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-card border border-border p-6 rounded-3xl shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
              Live Mandates
            </span>
            <Briefcase className="h-4 w-4 text-signal" />
          </div>
          <p className="font-mono text-3xl font-black text-foreground">
            {publishedJobs} / {jobs.length}
          </p>
          <p className="text-[11px] text-muted-foreground">
            Active career postings across UAE & GCC
          </p>
        </div>

        <div className="bg-card border border-border p-6 rounded-3xl shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
              Candidate Pool
            </span>
            <Users className="h-4 w-4 text-primary" />
          </div>
          <p className="font-mono text-3xl font-black text-foreground">
            {applications.length}
          </p>
          <p className="text-[11px] text-muted-foreground">
            {funnel.shortlisted + funnel.interview} in active interview pipeline
          </p>
        </div>

        <div className="bg-card border border-border p-6 rounded-3xl shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
              Workforce Mandates
            </span>
            <Building className="h-4 w-4 text-emerald-600" />
          </div>
          <p className="font-mono text-3xl font-black text-foreground">
            {workforceRequests.length}
          </p>
          <p className="text-[11px] text-muted-foreground">
            {workforceRequests.filter((w) => w.status === "Active").length} active bulk contracts
          </p>
        </div>

        <div className="bg-card border border-border p-6 rounded-3xl shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
              Inbound Inquiries
            </span>
            <MessageSquare className="h-4 w-4 text-amber-600" />
          </div>
          <p className="font-mono text-3xl font-black text-foreground">
            {leads.length}
          </p>
          <p className="text-[11px] text-muted-foreground">
            Corporate advisory & recruitment leads
          </p>
        </div>
      </div>

      {/* Recruitment Funnel Visualizer */}
      <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs uppercase tracking-widest text-signal font-bold">
              Talent Conversion Pipeline
            </span>
            <h3 className="text-xl font-black text-foreground mt-0.5">
              Recruitment Funnel & Candidate Stages
            </h3>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onSelectTab("applicants")}
            className="text-xs font-bold gap-1 cursor-pointer"
          >
            <span>Open Candidate Directory</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <div className="p-4 rounded-2xl bg-muted/40 border border-border/80 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              1. Applied (Total)
            </span>
            <p className="font-mono text-2xl font-black text-foreground">
              {funnel.total}
            </p>
            <div className="w-full bg-border h-1.5 rounded-full overflow-hidden mt-2">
              <div className="bg-foreground h-full w-full" />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-muted/40 border border-border/80 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600">
              2. Under Review
            </span>
            <p className="font-mono text-2xl font-black text-amber-600">
              {funnel.underReview}
            </p>
            <div className="w-full bg-border h-1.5 rounded-full overflow-hidden mt-2">
              <div
                className="bg-amber-500 h-full"
                style={{
                  width: `${funnel.total ? (funnel.underReview / funnel.total) * 100 : 0}%`,
                }}
              />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-muted/40 border border-border/80 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-signal">
              3. Shortlisted
            </span>
            <p className="font-mono text-2xl font-black text-foreground">
              {funnel.shortlisted}
            </p>
            <div className="w-full bg-border h-1.5 rounded-full overflow-hidden mt-2">
              <div
                className="bg-signal h-full"
                style={{
                  width: `${funnel.total ? (funnel.shortlisted / funnel.total) * 100 : 0}%`,
                }}
              />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-muted/40 border border-border/80 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
              4. In Interview
            </span>
            <p className="font-mono text-2xl font-black text-foreground">
              {funnel.interview}
            </p>
            <div className="w-full bg-border h-1.5 rounded-full overflow-hidden mt-2">
              <div
                className="bg-primary h-full"
                style={{
                  width: `${funnel.total ? (funnel.interview / funnel.total) * 100 : 0}%`,
                }}
              />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-1 col-span-2 sm:col-span-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
              5. Selected / Hired
            </span>
            <p className="font-mono text-2xl font-black text-emerald-700">
              {funnel.selected}
            </p>
            <div className="w-full bg-emerald-200 h-1.5 rounded-full overflow-hidden mt-2">
              <div
                className="bg-emerald-600 h-full"
                style={{
                  width: `${funnel.total ? (funnel.selected / funnel.total) * 100 : 0}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Popular Positions Table */}
      <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs uppercase tracking-widest text-muted-foreground font-bold">
              Mandate Demand
            </span>
            <h3 className="text-xl font-black text-foreground mt-0.5">
              Positions by Applicant Volume
            </h3>
          </div>
          <Link to="/dashboard/post">
            <Button variant="signal" size="sm" className="font-bold text-xs">
              Post New Position
            </Button>
          </Link>
        </div>

        <div className="space-y-2 pt-2">
          {jobCounts.slice(0, 5).map((job) => (
            <div
              key={job.id}
              className="flex items-center justify-between p-3.5 rounded-2xl bg-muted/30 border border-border/80 hover:border-foreground/20 transition-all"
            >
              <div className="min-w-0 pr-4">
                <h4 className="text-sm font-bold text-foreground truncate">{job.title}</h4>
                <p className="text-xs text-muted-foreground">
                  {job.company} · {job.location}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-card border border-border">
                  {job.count} applicant{job.count === 1 ? "" : "s"}
                </span>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onSelectTab("applicants", job.id)}
                  className="h-8 text-xs font-bold cursor-pointer"
                >
                  View Applicants
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
