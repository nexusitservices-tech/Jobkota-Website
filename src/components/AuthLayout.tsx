import React from "react";
import { Link } from "react-router-dom";
import Logo from "@/components/site/Logo";
import { ArrowLeft } from "lucide-react";

export default function AuthLayout({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="min-h-screen flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden">
      <div className="absolute inset-0 grain-grid pointer-events-none opacity-30" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] glow-radial pointer-events-none opacity-50" />

      {/* Top bar back link */}
      <div className="absolute top-6 left-6 z-20">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center relative z-10 mb-8">
        <Logo />
        <h2 className="mt-4 text-2xl sm:text-3xl font-black text-foreground tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 text-sm text-muted-foreground max-w-sm mx-auto">
            {subtitle}
          </p>
        )}
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-card border border-border py-8 px-6 sm:px-10 rounded-3xl shadow-xl">
          {children}
        </div>
      </div>
    </div>
  );
}
