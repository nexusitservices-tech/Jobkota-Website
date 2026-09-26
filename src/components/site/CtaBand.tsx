import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface CtaBandProps {
  title?: string;
  accentWord?: string;
  description?: string;
  primaryLabel?: string;
  primaryTo?: string;
  secondaryLabel?: string;
  secondaryTo?: string;
  className?: string;
}

export default function CtaBand({
  title = "Tell us who you need.",
  accentWord = "We deliver.",
  description = "Connect with qualified talent across UAE, GCC, and global markets. Screened, compliant, and ready to mobilize.",
  primaryLabel = "Request Talent",
  primaryTo = "/employers/request-talent",
  secondaryLabel = "Contact Our Team",
  secondaryTo = "/contact",
  className,
}: CtaBandProps) {
  return (
    <section className={cn("relative bg-primary text-primary-foreground py-20 overflow-hidden", className)}>
      <div className="absolute inset-0 grain-grid pointer-events-none opacity-40" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] glow-radial pointer-events-none opacity-60" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-signal/30 bg-signal/10 px-4 py-1 text-xs font-semibold text-signal mb-2">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Streamlined Workforce Solutions</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-primary-foreground leading-tight text-balance">
          {title}{" "}
          {accentWord && (
            <span className="font-display italic font-normal text-signal block sm:inline">
              {accentWord}
            </span>
          )}
        </h2>

        <p className="text-base sm:text-lg text-primary-foreground/75 max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to={primaryTo}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-signal px-8 py-3.5 text-sm font-bold text-primary shadow-sm hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>{primaryLabel}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            to={secondaryTo}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-primary-foreground/25 bg-transparent px-8 py-3.5 text-sm font-semibold text-primary-foreground hover:bg-white/10 active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>{secondaryLabel}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
