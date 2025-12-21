import { Navigate } from "react-router-dom";
import LoadingSpinner from "./ui/LoadingSpinner";
import { useAuth } from "@context/AuthContext";

interface PublicRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requiredRoles?: string[];
  requireVerified?: boolean;
  disable?: boolean;
}

// Prevents authenticated users from accessing login/signup
export const PublicRoute = ({
  children,
  disable = false
}: PublicRouteProps) => {
  const { user, isLoading } = useAuth();

  if (disable) {
    return <>{children}</>;
  }

  if (isLoading) {
    return <LoadingSpinner loading={isLoading} fullScreen />;
  }

  // If user exists but is not verified, redirect to verify-email
  if (user && !user.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  // If user is authenticated and verified, redirect to dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};
