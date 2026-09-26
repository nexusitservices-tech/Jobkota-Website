import React, { useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import AuthLayout from "@/components/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Field from "@/components/forms/Field";
import { CheckCircle2, Loader2, ArrowLeft } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    try {
      setIsLoading(true);
      await base44.auth.resetPasswordRequest(email);
      setSubmitted(true);
    } catch {
      // Always show generic success for privacy per security guidelines
      setSubmitted(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Reset Your Password"
      subtitle="Enter the email associated with your JobKota account."
    >
      {submitted ? (
        <div className="text-center space-y-4 py-2">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-signal/20 text-foreground border border-signal/40">
            <CheckCircle2 className="h-7 w-7 text-lime-600" />
          </div>
          <h3 className="text-lg font-bold text-foreground">
            Password Instructions Sent
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            If an account exists for <span className="font-semibold text-foreground">{email}</span>, we have dispatched instructions to reset your password.
          </p>
          <div className="pt-4">
            <Link to="/login">
              <Button variant="outline" className="w-full text-xs font-semibold gap-2">
                <ArrowLeft className="h-4 w-4" />
                <span>Return to Sign In</span>
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Registered Email Address" required>
            <Input
              type="email"
              required
              autoFocus
              placeholder="you@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
                <span>Submitting...</span>
              </>
            ) : (
              "Send Reset Link"
            )}
          </Button>

          <div className="pt-4 text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Login</span>
            </Link>
          </div>
        </form>
      )}
    </AuthLayout>
  );
}
