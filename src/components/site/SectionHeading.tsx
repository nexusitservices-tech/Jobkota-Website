import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  accentWord?: string;
  description?: string;
  centered?: boolean;
  className?: string;
  light?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  accentWord,
  description,
  centered = false,
  className,
  light = false,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "space-y-3 mb-12",
        centered ? "text-center mx-auto max-w-2xl" : "max-w-2xl",
        className
      )}
    >
      {eyebrow && (
        <p className="text-xs uppercase tracking-[0.2em] font-bold text-muted-foreground">
          {eyebrow}
        </p>
      )}

      <h2
        className={cn(
          "text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-balance",
          light ? "text-primary-foreground" : "text-foreground"
        )}
      >
        {title}{" "}
        {accentWord && (
          <span className="font-display italic font-normal text-signal block sm:inline">
            {accentWord}
          </span>
        )}
      </h2>

      {description && (
        <p
          className={cn(
            "text-base sm:text-lg leading-relaxed",
            light ? "text-primary-foreground/75" : "text-muted-foreground"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
