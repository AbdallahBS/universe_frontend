import { refreshToken } from '../services/authService';

class TokenManager {
  private refreshPromise: Promise<string | null> | null = null;

  async getValidToken(): Promise<string | null> {
    const token = localStorage.getItem('accessToken');
    if (!token) return null;

    // Check if token is expired (basic check - you might want to decode JWT for more accuracy)
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const now = Date.now() / 1000;
      
      // If token expires in less than 5 minutes, refresh it
      if (payload.exp - now < 300) {
        return this.refreshAccessToken();
      }
      
      return token;
    } catch (error) {
      console.error('Invalid token format:', error);
      return this.refreshAccessToken();
    }
  }

  private async refreshAccessToken(): Promise<string | null> {
    // Prevent multiple simultaneous refresh attempts
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    this.refreshPromise = this.performRefresh();
    
    try {
      const result = await this.refreshPromise;
      return result;
    } finally {
      this.refreshPromise = null;
    }
  }

  private async performRefresh(): Promise<string | null> {
    try {
      const response = await refreshToken();
      
      // Update stored tokens
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      
      return response.accessToken;
    } catch (error) {
      console.error('Token refresh failed:', error);
      
      // Clear invalid tokens
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      
      return null;
    }
  }

  clearTokens(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  }
}

export const tokenManager = new TokenManager();
