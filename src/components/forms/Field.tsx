import React from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface FieldProps {
  label?: string;
  error?: string;
  required?: boolean;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}

export default function Field({
  label,
  error,
  required,
  hint,
  className,
  children,
}: FieldProps) {
  return (
    <div className={cn("space-y-1.5 text-left", className)}>
      {label && (
        <div className="flex items-center justify-between">
          <Label className="text-xs font-semibold text-foreground">
            {label} {required && <span className="text-destructive">*</span>}
          </Label>
          {hint && <span className="text-[11px] text-muted-foreground">{hint}</span>}
        </div>
      )}
      {children}
      {error && <p className="text-xs font-medium text-destructive mt-1">{error}</p>}
    </div>
  );
}
