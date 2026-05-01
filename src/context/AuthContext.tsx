import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { apiFetch, setSessionTokens, clearSessionTokens } from '../services/api';
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
// Helper: validate the current session with the server.
// Sends the in-memory Bearer token (loaded from storage on page refresh) so
// this works in cross-origin deployments where httpOnly cookies are blocked.
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

  // ── Restore session on app mount (including page refresh) ─────────────────
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // api.ts already loaded the persisted tokens from storage into memory,
        // so fetchCurrentUser() will send them as Bearer → works cross-origin.
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

  // ── Helpers ───────────────────────────────────────────────────────────────
  const applyUser = (newUser: User | null) => {
    setUser(newUser);
    setUserRoles((newUser as any)?.roles || []);
  };

  // ── Auth actions ──────────────────────────────────────────────────────────
  const signup = async (payload: { firstname: string; lastname: string; email: string; password: string }) => {
    const { signup: signupService } = await import('../services/authService');
    const response = await signupService(payload);

    // Persist tokens immediately — survives page refresh in cross-origin envs.
    if (response?.accessToken && response?.refreshToken) {
      setSessionTokens(response.accessToken, response.refreshToken, false);
    }

    const responseUser = (response?.user ?? null) as User | null;
    applyUser(responseUser);

    // Sync canonical user data in background (non-blocking).
    fetchCurrentUser().then(freshUser => { if (freshUser) applyUser(freshUser); });
  };

  const login = async (email: string, password: string, rememberMe = false): Promise<User | null> => {
    const { login: loginService } = await import('../services/authService');
    const response = await loginService({ email, password, rememberMe });

    // Persist tokens — use localStorage for rememberMe, sessionStorage otherwise.
    if (response?.accessToken && response?.refreshToken) {
      setSessionTokens(response.accessToken, response.refreshToken, rememberMe);
    }

    const responseUser = (response?.user ?? null) as User | null;
    applyUser(responseUser);

    // Sync canonical user data in background (roles, sub, etc. from DB).
    fetchCurrentUser().then(freshUser => { if (freshUser) applyUser(freshUser); });

    return responseUser;
  };

  const loginWithGoogle = async (idToken: string): Promise<User | null> => {
    const { googleLogin } = await import('../services/authService');
    const response = await googleLogin(idToken);

    if (response?.accessToken && response?.refreshToken) {
      setSessionTokens(response.accessToken, response.refreshToken, true); // Google = always rememberMe
    }

    const responseUser = (response?.user ?? null) as User | null;
    applyUser(responseUser);

    fetchCurrentUser().then(freshUser => { if (freshUser) applyUser(freshUser); });

    return responseUser;
  };

  const logout = async () => {
    try {
      const { logout: logoutService } = await import('../services/authService');
      await logoutService();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      clearSessionTokens(); // wipe storage + memory
      applyUser(null);
    }
  };

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
