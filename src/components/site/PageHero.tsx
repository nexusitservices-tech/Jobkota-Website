import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface PageHeroProps {
  breadcrumbs?: BreadcrumbItem[];
  eyebrow?: string;
  title: string;
  accentWord?: string;
  description?: string;
  children?: React.ReactNode;
  backgroundImage?: string;
  className?: string;
}

export default function PageHero({
  breadcrumbs,
  eyebrow,
  title,
  accentWord,
  description,
  children,
  backgroundImage,
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative bg-primary text-primary-foreground pt-32 pb-20 sm:pt-36 sm:pb-24 overflow-hidden border-b border-primary-foreground/10",
        className
      )}
    >
      {/* Background grain-grid & radial glow */}
      <div className="absolute inset-0 grain-grid pointer-events-none opacity-40" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] glow-radial pointer-events-none opacity-60" />

      {backgroundImage && (
        <div className="absolute inset-0 z-0 opacity-15 overflow-hidden">
          <img
            src={backgroundImage}
            alt=""
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent" />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav
            aria-label="Breadcrumbs"
            className="flex items-center gap-1.5 text-xs text-primary-foreground/60 mb-6"
          >
            <Link to="/" className="hover:text-signal transition-colors">
              Home
            </Link>
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                <ChevronRight className="h-3 w-3 text-primary-foreground/40 shrink-0" />
                {crumb.to ? (
                  <Link to={crumb.to} className="hover:text-signal transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-primary-foreground/90 font-medium">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}

        <div className="max-w-3xl space-y-4">
          {eyebrow && (
            <p className="text-xs uppercase tracking-[0.2em] font-bold text-signal">
              {eyebrow}
            </p>
          )}

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-primary-foreground leading-[1.15] text-balance">
            {title} {accentWord && <span className="font-display italic font-normal text-signal block sm:inline">{accentWord}</span>}
          </h1>

          {description && (
            <p className="text-base sm:text-lg text-primary-foreground/75 leading-relaxed max-w-2xl font-normal">
              {description}
            </p>
          )}

          {children && <div className="pt-4">{children}</div>}
        </div>
      </div>
    </section>
  );
}
