import React from "react";
import { Link } from "react-router-dom";
import { Bookmark, MapPin, Briefcase, ArrowUpRight } from "lucide-react";
import { JobEntity } from "@/api/base44Client";
import { initials, formatSalary, useSavedJobs } from "@/lib/jobs";
import { cn } from "@/lib/utils";

interface JobCardProps {
  job: JobEntity;
  className?: string;
}

export default function JobCard({ job, className }: JobCardProps) {
  const { isSaved, toggle } = useSavedJobs();
  const saved = isSaved(job.id);

  const handleSaveClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(job.id);
  };

  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-xs transition-all hover:border-foreground/30 hover:shadow-md",
        job.featured ? "ring-1 ring-signal/40" : "",
        className
      )}
    >
      <div>
        {/* Top bar: Company initials & Save button */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-xl bg-signal/20 text-foreground font-extrabold flex items-center justify-center text-sm border border-signal/30 shrink-0">
              {initials(job.company)}
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {job.company}
              </p>
              <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                {job.title}
              </h3>
            </div>
          </div>

          <button
            onClick={handleSaveClick}
            className={cn(
              "rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer shrink-0",
              saved && "text-foreground fill-foreground"
            )}
            aria-label={saved ? "Remove from saved jobs" : "Save job"}
          >
            <Bookmark className={cn("h-4 w-4", saved && "fill-current")} />
          </button>
        </div>

        {/* Clean unboxed metadata with typographic separators */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground mb-4 font-medium">
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5 text-muted-foreground/80 shrink-0" />
            {job.location}
          </span>
          <span aria-hidden="true" className="text-muted-foreground/40">·</span>
          <span className="flex items-center gap-1">
            <Briefcase className="h-3.5 w-3.5 text-muted-foreground/80 shrink-0" />
            {job.employment_type}
          </span>
          <span aria-hidden="true" className="text-muted-foreground/40">·</span>
          <span className="font-semibold text-foreground">
            {formatSalary(job)}
          </span>
        </div>

        {/* Description snippet */}
        {job.description && (
          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
            {job.description}
          </p>
        )}

        {/* Skills list (clean subtle tags) */}
        {job.skills && job.skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-6">
            {job.skills.slice(0, 3).map((skill, idx) => (
              <span
                key={idx}
                className="text-[11px] font-medium bg-muted text-muted-foreground px-2 py-0.5 rounded-md"
              >
                {skill}
              </span>
            ))}
            {job.skills.length > 3 && (
              <span className="text-[11px] text-muted-foreground/70 px-1 py-0.5">
                +{job.skills.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>

      {/* Bottom Action */}
      <div className="pt-4 border-t border-border/60 flex items-center justify-between">
        <span className="text-[11px] text-muted-foreground">
          Posted {new Date(job.created_date).toLocaleDateString("en-GB", { month: "short", day: "numeric" })}
        </span>

        <Link
          to={`/jobs/${job.slug}`}
          className="inline-flex items-center gap-1 text-xs font-bold text-foreground group-hover:text-primary group-hover:underline underline-offset-4"
        >
          <span>View Details</span>
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </div>
  );
}
