// Cookie utility functions for authentication

import { apiFetch } from "../services/api";

export class CookieManager {
  // Get a cookie value by name
  static get(name: string): string | null {
    if (typeof document === 'undefined') return null;
    
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      const cookieValue = parts.pop()?.split(';').shift();
      return cookieValue || null;
    }
    return null;
  }

  // Set a cookie
  static set(name: string, value: string, days: number = 30): void {
    if (typeof document === 'undefined') return;
    
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;secure;samesite=strict`;
  }

  // Delete a cookie
  static delete(name: string): void {
    if (typeof document === 'undefined') return;
    
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
  }

  // Check if user is authenticated (has access token cookie)
  static async isAuthenticated(): Promise<any> {
    try {
        const data = await apiFetch<any>('/v1/auth/me');
        return data;
      } catch (err: any) {
        return false;
      }
  }

  // Get user data from cookies (if stored there)
  static getUser(): any {
    const userCookie = this.get('user');
    if (userCookie) {
      try {
        return JSON.parse(userCookie);
      } catch {
        return null;
      }
    }
    return null;
  }

  // Clear all auth cookies
  static clearAuth(): void {
    // this.delete('accessToken');  ** removed from the backend **
    // this.delete('refreshToken');
    this.delete('user');
  }
}

export default CookieManager;
