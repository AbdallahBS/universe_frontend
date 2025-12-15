import { Navigate, useLocation } from 'react-router-dom';
import LoadingSpinner from './ui/LoadingSpinner';
import { useAuth } from '@context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requiredRoles?: string[];
  requireVerified?: boolean;
  disable?: boolean;
}

export const ProtectedRoute = ({ 
  children, 
  requireAuth = true,
  requiredRoles = [],
  requireVerified = false,
  disable = false
}: ProtectedRouteProps) => {
  const { user, userRoles, isLoading } = useAuth();

  // Manual mounting of user roles (remove that later, it's just for testing purposes)

  if (disable) {
    return <>{children}</>;
  }

  const location = useLocation();

  // Show loading spinner while checking auth
  if (isLoading) {
    return <LoadingSpinner loading={isLoading} fullScreen/>;
  }

  // SECURITY: Redirect unauthenticated users
  if (requireAuth && !user) {
    console.log("no user ffound");
    
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // SECURITY: Check role-based access
  if (requiredRoles.length > 0 && user) {
    if (!userRoles.some(role => requiredRoles.includes(role))) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // SECURITY: Check email verification
  if (requireVerified && user && !user.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return <>{children}</>;
};