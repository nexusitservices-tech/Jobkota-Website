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
                  className="group relative flex flex-col justify-between h-full rounded-3xl border border-border bg-card p-8 shadow-xs transition-all hover:border-foreground/30 hover:shadow-md"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="h-12 w-12 rounded-2xl bg-signal/20 text-foreground flex items-center justify-center border border-signal/30 group-hover:scale-105 transition-transform">
                        <IconComponent className="h-6 w-6 text-foreground" />
                      </div>
                      <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>

                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {service.short}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-border/60 flex items-center justify-between text-xs font-bold text-foreground">
                    <span>{service.cta}</span>
                    <span className="font-mono text-muted-foreground">0{idx + 1}</span>
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
