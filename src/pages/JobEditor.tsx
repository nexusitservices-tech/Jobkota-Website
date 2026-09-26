import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Loader2 } from "lucide-react";
import useSeo from "@/lib/useSeo";
import { base44, JobEntity } from "@/api/base44Client";
import JobForm from "@/components/employer/JobForm";

export default function JobEditor() {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);

  useSeo(
    isEdit ? "Edit Position Listing" : "Post New Position",
    "Configure position parameters, qualifications, and publishing status."
  );

  const { data: job, isLoading } = useQuery<JobEntity | null>({
    queryKey: ["job", id],
    queryFn: () => (id ? base44.entities.Job.get(id) : null),
    enabled: isEdit,
  });

  if (isEdit && isLoading) {
    return (
      <div className="min-h-screen pt-32 pb-24 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-xs font-semibold text-muted-foreground">
            Loading position details...
          </p>
        </div>
      </div>
    );
  }

  if (isEdit && !job) {
    return (
      <div className="min-h-screen pt-36 pb-24 max-w-4xl mx-auto px-4 text-center space-y-4">
        <h2 className="text-2xl font-bold">Position Not Found</h2>
        <p className="text-sm text-muted-foreground">
          The requested job record does not exist or has been deleted.
        </p>
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Return to Dashboard</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-28 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div className="space-y-1">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground mb-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Employer Console</span>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              {isEdit ? `Edit: ${job?.title}` : "Post a New Career Opening"}
            </h1>
            <p className="text-xs text-muted-foreground">
              {isEdit
                ? "Update requirements, status, or compensation details."
                : "Enter comprehensive mandate specifications to publish to the JobKota talent network."}
            </p>
          </div>
        </div>

        <JobForm
          initialJob={job || undefined}
          isEdit={isEdit}
        />
      </div>
    </div>
  );
}
