import { useParams, Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Briefcase,
  Layers,
} from "lucide-react";
import useSeo from "@/lib/useSeo";
import { getIndustry, getService } from "@/lib/content";
import { useJobs } from "@/lib/jobs";
import PageHero from "@/components/site/PageHero";
import JobCard from "@/components/jobs/JobCard";
import CtaBand from "@/components/site/CtaBand";
import PageNotFound from "@/lib/PageNotFound";
import { Button } from "@/components/ui/button";

export default function IndustryDetail() {
  const { slug } = useParams<{ slug: string }>();
  const industry = slug ? getIndustry(slug) : undefined;
  const { data: allJobs = [] } = useJobs();

  useSeo(
    industry ? `${industry.name} Recruitment` : "Industry Detail",
    industry ? industry.short : undefined
  );

  if (!industry) {
    return <PageNotFound />;
  }

  const industryJobs = allJobs
    .filter((j) => j.status === "Published" && j.industry === industry.slug)
    .slice(0, 3);

  const relatedServices = industry.services
    .map((sSlug) => getService(sSlug))
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Hero */}
      <PageHero
        breadcrumbs={[
          { label: "Industries", to: "/industries" },
          { label: industry.name },
        ]}
        eyebrow="Sector Practice Group"
        title={industry.name}
        accentWord="Talent Solutions"
        description={industry.short}
        backgroundImage={industry.image}
      >
        <div className="pt-2 flex flex-wrap items-center gap-4">
          <Link to="/employers/request-talent">
            <Button variant="signal" size="lg" className="font-bold">
              <span>Hire in {industry.name}</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link to={`/jobs?industry=${industry.slug}`}>
            <Button
              variant="outline"
              size="lg"
              className="text-primary-foreground border-primary-foreground/30 hover:bg-white/10"
            >
              Browse Open Positions
            </Button>
          </Link>
        </div>
      </PageHero>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-20">
        {/* Industry Challenges & Roles Bento */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Challenges */}
          <div className="rounded-3xl border border-border bg-card p-8 sm:p-10 space-y-6 shadow-xs">
            <div className="flex items-center gap-2 text-foreground font-bold text-xs uppercase tracking-wider">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              <span>Core Sector Challenges</span>
            </div>
            <h3 className="text-2xl font-bold text-foreground">
              Market Dynamics We Solve
            </h3>
            <ul className="space-y-4">
              {industry.challenges.map((c, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                  <span className="font-mono text-xs font-bold text-foreground bg-muted h-6 w-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    0{idx + 1}
                  </span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Roles We Recruit */}
          <div className="rounded-3xl border border-border bg-card p-8 sm:p-10 space-y-6 shadow-xs">
            <div className="flex items-center gap-2 text-foreground font-bold text-xs uppercase tracking-wider">
              <Briefcase className="h-4 w-4 text-signal" />
              <span>Placements & Functions</span>
            </div>
            <h3 className="text-2xl font-bold text-foreground">
              Typical Mandates Handled
            </h3>
            <ul className="space-y-4">
              {industry.roles.map((r, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-foreground leading-relaxed font-semibold">
                  <CheckCircle2 className="h-5 w-5 text-signal shrink-0 mt-0.5" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Recommended Solutions for this Sector */}
        {relatedServices.length > 0 && (
          <div className="space-y-6">
            <div className="max-w-xl space-y-1">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground font-bold">
                <Layers className="h-4 w-4 text-signal" />
                <span>Service Fit</span>
              </div>
              <h3 className="text-2xl font-bold text-foreground">
                Workforce Models Tailored for {industry.name}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedServices.map((srv: any) => (
                <Link
                  key={srv.slug}
                  to={`/services/${srv.slug}`}
                  className="group rounded-3xl border border-border bg-card p-6 shadow-xs hover:border-foreground/30 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <span className="text-xs font-bold text-muted-foreground">
                      Service Solution
                    </span>
                    <h4 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                      {srv.title}
                    </h4>
                    <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                      {srv.short}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-border/60 flex items-center justify-between text-xs font-bold text-foreground">
                    <span>View Delivery Model</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Live Jobs in this Sector */}
        {industryJobs.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-muted-foreground font-bold">
                  Open Opportunities
                </span>
                <h3 className="text-2xl font-bold text-foreground mt-1">
                  Active {industry.name} Roles
                </h3>
              </div>
              <Link
                to={`/jobs?industry=${industry.slug}`}
                className="text-xs font-bold text-foreground hover:underline"
              >
                View All in {industry.name}
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {industryJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-20">
        <CtaBand
          title={`Hire Top-Performing ${industry.name} Talent`}
          accentWord="with certainty."
          description={`Our ${industry.name} recruiters maintain pre-screened talent pools across UAE, GCC, and international markets.`}
          primaryLabel="Submit Hiring Mandate"
          primaryTo="/employers/request-talent"
        />
      </div>
    </div>
  );
}
