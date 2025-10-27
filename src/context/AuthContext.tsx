import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import CookieManager from '../utils/cookies';
import { User } from 'types/resource';

type AuthContextValue = {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
  setAccessToken: (token: string | null) => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = useMemo(() => !!user && !!accessToken, [user, accessToken]);

  // Initialize auth state from cookies on mount
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const isAuth = CookieManager.isAuthenticated();
        const user = CookieManager.getUser();
        
        if (isAuth && user) {
          setAccessToken('cookie-based'); // We don't need to store the actual token
          setUser(user);
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
      setAccessToken('cookie-based');
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
      setAccessToken(null);
    }
  };

  const value = useMemo(() => ({
    user,
    accessToken,
    isAuthenticated,
    isLoading,
    login,
    logout,
    setUser,
    setAccessToken
  }), [user, accessToken, isAuthenticated, isLoading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}


