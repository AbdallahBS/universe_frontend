import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { apiFetch } from '../services/api';
import { User } from 'types/resource';
import { getStats } from '../services/authService';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────
type AuthContextValue = {
  user: User | null;
  userRoles: string[];
  stats: any;
  isAuthenticated: boolean;
  isLoading: boolean;
  signup: (payload: { firstname: string; lastname: string; email: string; password: string }) => Promise<void>;
  login: (email: string, password: string, rememberMe: boolean) => Promise<void>;
  loginWithGoogle: (idToken: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// ─────────────────────────────────────────────────────────────────────────────
// Helper: fetch the current session from the server
// Single source of truth — reads httpOnly cookies, returns fresh user data.
// ─────────────────────────────────────────────────────────────────────────────
async function fetchCurrentUser(): Promise<User | null> {
  try {
    const data: any = await apiFetch('/v1/auth/me', { requireAuth: true });
    return data?.user ?? null;
  } catch {
    return null;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Provider
// ─────────────────────────────────────────────────────────────────────────────
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userRoles, setUserRoles] = useState<string[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = useMemo(() => !!user, [user]);

  // ── Restore session on app mount ──────────────────────────────────────────
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Auth and stats are independent — run in parallel for performance
        const [freshUser, statsResponse] = await Promise.allSettled([
          fetchCurrentUser(),
          getStats(),
        ]);

        if (statsResponse.status === 'fulfilled') {
          setStats(statsResponse.value);
        }

        if (freshUser.status === 'fulfilled' && freshUser.value) {
          setUser(freshUser.value);
          setUserRoles((freshUser.value as any).roles || []);
        }
      } catch (error) {
        console.error('Failed to initialize auth state:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // ── Helpers to update state after login ───────────────────────────────────
  const applyUser = (newUser: User | null) => {
    setUser(newUser);
    setUserRoles((newUser as any)?.roles || []);
  };

  // ── Auth actions ──────────────────────────────────────────────────────────
  const signup = async (payload: { firstname: string; lastname: string; email: string; password: string }) => {
    const { signup: signupService } = await import('../services/authService');
    const response = await signupService(payload);
    // Backend sets httpOnly cookies. Fetch fresh user from server as source of truth.
    const freshUser = await fetchCurrentUser();
    applyUser(freshUser ?? (response.user as any));
  };

  const login = async (email: string, password: string, rememberMe: boolean = false) => {
    const { login: loginService } = await import('../services/authService');
    await loginService({ email, password, rememberMe });
    // Backend sets httpOnly cookies. Fetch fresh user from server as source of truth.
    const freshUser = await fetchCurrentUser();
    applyUser(freshUser);
  };

  const loginWithGoogle = async (idToken: string) => {
    const { googleLogin } = await import('../services/authService');
    await googleLogin(idToken);
    // Backend sets httpOnly cookies. Fetch fresh user from server as source of truth.
    const freshUser = await fetchCurrentUser();
    applyUser(freshUser);
  };

  const logout = async () => {
    try {
      const { logout: logoutService } = await import('../services/authService');
      await logoutService();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      applyUser(null);
    }
  };

  // Refresh user data from server (e.g. after profile update)
  const refreshUser = async () => {
    const freshUser = await fetchCurrentUser();
    if (freshUser) {
      applyUser(freshUser);
    }
  };

  const value = useMemo(() => ({
    user,
    userRoles,
    stats,
    isAuthenticated,
    isLoading,
    signup,
    login,
    loginWithGoogle,
    logout,
    setUser,
    refreshUser,
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [user, userRoles, stats, isAuthenticated, isLoading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// ─────────────────────────────────────────────────────────────────────────────
// Hook
// ─────────────────────────────────────────────────────────────────────────────
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
