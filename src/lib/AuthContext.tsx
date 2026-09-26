import React, { createContext, useContext, useEffect, useState } from "react";
import { base44, UserEntity } from "@/api/base44Client";

interface AuthError {
  type: "user_not_registered" | "auth_required" | "generic";
  message?: string;
}

interface AuthContextValue {
  user: UserEntity | null;
  isLoadingAuth: boolean;
  isLoadingPublicSettings: boolean;
  authError: AuthError | null;
  navigateToLogin: (returnTo?: string) => void;
  logout: (redirectUrl?: string) => Promise<void>;
  setUser: (user: UserEntity | null) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserEntity | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [isLoadingPublicSettings, setIsLoadingPublicSettings] = useState(true);
  const [authError, setAuthError] = useState<AuthError | null>(null);

  useEffect(() => {
    async function initAuth() {
      try {
        const currentUser = await base44.auth.me();
        setUser(currentUser);
      } catch (err: any) {
        setUser(null);
      } finally {
        setIsLoadingAuth(false);
        setIsLoadingPublicSettings(false);
      }
    }
    initAuth();
  }, []);

  const navigateToLogin = (returnTo?: string) => {
    base44.auth.redirectToLogin(returnTo);
  };

  const logout = async (redirectUrl = "/") => {
    await base44.auth.logout(redirectUrl);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoadingAuth,
        isLoadingPublicSettings,
        authError,
        navigateToLogin,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
