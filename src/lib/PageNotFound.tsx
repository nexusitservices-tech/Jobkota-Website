import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PageNotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6 text-center">
      <div className="max-w-md space-y-4">
        <span className="font-mono text-6xl font-black text-muted-foreground/30">
          404
        </span>
        <h2 className="text-3xl font-black text-foreground tracking-tight">
          Page Not Found
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The page or career mandate you are looking for may have been moved, closed, or is no longer available.
        </p>
        <div className="pt-2">
          <Link to="/">
            <Button variant="signal" className="gap-2 font-bold">
              <ArrowLeft className="h-4 w-4" />
              <span>Return to JobKota Home</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
