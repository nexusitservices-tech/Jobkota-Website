import { CheckCircle2, ShieldCheck, Clock, Users, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import useSeo from "@/lib/useSeo";
import PageHero from "@/components/site/PageHero";
import RequestTalentForm from "@/components/forms/RequestTalentForm";

export default function RequestTalent() {
  useSeo(
    "Request Talent & Workforce",
    "Submit your organization's hiring or manpower supply requirements. Receive tailored candidate profiles and pricing terms within 24 hours."
  );

  const nextSteps = [
    {
      title: "Mandate Scoping Call",
      desc: "Our sector practice director reviews your criteria and confirms competency requirements, compensation benchmarks, and timeline goals.",
    },
    {
      title: "Curated Talent Shortlist",
      desc: "Within 4 to 5 business days, we deliver fully screened, verified candidate dossiers with background summaries.",
    },
    {
      title: "Facilitated Interviews",
      desc: "We coordinate stakeholder interviews, panel sessions, and technical assessments with zero administrative burden on your team.",
    },
    {
      title: "Deployment & Guarantee",
      desc: "Smooth offer handling, visa sponsorship processing, and our standard 90-day replacement warranty on permanent hires.",
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      <PageHero
        breadcrumbs={[
          { label: "For Employers", to: "/employers" },
          { label: "Request Talent" },
        ]}
        eyebrow="Direct Enterprise Engagement"
        title="Tell Us Who You Need."
        accentWord="We Deliver."
        description="Submit your hiring mandate or temporary manpower specifications. A dedicated JobKota practice lead will connect within 24 hours."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: What Happens Next Checklist */}
          <div className="lg:col-span-4 space-y-8 sticky top-28">
            <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-6 shadow-xs">
              <div>
                <span className="text-xs uppercase tracking-widest text-signal font-bold">
                  Recruitment Workflow
                </span>
                <h3 className="text-xl font-bold text-foreground mt-1">
                  What Happens Next?
                </h3>
              </div>

              <div className="space-y-6">
                {nextSteps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-signal/20 text-foreground font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 border border-signal/40">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-foreground">
                        {step.title}
                      </h4>
                      <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Guarantees Box */}
              <div className="pt-4 border-t border-border space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                  <ShieldCheck className="h-4 w-4 text-signal" />
                  <span>The JobKota Commitment</span>
                </div>
                <ul className="text-xs text-muted-foreground space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-signal" />
                    <span>90-day candidate replacement warranty</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-signal" />
                    <span>100% UAE MOHRE statutory compliance</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-signal" />
                    <span>Strict confidentiality on executive searches</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="text-center">
              <Link
                to="/employers"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Learn more about employer services</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Request Talent Form */}
          <div className="lg:col-span-8">
            <RequestTalentForm />
          </div>
        </div>
      </div>
    </div>
  );
}
