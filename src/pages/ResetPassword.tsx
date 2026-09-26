import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import AuthLayout from "@/components/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Field from "@/components/forms/Field";
import { Loader2 } from "lucide-react";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const resetToken = searchParams.get("token") || "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (newPassword !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    if (newPassword.length < 8) {
      setErrorMsg("Password must be at least 8 characters.");
      return;
    }

    try {
      setIsLoading(true);
      await base44.auth.resetPassword({ resetToken, newPassword });
      // Hard redirect per specification
      window.location.href = "/login";
    } catch (err: any) {
      setErrorMsg(err.message || "Unable to reset password. The link may have expired.");
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create New Password"
      subtitle="Please choose a strong password with at least 8 characters."
    >
      {errorMsg && (
        <div className="mb-6 rounded-xl bg-destructive/10 border border-destructive/20 p-3 text-xs font-semibold text-destructive">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Field label="New Password" required hint="Min 8 characters">
          <Input
            type="password"
            required
            autoComplete="new-password"
            placeholder="••••••••"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </Field>

        <Field label="Confirm New Password" required>
          <Input
            type="password"
            required
            autoComplete="new-password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Field>

        <Button
          type="submit"
          variant="signal"
          size="lg"
          disabled={isLoading}
          className="w-full font-bold cursor-pointer"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Updating Password...</span>
            </>
          ) : (
            "Update Password & Sign In"
          )}
        </Button>

        <div className="pt-2 text-center text-xs">
          <Link to="/login" className="text-muted-foreground hover:text-foreground">
            Cancel and return to login
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
