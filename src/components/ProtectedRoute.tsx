import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";

interface ProtectedRouteProps {
  unauthenticatedElement?: React.ReactElement;
}

export default function ProtectedRoute({
  unauthenticatedElement = <Navigate to="/login" replace />,
}: ProtectedRouteProps) {
  const { user, isLoadingAuth } = useAuth();

  if (isLoadingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-signal" />
      </div>
    );
  }

  if (!user) {
    return unauthenticatedElement;
  }

  return <Outlet />;
}
