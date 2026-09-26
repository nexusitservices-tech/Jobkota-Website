import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Calendar, UserCheck, Sparkles } from "lucide-react";
import HeroSearch from "./HeroSearch";

export default function Hero() {
  return (
    <section className="relative bg-primary text-primary-foreground pt-36 pb-24 lg:pt-44 lg:pb-32 overflow-hidden border-b border-primary-foreground/10">
      {/* Background grain-grid & signature radial glow */}
      <div className="absolute inset-0 grain-grid pointer-events-none opacity-40" />
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] glow-radial pointer-events-none opacity-70" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & Search */}
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-signal/30 bg-signal/10 px-4 py-1.5 text-xs font-semibold text-signal shadow-xs">
              <Sparkles className="h-3.5 w-3.5" />
              <span>UAE · GCC · International Talent Solutions</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-primary-foreground leading-[1.1] text-balance">
              Find Talent.
              <br />
              Find Opportunity.
              <br />
              <span className="font-display italic font-normal text-signal">
                Move Forward.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-primary-foreground/75 max-w-xl leading-relaxed font-normal">
              JobKota connects forward-thinking businesses with qualified professionals across the UAE and GCC. Making recruitment simpler, faster, and more connected.
            </p>

            <div className="pt-2">
              <HeroSearch />
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold">
              <span className="text-primary-foreground/60 uppercase tracking-wider">
                Popular Searches:
              </span>
              <Link
                to="/jobs?category=Technology"
                className="text-primary-foreground/80 hover:text-signal transition-colors underline-offset-4 hover:underline"
              >
                React Engineers
              </Link>
              <span className="text-primary-foreground/30">·</span>
              <Link
                to="/jobs?category=Finance"
                className="text-primary-foreground/80 hover:text-signal transition-colors underline-offset-4 hover:underline"
              >
                Investment Banking
              </Link>
              <span className="text-primary-foreground/30">·</span>
              <Link
                to="/jobs?category=Hospitality"
                className="text-primary-foreground/80 hover:text-signal transition-colors underline-offset-4 hover:underline"
              >
                Hospitality Directors
              </Link>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <Link
                to="/jobs"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-signal px-8 py-3.5 text-sm font-bold text-primary shadow-sm hover:brightness-105 active:scale-[0.98] transition-all"
              >
                <span>Find Jobs</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/employers/request-talent"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-primary-foreground/25 bg-transparent px-8 py-3.5 text-sm font-semibold text-primary-foreground hover:bg-white/10 active:scale-[0.98] transition-all"
              >
                <span>Hire Talent</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Visual Stage with Floating Glass Cards (Desktop only) */}
          <div className="hidden lg:block lg:col-span-5 relative">
            <div className="relative mx-auto w-full max-w-[460px] h-[520px]">
              {/* Backing stylized portrait card */}
              <div className="relative h-full w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
                  alt="Senior Talent Partner"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top filter grayscale contrast-125 opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />

                {/* Bottom subtle quote inside backdrop */}
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-xs uppercase tracking-widest text-signal font-bold">
                    Executive Placement
                  </p>
                  <p className="text-sm font-bold text-white mt-1">
                    Connecting Tier-1 talent with landmark organizations.
                  </p>
                </div>
              </div>

              {/* Floating Glass Card 1: Top Right - New Match 91% */}
              <motion.div
                initial={{ opacity: 0, x: 30, y: -20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -top-4 -right-6 w-60 rounded-2xl bg-card/95 backdrop-blur-md p-4 shadow-2xl border border-border/80 text-foreground"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                    Candidate Match
                  </span>
                  <span className="text-xs font-mono font-bold text-lime-600 bg-signal/30 px-2 py-0.5 rounded-full">
                    91% Fit
                  </span>
                </div>
                <p className="text-xs font-bold text-foreground">
                  Senior React & Cloud Lead
                </p>
                <div className="w-full bg-muted rounded-full h-2 mt-2.5 overflow-hidden">
                  <div
                    className="bg-signal h-2 rounded-full transition-all duration-1000"
                    style={{ width: "91%" }}
                  />
                </div>
              </motion.div>

              {/* Floating Glass Card 2: Mid-Left - Application Shortlisted */}
              <motion.div
                initial={{ opacity: 0, x: -30, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute top-44 -left-8 w-64 rounded-2xl bg-card/95 backdrop-blur-md p-4 shadow-2xl border border-border/80 text-foreground"
              >
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-emerald-500/15 text-emerald-600 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                      Status Update
                    </span>
                    <p className="text-xs font-bold text-foreground">
                      Application Shortlisted
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      Al Khaleej Capital · M&A Associate
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Floating Glass Card 3: Bottom Right - Interview Scheduled */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -bottom-6 -right-4 w-60 rounded-2xl bg-card/95 backdrop-blur-md p-4 shadow-2xl border border-border/80 text-foreground"
              >
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-signal/20 text-foreground flex items-center justify-center shrink-0">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                      Confirmed Meeting
                    </span>
                    <p className="text-xs font-bold text-foreground">
                      Interview: Tue 10:30 AM
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      Partner Discussion · Dubai
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
