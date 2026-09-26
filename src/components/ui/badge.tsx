import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "signal" | "success" | "warning" | "destructive";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        {
          "bg-primary text-primary-foreground": variant === "default",
          "bg-secondary text-secondary-foreground": variant === "secondary",
          "border border-border text-foreground": variant === "outline",
          "bg-signal/20 text-lime-900 border border-signal/40": variant === "signal",
          "bg-emerald-100 text-emerald-800 border border-emerald-200": variant === "success",
          "bg-amber-100 text-amber-800 border border-amber-200": variant === "warning",
          "bg-red-100 text-red-800 border border-red-200": variant === "destructive",
        },
        className
      )}
      {...props}
    />
  );
}

export { Badge };
