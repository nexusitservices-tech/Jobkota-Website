import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Bookmark,
  Building,
  CheckCircle2,
  MapPin,
  Briefcase,
  Share2,
} from "lucide-react";
import useSeo from "@/lib/useSeo";
import { useJobs, initials, formatSalary, useSavedJobs } from "@/lib/jobs";
import JobSidebar from "@/components/jobs/JobSidebar";
import ApplyDialog from "@/components/jobs/ApplyDialog";
import JobCard from "@/components/jobs/JobCard";
import PageNotFound from "@/lib/PageNotFound";
import { Button } from "@/components/ui/button";

export default function JobDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: jobs = [], isLoading } = useJobs();
  const { isSaved, toggle } = useSavedJobs();
  const [applyOpen, setApplyOpen] = useState(false);

  const job = jobs.find((j) => j.slug === slug);
  const saved = job ? isSaved(job.id) : false;

  useSeo(
    job ? `${job.title} at ${job.company}` : "Position Listing",
    job ? `${job.title} role at ${job.company} in ${job.location}. ${job.description?.slice(0, 150)}` : undefined,
    job
      ? {
          "@context": "https://schema.org",
          "@type": "JobPosting",
          title: job.title,
          description: job.description,
          datePosted: job.created_date,
          validThrough: job.deadline,
          employmentType: job.employment_type?.toUpperCase(),
          hiringOrganization: {
            "@type": "Organization",
            name: job.company,
          },
          jobLocation: {
            "@type": "Place",
            address: {
              "@type": "PostalAddress",
              addressLocality: job.location,
              addressCountry: "AE",
            },
          },
          baseSalary: {
            "@type": "MonetaryAmount",
            currency: job.currency || "AED",
            value: {
              "@type": "QuantitativeValue",
              minValue: job.salary_min,
              maxValue: job.salary_max,
              unitText: "MONTH",
            },
          },
        }
      : undefined
  );

  if (isLoading) {
    return (
      <div className="min-h-screen pt-36 pb-20 flex items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-muted border-t-signal" />
      </div>
    );
  }

  if (!job) {
    return <PageNotFound />;
  }

  // Related jobs
  const relatedJobs = jobs
    .filter((j) => j.id !== job.id && (j.industry === job.industry || j.category === job.category))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Dark Hero Section */}
      <section className="relative bg-primary text-primary-foreground pt-32 pb-16 sm:pt-36 sm:pb-20 overflow-hidden border-b border-primary-foreground/10">
        <div className="absolute inset-0 grain-grid pointer-events-none opacity-40" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] glow-radial pointer-events-none opacity-60" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <Link
            to="/jobs"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-foreground/70 hover:text-signal transition-colors mb-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to All Openings</span>
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-start gap-5">
              <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-signal text-primary font-black flex items-center justify-center text-xl sm:text-2xl shadow-lg shrink-0">
                {initials(job.company)}
              </div>

              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs uppercase tracking-wider font-bold text-signal">
                    {job.company}
                  </span>
                  {job.department && (
                    <>
                      <span className="text-primary-foreground/40">·</span>
                      <span className="text-xs text-primary-foreground/75 font-medium">
                        {job.department}
                      </span>
                    </>
                  )}
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary-foreground tracking-tight leading-tight">
                  {job.title}
                </h1>

                {/* Zero-pill metadata line */}
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm text-primary-foreground/80 font-medium pt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-signal" />
                    {job.location}
                  </span>
                  <span className="text-primary-foreground/40">·</span>
                  <span className="flex items-center gap-1">
                    <Briefcase className="h-3.5 w-3.5 text-signal" />
                    {job.employment_type}
                  </span>
                  <span className="text-primary-foreground/40">·</span>
                  <span className="font-bold text-signal">
                    {formatSalary(job)}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-3 pt-2 lg:pt-0">
              <Button
                variant="signal"
                size="lg"
                onClick={() => setApplyOpen(true)}
                className="font-bold px-8 shadow-md cursor-pointer"
              >
                Apply Now
              </Button>

              <button
                onClick={() => toggle(job.id)}
                className="h-12 w-12 rounded-full border border-primary-foreground/25 flex items-center justify-center text-primary-foreground hover:bg-white/10 transition-colors cursor-pointer"
                title={saved ? "Remove from saved" : "Save this job"}
              >
                <Bookmark className={`h-5 w-5 ${saved ? "fill-signal text-signal" : ""}`} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Left Content Column */}
          <div className="lg:col-span-8 space-y-12">
            {/* Description */}
            {job.description && (
              <section className="space-y-4">
                <h2 className="text-xl font-bold text-foreground">
                  Role Overview
                </h2>
                <div className="text-sm sm:text-base text-muted-foreground leading-relaxed whitespace-pre-line">
                  {job.description}
                </div>
              </section>
            )}

            {/* Key Responsibilities */}
            {job.responsibilities && job.responsibilities.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-xl font-bold text-foreground">
                  Key Responsibilities
                </h2>
                <ul className="space-y-3">
                  {job.responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
                      <CheckCircle2 className="h-5 w-5 text-signal shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Candidate Requirements */}
            {job.requirements && job.requirements.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-xl font-bold text-foreground">
                  Candidate Requirements
                </h2>
                <ul className="space-y-3">
                  {job.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
                      <CheckCircle2 className="h-5 w-5 text-signal shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Target Skills */}
            {job.skills && job.skills.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-xl font-bold text-foreground">
                  Required Competencies & Tools
                </h2>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-semibold bg-muted text-foreground px-3.5 py-1.5 rounded-xl border border-border"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Benefits Package */}
            {job.benefits && job.benefits.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-xl font-bold text-foreground">
                  Compensation & Benefits Package
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {job.benefits.map((b, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground bg-card border border-border p-3.5 rounded-xl">
                      <CheckCircle2 className="h-4 w-4 text-signal shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* About Company */}
            {job.about_company && (
              <section className="space-y-3 pt-6 border-t border-border">
                <h2 className="text-xl font-bold text-foreground">
                  About {job.company}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {job.about_company}
                </p>
              </section>
            )}

            {/* Bottom Apply Card */}
            <div className="rounded-3xl bg-primary text-primary-foreground p-8 relative overflow-hidden border border-primary-foreground/10 text-center space-y-4">
              <div className="absolute inset-0 grain-grid pointer-events-none opacity-30" />
              <div className="relative z-10 max-w-lg mx-auto space-y-3">
                <h3 className="text-2xl font-black">
                  Ready to take the next step in your career?
                </h3>
                <p className="text-xs sm:text-sm text-primary-foreground/75">
                  Submit your application directly to our talent acquisition partners for immediate review.
                </p>
                <div className="pt-2">
                  <Button
                    variant="signal"
                    size="lg"
                    onClick={() => setApplyOpen(true)}
                    className="font-bold px-10 cursor-pointer"
                  >
                    Apply for this Position
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sticky Sidebar */}
          <div className="lg:col-span-4">
            <JobSidebar job={job} onApplyClick={() => setApplyOpen(true)} />
          </div>
        </div>

        {/* Related Jobs Section */}
        {relatedJobs.length > 0 && (
          <div className="mt-24 pt-12 border-t border-border">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs uppercase tracking-wider font-bold text-muted-foreground">
                  Similar Mandates
                </span>
                <h3 className="text-2xl font-extrabold text-foreground mt-1">
                  Related Positions
                </h3>
              </div>
              <Link
                to="/jobs"
                className="text-xs font-bold text-foreground hover:underline"
              >
                Browse All
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedJobs.map((rel) => (
                <JobCard key={rel.id} job={rel} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Apply Modal */}
      <ApplyDialog
        job={job}
        open={applyOpen}
        onOpenChange={setApplyOpen}
      />
    </div>
  );
}
