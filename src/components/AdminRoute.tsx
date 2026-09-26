import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminRouteProps {
  children?: React.ReactNode;
}

export default function AdminRoute({ children }: AdminRouteProps) {
  const { user } = useAuth();

  if (user && user.role !== "admin") {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-6 text-center">
        <div className="max-w-md space-y-4">
          <div className="mx-auto h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center text-destructive">
            <ShieldAlert className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-black text-foreground">
            Employer Access Required
          </h2>
          <p className="text-sm text-muted-foreground">
            This workspace area is designated for authorized corporate employers and administrators. Your current account ({user.email}) does not have administrative privileges.
          </p>
          <div className="pt-2">
            <Link to="/">
              <Button variant="default" className="font-bold">
                Return to JobKota Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return children ? <>{children}</> : <Outlet />;
}
