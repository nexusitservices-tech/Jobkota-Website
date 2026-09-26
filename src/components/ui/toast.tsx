import * as React from "react";
import { X, CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { ToastProps } from "./use-toast";

export const ToastItem: React.FC<{
  toast: ToastProps;
  onDismiss: (id: string) => void;
}> = ({ toast, onDismiss }) => {
  return (
    <div
      className={cn(
        "pointer-events-auto relative flex w-full max-w-sm items-start gap-3 rounded-2xl border p-4 shadow-xl transition-all",
        toast.variant === "destructive"
          ? "border-red-200 bg-red-50 text-red-950"
          : toast.variant === "success"
          ? "border-emerald-200 bg-emerald-50 text-emerald-950"
          : "border-border bg-card text-foreground"
      )}
    >
      {toast.variant === "success" && (
        <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
      )}
      {toast.variant === "destructive" && (
        <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
      )}
      <div className="flex-1 space-y-1">
        {toast.title && <p className="text-sm font-bold">{toast.title}</p>}
        {toast.description && (
          <p className="text-xs text-muted-foreground">{toast.description}</p>
        )}
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        className="rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
        aria-label="Close"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};
