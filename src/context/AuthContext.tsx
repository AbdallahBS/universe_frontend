import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { apiFetch, setInMemoryAccessToken } from '../services/api';
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
  login: (email: string, password: string, rememberMe: boolean) => Promise<User | null>;
  loginWithGoogle: (idToken: string) => Promise<User | null>;
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
    // Store access token in memory immediately so requests made before the cross-origin
    // cookie is committed (Netlify → Render) can still authenticate via Bearer.
    if (response?.accessToken) setInMemoryAccessToken(response.accessToken);
    const responseUser = (response?.user ?? null) as User | null;
    applyUser(responseUser);
    // Re-sync from server in background; clear in-memory token once cookie is confirmed.
    fetchCurrentUser().then(freshUser => {
      setInMemoryAccessToken(null);
      if (freshUser) applyUser(freshUser);
    });
  };

  const login = async (email: string, password: string, rememberMe: boolean = false): Promise<User | null> => {
    const { login: loginService } = await import('../services/authService');
    const response = await loginService({ email, password, rememberMe });
    const responseUser = (response?.user ?? null) as User | null;
    applyUser(responseUser);
    // Store the access token in memory so any request fired before the cross-origin
    // cookie is committed (Netlify → Render) can still authenticate via Bearer.
    if (response?.accessToken) setInMemoryAccessToken(response.accessToken);
    // Re-sync from server in background for full canonical data (roles, sub…)
    // Once /me succeeds the cookie is confirmed working — clear the in-memory token.
    fetchCurrentUser().then(freshUser => {
      setInMemoryAccessToken(null); // cookie is now committed, no longer needed
      if (freshUser) applyUser(freshUser);
    });
    return responseUser;
  };

  const loginWithGoogle = async (idToken: string): Promise<User | null> => {
    const { googleLogin } = await import('../services/authService');
    const response = await googleLogin(idToken);
    const responseUser = (response?.user ?? null) as User | null;
    applyUser(responseUser);
    if (response?.accessToken) setInMemoryAccessToken(response.accessToken);
    fetchCurrentUser().then(freshUser => {
      setInMemoryAccessToken(null);
      if (freshUser) applyUser(freshUser);
    });
    return responseUser;
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
