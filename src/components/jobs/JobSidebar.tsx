import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  Clock,
  GraduationCap,
  Users,
  Building,
  Share2,
  Check,
  CheckCircle2,
  Wallet,
} from "lucide-react";
import { JobEntity } from "@/api/base44Client";
import { formatSalary } from "@/lib/jobs";
import { Button } from "@/components/ui/button";

interface JobSidebarProps {
  job: JobEntity;
  onApplyClick: () => void;
}

export default function JobSidebar({ job, onApplyClick }: JobSidebarProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="space-y-6 sticky top-28">
      {/* Primary Action Box */}
      <div className="bg-card border border-border rounded-3xl p-6 sm:p-7 shadow-xs space-y-6">
        <div>
          <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
            Offered Compensation
          </span>
          <p className="text-2xl font-black text-foreground mt-1">
            {formatSalary(job)}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Standard tax-free UAE package with benefits
          </p>
        </div>

        <Button
          variant="signal"
          size="lg"
          onClick={onApplyClick}
          className="w-full text-base font-bold shadow-md cursor-pointer"
        >
          Apply for this Position
        </Button>

        <Button
          variant="outline"
          size="default"
          onClick={handleShare}
          className="w-full text-xs font-semibold gap-2 cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 text-emerald-600" />
              <span>Link Copied to Clipboard</span>
            </>
          ) : (
            <>
              <Share2 className="h-4 w-4" />
              <span>Share Position</span>
            </>
          )}
        </Button>

        {/* Key Job Attributes */}
        <div className="pt-4 border-t border-border space-y-4">
          <div className="flex items-start gap-3">
            <Clock className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-muted-foreground">Employment Type</p>
              <p className="text-sm font-semibold text-foreground">
                {job.employment_type}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Wallet className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-muted-foreground">Experience Required</p>
              <p className="text-sm font-semibold text-foreground">
                {job.experience_min || 0} – {job.experience_max || "+"} years
              </p>
            </div>
          </div>

          {job.education && (
            <div className="flex items-start gap-3">
              <GraduationCap className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-muted-foreground">Education</p>
                <p className="text-sm font-semibold text-foreground">
                  {job.education}
                </p>
              </div>
            </div>
          )}

          <div className="flex items-start gap-3">
            <Users className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-muted-foreground">Open Vacancies</p>
              <p className="text-sm font-semibold text-foreground">
                {job.vacancies || 1} available seat{job.vacancies && job.vacancies > 1 ? "s" : ""}
              </p>
            </div>
          </div>

          {job.deadline && (
            <div className="flex items-start gap-3">
              <Calendar className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-muted-foreground">Application Deadline</p>
                <p className="text-sm font-semibold text-foreground">
                  {new Date(job.deadline).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          )}

          {job.industry && (
            <div className="flex items-start gap-3">
              <Building className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-muted-foreground">Industry Sector</p>
                <Link
                  to={`/industries/${job.industry}`}
                  className="text-sm font-semibold text-foreground underline-offset-4 hover:underline"
                >
                  Explore {job.industry.charAt(0).toUpperCase() + job.industry.slice(1)}
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Trust Signal Box */}
      <div className="bg-muted/60 border border-border/80 rounded-2xl p-5 text-xs text-muted-foreground space-y-2.5">
        <div className="flex items-center gap-2 font-bold text-foreground">
          <CheckCircle2 className="h-4 w-4 text-signal shrink-0" />
          <span>Verified JobKota Client Mandate</span>
        </div>
        <p className="leading-relaxed">
          Applications submitted directly via JobKota are routed directly to client talent partners with verified feedback within 5 business days.
        </p>
      </div>
    </div>
  );
}
