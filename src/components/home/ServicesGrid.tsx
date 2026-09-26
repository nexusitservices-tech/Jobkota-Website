import { Link } from "react-router-dom";
import {
  Users,
  HardHat,
  ClipboardList,
  Wallet,
  ShieldCheck,
  Code2,
  ArrowUpRight,
} from "lucide-react";
import { services } from "@/lib/content";
import SectionHeading from "@/components/site/SectionHeading";
import Reveal from "@/components/site/Reveal";

const iconMap: Record<string, any> = {
  Users,
  HardHat,
  ClipboardList,
  Wallet,
  ShieldCheck,
  Code2,
};

export default function ServicesGrid({ limit }: { limit?: number }) {
  const displayServices = limit ? services.slice(0, limit) : services;

  return (
    <section className="py-20 bg-background border-b border-border/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Workforce Solutions"
          title="End-to-End People & Talent Infrastructure"
          accentWord="built for scale."
          description="Whether you need single-seat executive search, rapid site manpower, or outsourced payroll compliance across the GCC."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayServices.map((service, idx) => {
            const IconComponent = iconMap[service.icon] || Users;
            return (
              <Reveal key={service.slug} delay={idx * 0.08}>
                <Link
                  to={`/services/${service.slug}`}
                  className="group relative flex flex-col justify-between h-full min-h-[400px] rounded-3xl overflow-hidden border border-white/20 bg-slate-950/40 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:border-signal/70 hover:shadow-[0_16px_48px_0_rgba(0,240,255,0.2),0_0_24px_rgba(0,240,255,0.1)] hover:-translate-y-1.5 transition-all duration-300"
                >
                  {/* High-visibility background image layer */}
                  <div className="absolute inset-0 z-0 bg-slate-950 overflow-hidden">
                    <img
                      src={service.image || `/services/${service.slug}.jpg`}
                      alt=""
                      role="presentation"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center opacity-85 group-hover:opacity-95 group-hover:scale-105 transition-all duration-700 ease-out"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (target.src.endsWith(".jpg")) {
                          target.src = target.src.replace(/\.jpg$/, ".png");
                        } else if (target.src.endsWith(".png")) {
                          target.src = target.src.replace(/\.png$/, ".svg");
                        } else {
                          target.style.display = "none";
                        }
                      }}
                    />
                    {/* Refined luminous overlay: soft dark gradient preserving image vibrancy */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/45 to-slate-950/20" />
                    <div className="absolute inset-0 bg-radial from-transparent via-slate-950/20 to-slate-950/60 pointer-events-none" />
                  </div>

                  {/* Foreground Card Content with Layered Glassmorphism */}
                  <div className="relative z-10 flex flex-col justify-between h-full p-6 sm:p-7 space-y-6">
                    {/* Top Row: Floating Glass Badges */}
                    <div className="flex items-center justify-between">
                      <div className="h-12 w-12 rounded-2xl bg-white/15 backdrop-blur-2xl border border-white/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] flex items-center justify-center text-signal group-hover:scale-110 group-hover:bg-signal group-hover:text-slate-950 group-hover:border-signal group-hover:shadow-[0_0_24px_rgba(0,240,255,0.5)] transition-all duration-300">
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div className="h-10 w-10 rounded-full bg-white/15 backdrop-blur-2xl border border-white/30 shadow-md flex items-center justify-center text-white/90 group-hover:text-signal group-hover:bg-signal/25 group-hover:border-signal/60 group-hover:scale-105 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300">
                        <ArrowUpRight className="h-4 w-4" />
                      </div>
                    </div>

                    {/* Lower Glassmorphic Content Plate */}
                    <div className="rounded-2xl bg-slate-950/60 backdrop-blur-xl border border-white/20 p-5 sm:p-6 shadow-xl space-y-3.5 group-hover:bg-slate-950/70 group-hover:border-white/30 transition-all duration-300">
                      <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-signal transition-colors duration-200">
                        {service.title}
                      </h3>

                      <p className="text-sm text-slate-200/90 leading-relaxed line-clamp-3">
                        {service.short}
                      </p>

                      <div className="pt-3.5 border-t border-white/15 flex items-center justify-between text-xs font-semibold text-white/90 group-hover:border-signal/40 transition-colors">
                        <span className="flex items-center gap-1.5 group-hover:text-signal transition-colors">
                          {service.cta}
                          <ArrowUpRight className="h-3.5 w-3.5 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                        </span>
                        <span className="font-mono text-white/50 group-hover:text-signal/90 transition-colors">
                          0{idx + 1}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
