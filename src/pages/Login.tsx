import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import AuthLayout from "@/components/AuthLayout";
import GoogleIcon from "@/components/GoogleIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Field from "@/components/forms/Field";
import { Loader2 } from "lucide-react";

export default function Login() {
  const [searchParams] = useSearchParams();
  const returnTo = searchParams.get("returnTo") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!email || !password) {
      setErrorMsg("Please provide your email and password.");
      return;
    }

    try {
      setIsLoading(true);
      await base44.auth.loginViaEmailPassword(email, password);
      // Hard redirect per specification
      window.location.href = returnTo;
    } catch (err: any) {
      setErrorMsg(err.message || "Invalid credentials. Please try again.");
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      await base44.auth.loginWithProvider("google", returnTo);
      window.location.href = returnTo;
    } catch (err: any) {
      setErrorMsg(err.message || "Google authentication failed.");
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome to JobKota"
      subtitle="Sign in to your candidate account or corporate employer portal."
    >
      {errorMsg && (
        <div className="mb-6 rounded-xl bg-destructive/10 border border-destructive/20 p-3 text-xs font-semibold text-destructive">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Field label="Email Address" required>
          <Input
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Field>

        <Field label="Password" required>
          <div className="space-y-1">
            <Input
              type="password"
              required
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex justify-end pt-1">
              <Link
                to="/forgot-password"
                className="text-xs font-semibold text-muted-foreground hover:text-foreground hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          </div>
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
              <span>Signing In...</span>
            </>
          ) : (
            "Sign In"
          )}
        </Button>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground font-semibold">
              Or continue with
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
        Don't have an account yet?{" "}
        <Link
          to={`/register${returnTo !== "/" ? `?returnTo=${encodeURIComponent(returnTo)}` : ""}`}
          className="font-bold text-foreground hover:underline"
        >
          Register now
        </Link>
      </div>
    </AuthLayout>
  );
}
