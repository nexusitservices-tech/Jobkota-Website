import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import AuthLayout from "@/components/AuthLayout";
import GoogleIcon from "@/components/GoogleIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Field from "@/components/forms/Field";
import { Loader2, KeyRound } from "lucide-react";

export default function Register() {
  const [searchParams] = useSearchParams();
  const returnTo = searchParams.get("returnTo") || "/";

  const [step, setStep] = useState<"form" | "otp">("form");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resendStatus, setResendStatus] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setErrorMsg("Password must contain at least 8 characters.");
      return;
    }

    try {
      setIsLoading(true);
      await base44.auth.register({ email, password });
      setStep("otp");
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to initiate registration.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!otpCode.trim()) {
      setErrorMsg("Please enter the verification code.");
      return;
    }

    try {
      setIsLoading(true);
      await base44.auth.verifyOtp({ email, otpCode });
      // Hard redirect per specification
      window.location.href = returnTo;
    } catch (err: any) {
      setErrorMsg(err.message || "Invalid or expired verification code.");
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await base44.auth.resendOtp(email);
      setResendStatus("New code dispatched to your inbox.");
      setTimeout(() => setResendStatus(null), 4000);
    } catch {
      setResendStatus("Error resending code. Please try again.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      await base44.auth.loginWithProvider("google", returnTo);
      window.location.href = returnTo;
    } catch (err: any) {
      setErrorMsg(err.message || "Google sign-up failed.");
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title={step === "form" ? "Create your JobKota Account" : "Verify Your Email"}
      subtitle={
        step === "form"
          ? "Connect with tier-1 opportunities and post employer listings."
          : `We sent a one-time verification code to ${email}`
      }
    >
      {errorMsg && (
        <div className="mb-6 rounded-xl bg-destructive/10 border border-destructive/20 p-3 text-xs font-semibold text-destructive">
          {errorMsg}
        </div>
      )}

      {resendStatus && (
        <div className="mb-6 rounded-xl bg-signal/20 border border-signal/40 p-3 text-xs font-semibold text-foreground">
          {resendStatus}
        </div>
      )}

      {step === "form" ? (
        <form onSubmit={handleRegisterSubmit} className="space-y-4">
          <Field label="Work or Personal Email" required>
            <Input
              type="email"
              required
              autoComplete="email"
              placeholder="you@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field>

          <Field label="Choose Password" required hint="Min 8 characters">
            <Input
              type="password"
              required
              autoComplete="new-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Field>

          <Field label="Confirm Password" required>
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
                <span>Sending Verification...</span>
              </>
            ) : (
              "Continue to Verification"
            )}
          </Button>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground font-semibold">
                  Or register with
                </span>
              </div>
            </div>

            <div className="mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="w-full gap-2 text-xs font-semibold cursor-pointer"
              >
                <GoogleIcon />
                <span>Continue with Google</span>
              </Button>
            </div>
          </div>

          <div className="mt-8 text-center text-xs text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="font-bold text-foreground hover:underline">
              Sign in
            </Link>
          </div>
        </form>
      ) : (
        <form onSubmit={handleOtpSubmit} className="space-y-5">
          <div className="text-center pb-2">
            <div className="h-12 w-12 rounded-2xl bg-signal/20 text-foreground mx-auto flex items-center justify-center border border-signal/40 mb-3">
              <KeyRound className="h-6 w-6 text-foreground" />
            </div>
            <p className="text-xs text-muted-foreground">
              Please enter the 6-digit confirmation code. (You may use any 6-digit code for testing, e.g. <span className="font-mono font-bold text-foreground">123456</span>)
            </p>
          </div>

          <Field label="One-Time Verification Code" required>
            <Input
              type="text"
              required
              autoFocus
              maxLength={8}
              placeholder="123456"
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value)}
              className="text-center font-mono tracking-widest text-lg h-12"
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
                <span>Verifying...</span>
              </>
            ) : (
              "Complete Registration"
            )}
          </Button>

          <div className="flex items-center justify-between text-xs text-muted-foreground pt-2">
            <button
              type="button"
              onClick={handleResend}
              className="font-semibold text-foreground hover:underline cursor-pointer"
            >
              Resend verification code
            </button>

            <button
              type="button"
              onClick={() => setStep("form")}
              className="hover:underline cursor-pointer"
            >
              Change email
            </button>
          </div>
        </form>
      )}
    </AuthLayout>
  );
}
