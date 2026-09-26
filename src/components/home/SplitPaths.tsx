import { Link } from "react-router-dom";
import { ArrowRight, User, Building2, CheckCircle2 } from "lucide-react";
import Reveal from "@/components/site/Reveal";

export default function SplitPaths() {
  return (
    <section className="py-20 bg-background border-b border-border/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* For Candidates (Light Card) */}
          <Reveal delay={0.1}>
            <div className="rounded-3xl border border-border bg-card p-8 sm:p-10 shadow-xs flex flex-col justify-between h-full space-y-8">
              <div className="space-y-5">
                <div className="h-12 w-12 rounded-2xl bg-signal/20 text-foreground flex items-center justify-center border border-signal/30">
                  <User className="h-6 w-6 text-foreground" />
                </div>

                <div>
                  <span className="text-xs uppercase tracking-widest text-muted-foreground font-bold">
                    For Job Seekers
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground mt-1 tracking-tight">
                    Accelerate your professional trajectory.
                  </h3>
                </div>

                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Discover verified opportunities across tech, banking, executive leadership, and major infrastructure in the UAE and GCC. No ghost jobs, real feedback.
                </p>

                {/* Flow chips */}
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-muted px-3 py-1.5 rounded-full text-foreground">
                    <CheckCircle2 className="h-3.5 w-3.5 text-signal" />
                    Find a job
                  </span>
                  <span className="text-muted-foreground/40">→</span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-muted px-3 py-1.5 rounded-full text-foreground">
                    <CheckCircle2 className="h-3.5 w-3.5 text-signal" />
                    Apply with CV
                  </span>
                  <span className="text-muted-foreground/40">→</span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-muted px-3 py-1.5 rounded-full text-foreground">
                    <CheckCircle2 className="h-3.5 w-3.5 text-signal" />
                    Track progress
                  </span>
                </div>
              </div>

              <div>
                <Link
                  to="/jobs"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-all cursor-pointer"
                >
                  <span>Explore Open Positions</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </Reveal>

          {/* For Employers (Dark Card) */}
          <Reveal delay={0.2}>
            <div className="relative rounded-3xl bg-primary text-primary-foreground p-8 sm:p-10 shadow-xl flex flex-col justify-between h-full space-y-8 overflow-hidden border border-primary-foreground/10">
              <div className="absolute inset-0 grain-grid pointer-events-none opacity-30" />
              <div className="absolute -top-12 -right-12 w-64 h-64 glow-radial pointer-events-none opacity-50" />

              <div className="relative z-10 space-y-5">
                <div className="h-12 w-12 rounded-2xl bg-signal/20 text-signal flex items-center justify-center border border-signal/40">
                  <Building2 className="h-6 w-6 text-signal" />
                </div>

                <div>
                  <span className="text-xs uppercase tracking-widest text-signal font-bold">
                    For Organizations & HR
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-primary-foreground mt-1 tracking-tight">
                    Secure compliant, high-impact workforce.
                  </h3>
                </div>

                <p className="text-sm sm:text-base text-primary-foreground/75 leading-relaxed">
                  From permanent executive recruitment and IT staffing to on-demand manpower supply and EOR services across GCC markets.
                </p>

                {/* Flow chips */}
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-white/10 px-3 py-1.5 rounded-full text-primary-foreground">
                    <CheckCircle2 className="h-3.5 w-3.5 text-signal" />
                    Specify talent
                  </span>
                  <span className="text-primary-foreground/40">→</span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-white/10 px-3 py-1.5 rounded-full text-primary-foreground">
                    <CheckCircle2 className="h-3.5 w-3.5 text-signal" />
                    Review vetted shortlist
                  </span>
                  <span className="text-primary-foreground/40">→</span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-white/10 px-3 py-1.5 rounded-full text-primary-foreground">
                    <CheckCircle2 className="h-3.5 w-3.5 text-signal" />
                    Mobilize on site
                  </span>
                </div>
              </div>

              <div className="relative z-10">
                <Link
                  to="/employers/request-talent"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-signal px-7 py-3.5 text-sm font-bold text-primary shadow-sm hover:brightness-105 transition-all cursor-pointer"
                >
                  <span>Request Talent or Workforce</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
