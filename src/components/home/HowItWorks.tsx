import { Search, Send, CheckCircle2, TrendingUp } from "lucide-react";
import SectionHeading from "@/components/site/SectionHeading";
import Reveal from "@/components/site/Reveal";

export default function HowItWorks() {
  const candidateSteps = [
    {
      num: "01",
      icon: Search,
      title: "Discover Verified Roles",
      desc: "Explore direct employer mandates across key UAE and GCC industries with clear salary benchmarks and verified job scopes.",
    },
    {
      num: "02",
      icon: Send,
      title: "Direct One-Click Application",
      desc: "Submit your professional profile and resume securely. We forward your credentials directly to internal decision-makers.",
    },
    {
      num: "03",
      icon: CheckCircle2,
      title: "Recruiter Engagement",
      desc: "Our industry specialized talent partners coordinate candidate interview briefings, compensation expectations, and technical tests.",
    },
    {
      num: "04",
      icon: TrendingUp,
      title: "Seamless Onboarding",
      desc: "From offer letters and statutory MOHRE contracts to visa processing and relocation assistance, we ensure a smooth start.",
    },
  ];

  return (
    <section className="py-20 bg-background border-b border-border/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          centered
          eyebrow="Candidate Journey"
          title="A Transparent Pathway to Your Next"
          accentWord="career milestone."
          description="We respect your career ambitions with honest feedback, discreet representation, and zero ghosting."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {candidateSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <Reveal key={idx} delay={idx * 0.1}>
                <div className="relative rounded-3xl border border-border bg-card p-8 space-y-4 h-full shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-2xl font-black text-muted-foreground/40">
                      {step.num}
                    </span>
                    <div className="h-10 w-10 rounded-xl bg-signal/20 text-foreground flex items-center justify-center border border-signal/30">
                      <Icon className="h-5 w-5 text-foreground" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-foreground">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
