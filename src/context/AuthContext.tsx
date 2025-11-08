import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import CookieManager from '../utils/cookies';
import { User } from 'types/resource';

type AuthContextValue = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = useMemo(() => !!user, [user]);

  // Initialize auth state from cookies on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const isAuth = await CookieManager.isAuthenticated();
        const CookieUser = CookieManager.getUser();
        
        if (isAuth && CookieUser) {
          setUser(CookieUser);
        }

      } catch (error) {
        console.error('Failed to initialize auth state:', error);
        // Clear invalid data
        CookieManager.clearAuth();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { login: loginService } = await import('../services/authService');
      const response = await loginService({ email, password });
      
      // Store user data in cookie (tokens are already set by backend)
      if (response.user) {
        CookieManager.set('user', JSON.stringify(response.user), 30);
        setUser(response.user);
      }
    } catch (error) {
      console.error('Login failed:', error);
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
    }
  };

  const value = useMemo(() => ({
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    setUser
  }), [user, isAuthenticated, isLoading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}


