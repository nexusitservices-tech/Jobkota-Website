import { Link } from "react-router-dom";
import { Search, Send, Clock, ArrowRight, ShieldCheck } from "lucide-react";
import useSeo from "@/lib/useSeo";
import PageHero from "@/components/site/PageHero";
import FeaturedJobs from "@/components/home/FeaturedJobs";
import CtaBand from "@/components/site/CtaBand";
import SectionHeading from "@/components/site/SectionHeading";
import { Button } from "@/components/ui/button";

export default function Candidates() {
  useSeo(
    "For Candidates & Job Seekers",
    "Discover verified career opportunities with top UAE and GCC employers. Transparent compensation, real recruiter feedback, and seamless applications."
  );

  const steps = [
    {
      icon: Search,
      title: "Discover Verified Positions",
      desc: "Explore live vacancies curated directly from verified corporate employers with transparent salary benchmarks.",
    },
    {
      icon: Send,
      title: "Apply with One Click",
      desc: "Submit your profile and resume securely. We forward your credentials directly to hiring decision makers.",
    },
    {
      icon: Clock,
      title: "Track Application Progress",
      desc: "Receive clear status updates at every stage. No radio silence or ghost listings.",
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      <PageHero
        breadcrumbs={[{ label: "For Candidates" }]}
        eyebrow="Career Acceleration"
        title="Find Opportunity That Matches"
        accentWord="your caliber."
        description="Connect with leading organizations across UAE, GCC, and International hubs. Transparent compensation, verified job descriptions, and direct recruiter representation."
      >
        <div className="pt-2 flex flex-wrap items-center gap-4">
          <Link to="/jobs">
            <Button variant="signal" size="lg" className="font-bold">
              <span>Browse Open Positions</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link to="/register">
            <Button
              variant="outline"
              size="lg"
              className="text-primary-foreground border-primary-foreground/30 hover:bg-white/10"
            >
              Create Candidate Account
            </Button>
          </Link>
        </div>
      </PageHero>

      {/* 3-Step Process */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          centered
          eyebrow="Candidate Framework"
          title="A Simple, Respectful Recruitment Experience"
          accentWord="from day one."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="rounded-3xl border border-border bg-card p-8 space-y-4 shadow-xs"
              >
                <div className="h-12 w-12 rounded-2xl bg-signal/20 text-foreground flex items-center justify-center border border-signal/30">
                  <Icon className="h-6 w-6 text-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Jobs */}
      <FeaturedJobs />

      <CtaBand
        title="Ready to explore your next career move?"
        accentWord="Browse open roles."
        description="Filter by sector, location, and compensation to discover mandates matching your qualifications."
        primaryLabel="Explore Positions"
        primaryTo="/jobs"
      />
    </div>
  );
}
