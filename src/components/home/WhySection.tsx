import { defaultSteps } from "@/lib/content";
import SectionHeading from "@/components/site/SectionHeading";
import Reveal from "@/components/site/Reveal";
import { CheckCircle2, Shield, Zap, Target } from "lucide-react";

export default function WhySection() {
  const advantages = [
    {
      icon: Target,
      title: "Precision Matching",
      desc: "Our recruiters are dedicated industry specialists who evaluate practical domain competency, not just keyword matches on CVs.",
    },
    {
      icon: Zap,
      title: "Rapid Deployment",
      desc: "Pre-screened standby talent pools allow shortlists within 5 business days and volume manpower deployments within 72 hours.",
    },
    {
      icon: Shield,
      title: "Complete Labor Compliance",
      desc: "Full adherence to UAE MOHRE directives, WPS payroll mechanisms, statutory health insurance, and lawful visa sponsorships.",
    },
  ];

  return (
    <section className="py-24 bg-card border-b border-border/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why JobKota"
          title="Recruitment engineered around precision"
          accentWord="and accountability."
          description="Traditional hiring is fragmented and slow. We combine local regional labor expertise with modern talent operations."
        />

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {advantages.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Reveal key={idx} delay={idx * 0.1}>
                <div className="rounded-3xl border border-border bg-background p-8 space-y-4 h-full">
                  <div className="h-12 w-12 rounded-2xl bg-signal/20 text-foreground flex items-center justify-center border border-signal/30">
                    <Icon className="h-6 w-6 text-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* 4-Step Methodology Process */}
        <div className="rounded-3xl bg-primary text-primary-foreground p-8 sm:p-12 relative overflow-hidden border border-primary-foreground/10">
          <div className="absolute inset-0 grain-grid pointer-events-none opacity-30" />

          <div className="relative z-10 max-w-3xl mb-12">
            <span className="text-xs uppercase tracking-widest text-signal font-bold">
              Our Methodology
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-primary-foreground mt-1">
              How we deliver consistent workforce excellence
            </h3>
          </div>

          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {defaultSteps.map((step, idx) => (
              <div key={idx} className="space-y-3 relative">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-signal bg-signal/20 px-2.5 py-1 rounded-full border border-signal/40">
                    Step 0{idx + 1}
                  </span>
                  <div className="h-[1px] flex-1 bg-primary-foreground/20 hidden lg:block" />
                </div>
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
      </div>
    </section>
  );
}
