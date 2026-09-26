import * as React from "react";
import { useToast } from "./use-toast";
import { ToastItem } from "./toast";

export function Toaster() {
  const { toasts, dismiss } = useToast();

  return (
    <div
      aria-live="assertive"
      className="fixed bottom-0 right-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-4 sm:right-4 sm:top-auto sm:flex-col md:max-w-[420px] pointer-events-none gap-2"
    >
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onDismiss={dismiss} />
      ))}
    </div>
  );
}
