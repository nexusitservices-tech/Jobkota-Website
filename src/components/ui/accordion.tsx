import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItemContextValue {
  isOpen: boolean;
  toggle: () => void;
}

const AccordionItemContext = React.createContext<AccordionItemContextValue | undefined>(undefined);

export const Accordion: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return <div className={cn("space-y-3", className)}>{children}</div>;
};

export const AccordionItem: React.FC<{
  children: React.ReactNode;
  className?: string;
  defaultOpen?: boolean;
}> = ({ children, className, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);
  return (
    <AccordionItemContext.Provider value={{ isOpen, toggle: () => setIsOpen((prev) => !prev) }}>
      <div
        className={cn(
          "rounded-2xl border border-border bg-card transition-all overflow-hidden",
          isOpen ? "shadow-sm border-foreground/20" : "",
          className
        )}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
};

export const AccordionTrigger: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  const ctx = React.useContext(AccordionItemContext);
  if (!ctx) return null;
  return (
    <button
      type="button"
      onClick={ctx.toggle}
      className={cn(
        "flex w-full items-center justify-between p-5 sm:p-6 text-left text-base sm:text-lg font-semibold text-foreground transition-colors hover:text-primary cursor-pointer",
        className
      )}
    >
      <span>{children}</span>
      <ChevronDown
        className={cn(
          "h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200",
          ctx.isOpen && "rotate-180 text-foreground"
        )}
      />
    </button>
  );
};

export const AccordionContent: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  const ctx = React.useContext(AccordionItemContext);
  if (!ctx || !ctx.isOpen) return null;
  return (
    <div
      className={cn(
        "px-5 pb-6 sm:px-6 sm:pb-6 pt-0 text-sm sm:text-base text-muted-foreground leading-relaxed animate-in fade-in-0 slide-in-from-top-1 duration-200",
        className
      )}
    >
      {children}
    </div>
  );
};
