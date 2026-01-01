import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import CookieManager from '../utils/cookies';
import { User } from 'types/resource';
import { getStats } from '../services/authService';

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

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userRoles, setUserRoles] = useState<string[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = useMemo(() => !!user, [user]);

  // Initialize auth state from cookies on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const response: any = await getStats();
        setStats(response);

        const me: any = await CookieManager.isAuthenticated();
        const isAuth = !!me;

        const CookieUser = CookieManager.getUser();

        if (isAuth && CookieUser) {
          setUser(CookieUser);
          setUserRoles(me.user.roles || []);
        }

      } catch (error) {
        console.error('Failed to initialize auth state:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const signup = async (payload: { firstname: string; lastname: string; email: string; password: string }) => {
    try {
      const { signup: signupService } = await import('../services/authService');
      const response = await signupService(payload);

      // Store user data in cookie (tokens are already set by backend)
      if (response.user) {
        response.user.rememberMe = true; // rememberMe auto checked
        CookieManager.set('user', JSON.stringify(response.user), 30);
        setUser(response.user);
      }
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    }
  };

  const login = async (email: string, password: string, rememberMe: boolean = false) => {
    try {
      const { login: loginService } = await import('../services/authService');
      const response = await loginService({ email, password, rememberMe });

      // Store user data in cookie (tokens are already set by backend)
      if (response.user) {
        response.user.rememberMe = rememberMe;
        CookieManager.set('user', JSON.stringify(response.user), 30);
        setUser(response.user);

        const me: any = await CookieManager.isAuthenticated();
        setUserRoles(me.user.roles || []);
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const loginWithGoogle = async (idToken: string) => {
    try {
      const { googleLogin } = await import('../services/authService');
      const response = await googleLogin(idToken);

      // Store user data in cookie (tokens are already set by backend)
      if (response.user) {
        response.user.rememberMe = true; // rememberMe auto checked
        CookieManager.set('user', JSON.stringify(response.user), 30);
        setUser(response.user);

        const me: any = await CookieManager.isAuthenticated();
        setUserRoles(me.user.roles || []);
      }
    } catch (error) {
      console.error('Google login failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      const { logout: logoutService } = await import('../services/authService');
      await logoutService();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      // Clear cookies and local state
      CookieManager.clearAuth();
      setUser(null);
      setUserRoles([]);
    }
  };

  // Refresh user data from backend
  const refreshUser = async () => {
    try {
      const me: any = await CookieManager.isAuthenticated();
      if (me && me.user) {
        CookieManager.set('user', JSON.stringify(me.user), 30);
        setUser(me.user);
        setUserRoles(me.user.roles || []);
      }
    } catch (error) {
      console.error('Failed to refresh user:', error);
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
    refreshUser
  }), [user, userRoles, isAuthenticated, isLoading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
