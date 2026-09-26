import { Link } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import useSeo from "@/lib/useSeo";

export default function NotFound() {
  useSeo("Page Not Found", "The requested page could not be found.");

  return (
    <div className="min-h-[75vh] flex items-center justify-center p-6 text-center">
      <div className="max-w-md space-y-6">
        <span className="font-mono text-7xl font-black text-muted-foreground/30">
          404
        </span>
        <div className="space-y-2">
          <h1 className="text-3xl font-black text-foreground tracking-tight">
            Page Not Found
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The page or opportunity listing you were seeking might have been filled, archived, or is no longer accessible.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link to="/">
            <Button variant="signal" className="w-full sm:w-auto font-bold gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Button>
          </Link>
          <Link to="/jobs">
            <Button variant="outline" className="w-full sm:w-auto font-semibold gap-2">
              <Search className="h-4 w-4" />
              <span>Search All Jobs</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
