import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface LogoProps {
  light?: boolean;
  className?: string;
}

export default function Logo({ light = false, className }: LogoProps) {
  return (
    <Link
      to="/"
      className={cn(
        "inline-flex items-center gap-1.5 font-heading font-extrabold text-2xl tracking-tight transition-colors select-none",
        light ? "text-primary-foreground" : "text-primary",
        className
      )}
    >
      <span>JobKota</span>
      <span className="h-2 w-2 rounded-full bg-signal inline-block animate-pulse" />
    </Link>
  );
}
