import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Building2 } from "lucide-react";
import { industries } from "@/lib/content";
import SectionHeading from "@/components/site/SectionHeading";
import Reveal from "@/components/site/Reveal";

export default function IndustriesGrid({ limit = 8 }: { limit?: number }) {
  const displayIndustries = industries.slice(0, limit);

  return (
    <section className="py-20 bg-background border-b border-border/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <SectionHeading
            eyebrow="Sectors We Empower"
            title="Specialized Expertise Across Key Regional Industries"
            accentWord="and economies."
            description="Deep understanding of market trends, compensation standards, and operational demands in core Gulf verticals."
            className="mb-0"
          />

          <Link
            to="/industries"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-foreground hover:text-primary underline-offset-4 hover:underline shrink-0"
          >
            <span>View All 12 Industries</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayIndustries.map((ind, idx) => (
            <Reveal key={ind.slug} delay={idx * 0.05}>
              <Link
                to={`/industries/${ind.slug}`}
                className="group relative flex flex-col justify-end h-80 rounded-3xl overflow-hidden border border-border shadow-xs hover:shadow-xl transition-all"
              >
                {/* Background image with fallback */}
                <div className="absolute inset-0 bg-neutral-900">
                  <img
                    src={ind.image}
                    alt={ind.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 p-6 space-y-2 text-white">
                  <div className="flex items-center justify-end">
                    <ArrowUpRight className="h-4 w-4 text-white/70 group-hover:text-signal group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>

                  <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-signal transition-colors">
                    {ind.name}
                  </h3>

                  <p className="text-xs text-white/75 line-clamp-2 leading-relaxed">
                    {ind.short}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
