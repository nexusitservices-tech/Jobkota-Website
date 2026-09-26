import { useState } from "react";
import { Link } from "react-router-dom";
import { Edit2, Trash2, Users, MapPin, ExternalLink } from "lucide-react";
import { JobEntity } from "@/api/base44Client";
import { initials, formatSalary } from "@/lib/jobs";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface JobRowProps {
  job: JobEntity;
  applicantCount: number;
  onStatusChange: (newStatus: JobEntity["status"]) => void;
  onDelete: () => void;
}

export default function JobRow({
  job,
  applicantCount,
  onStatusChange,
  onDelete,
}: JobRowProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const getStatusBadgeVariant = (status: JobEntity["status"]) => {
    switch (status) {
      case "Published":
        return "success";
      case "Draft":
        return "secondary";
      case "Pending Review":
        return "warning";
      case "Paused":
        return "outline";
      case "Closed":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border border-border bg-card shadow-xs transition-all hover:border-foreground/20">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-xl bg-signal/20 text-foreground font-black flex items-center justify-center text-sm border border-signal/30 shrink-0">
            {initials(job.company)}
          </div>

          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h4 className="text-base font-bold text-foreground">
                {job.title}
              </h4>
              <Badge variant={getStatusBadgeVariant(job.status)}>
                {job.status}
              </Badge>
              {job.featured && (
                <span className="text-[10px] uppercase font-bold text-lime-800 bg-signal/30 px-2 py-0.5 rounded-full">
                  Featured
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
              <span className="font-semibold text-foreground/80">{job.company}</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {job.location}
              </span>
              <span>·</span>
              <span>{formatSalary(job)}</span>
            </div>
          </div>
        </div>

        {/* Right side stats and actions */}
        <div className="flex items-center justify-between sm:justify-end gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-border/60">
          {/* Applicant count */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-muted/60 text-xs font-semibold text-foreground">
            <Users className="h-3.5 w-3.5 text-muted-foreground" />
            <span>
              {applicantCount} applicant{applicantCount === 1 ? "" : "s"}
            </span>
          </div>

          {/* Status selector */}
          <select
            value={job.status}
            onChange={(e) => onStatusChange(e.target.value as JobEntity["status"])}
            className="h-8 rounded-lg border border-input bg-card px-2 text-xs font-semibold text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
            <option value="Pending Review">Pending Review</option>
            <option value="Paused">Paused</option>
            <option value="Closed">Closed</option>
          </select>

          {/* Action buttons */}
          <div className="flex items-center gap-1">
            <Link
              to={`/jobs/${job.slug}`}
              className="p-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              title="View Live Listing"
            >
              <ExternalLink className="h-4 w-4" />
            </Link>

            <Link
              to={`/dashboard/edit/${job.id}`}
              className="p-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              title="Edit Position"
            >
              <Edit2 className="h-4 w-4" />
            </Link>

            <button
              onClick={() => setDeleteDialogOpen(true)}
              className="p-2 rounded-lg text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
              title="Delete Position"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent onClose={() => setDeleteDialogOpen(false)}>
          <DialogHeader>
            <DialogTitle>Confirm Position Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to permanently delete "{job.title}"? This action cannot be reversed.
            </DialogDescription>
          </DialogHeader>

          <div className="flex items-center justify-end gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                setDeleteDialogOpen(false);
                onDelete();
              }}
            >
              Delete Job
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
