import { Link } from "react-router-dom";
import {
  CheckCircle2,
  Users,
  Building2,
  ShieldCheck,
  TrendingUp,
  Award,
  Globe2,
} from "lucide-react";
import useSeo from "@/lib/useSeo";
import PageHero from "@/components/site/PageHero";
import CtaBand from "@/components/site/CtaBand";
import SectionHeading from "@/components/site/SectionHeading";
import Reveal from "@/components/site/Reveal";
import { siteConfig, defaultSteps } from "@/lib/content";

export default function About() {
  useSeo(
    "About JobKota",
    "Learn about JobKota's mission to make recruitment simpler, faster, and more connected across UAE, GCC, and International markets."
  );

  const stats = [
    { label: "Partner Enterprises", value: "500+", sub: "Across UAE & GCC" },
    { label: "Successful Placements", value: "3,800+", sub: "Permanent & Executive" },
    { label: "Retention Rate", value: "94%", sub: "First-Year Benchmark" },
    { label: "Deployment Velocity", value: "5 Days", sub: "Average Time-to-Shortlist" },
  ];

  const values = [
    {
      title: "Commercial Integrity",
      desc: "We present verified candidate capabilities, transparent fee structures, and honest feasibility advice for every hiring mandate.",
    },
    {
      title: "Regional Rigor",
      desc: "Deep mastery of UAE labor decree laws, MOHRE compliances, and freezone jurisdictions ensures frictionless staffing operations.",
    },
    {
      title: "Speed with Discretion",
      desc: "Executive search and specialized staffing executed with velocity while preserving strict institutional confidentiality.",
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      <PageHero
        breadcrumbs={[{ label: "About" }]}
        eyebrow="Our Mission & Purpose"
        title="Connecting Ambition with Opportunity"
        accentWord="across the Gulf."
        description={`${siteConfig.name} was established with a singular conviction: recruitment should be simpler, faster, and genuinely aligned with enterprise performance.`}
      />

      {/* Metrics Row */}
      <section className="py-12 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center sm:text-left">
            {stats.map((s, idx) => (
              <div key={idx} className="space-y-1">
                <span className="font-mono text-3xl sm:text-4xl font-black text-foreground">
                  {s.value}
                </span>
                <p className="text-xs sm:text-sm font-bold text-foreground">
                  {s.label}
                </p>
                <p className="text-[11px] text-muted-foreground">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story & Philosophy */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-widest text-muted-foreground font-bold">
              The JobKota Origin
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
              Bridging the gap between premier organizations and verified talent.
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
              <p>
                The Gulf economies are undergoing an unprecedented period of industrial, digital, and infrastructural expansion. As multinational corporations establish regional headquarters in Dubai, Abu Dhabi, and Riyadh, conventional staffing agencies fail to keep pace with modern hiring criteria.
              </p>
              <p>
                JobKota was built to modernize workforce solutions. We blend dedicated sector-specialized headhunters with cutting-edge talent infrastructure, handling everything from C-suite executive placements to large-scale site manpower and cross-border employer-of-record management.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden border border-border shadow-xl h-96 bg-neutral-900">
              <img
                src="https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80"
                alt="Executive Consultation"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-8">
                <div className="text-white space-y-1">
                  <p className="text-xs uppercase tracking-wider font-bold text-signal">
                    Headquartered in Deira, Dubai
                  </p>
                  <p className="text-lg font-bold">
                    Serving premier enterprises across UAE, Saudi Arabia & international hubs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="space-y-8">
          <SectionHeading
            eyebrow="Operating Principles"
            title="The Values That Guide Every Placement"
            accentWord="and contract."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <div className="rounded-3xl border border-border bg-card p-8 space-y-4 h-full shadow-xs">
                  <div className="h-10 w-10 rounded-xl bg-signal/20 text-foreground flex items-center justify-center font-mono font-bold text-xs border border-signal/30">
                    0{idx + 1}
                  </div>
                  <h3 className="text-xl font-bold text-foreground">
                    {v.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* 4-Step Methodology */}
        <div className="rounded-3xl bg-primary text-primary-foreground p-8 sm:p-12 relative overflow-hidden border border-primary-foreground/10">
          <div className="absolute inset-0 grain-grid pointer-events-none opacity-30" />
          <div className="relative z-10 max-w-2xl mb-10 space-y-2">
            <span className="text-xs uppercase tracking-widest text-signal font-bold">
              Standard Operating Procedure
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-primary-foreground">
              Our 4-Stage Engagement Framework
            </h3>
          </div>

          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {defaultSteps.map((step, idx) => (
              <div key={idx} className="space-y-2">
                <span className="font-mono text-xs font-bold text-signal bg-signal/20 px-2.5 py-1 rounded-full border border-signal/40">
                  Step 0{idx + 1}
                </span>
                <h4 className="text-lg font-bold text-primary-foreground pt-1">
                  {step.title}
                </h4>
                <p className="text-xs sm:text-sm text-primary-foreground/70 leading-relaxed">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Ready to partner with JobKota?"
        accentWord="Let's connect."
        description="Whether you're exploring talent acquisition terms or planning regional expansion."
        primaryLabel="Request Talent"
        primaryTo="/employers/request-talent"
      />
    </div>
  );
}
