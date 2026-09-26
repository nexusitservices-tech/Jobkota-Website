import { Link } from "react-router-dom";
import { UserX } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UserNotRegisteredError() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background text-foreground text-center">
      <div className="max-w-md space-y-4">
        <div className="mx-auto h-16 w-16 rounded-full bg-amber-500/15 flex items-center justify-center text-amber-600">
          <UserX className="h-8 w-8" />
        </div>
        <h2 className="text-2xl font-black text-foreground">
          Account Invitation Required
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Your account is not currently linked to an active corporate employer registry on JobKota. Please register an account or request access from your team administrator.
        </p>
        <div className="pt-2 flex justify-center gap-3">
          <Link to="/login">
            <Button variant="outline">Sign In</Button>
          </Link>
          <Link to="/">
            <Button variant="default">Back to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
