// Cookie utility for non-httpOnly cookies (e.g. UI preferences).
// Note: auth tokens (accessToken, refreshToken) are httpOnly and managed by the backend.
// User identity is kept in React state only — fetched fresh from the server on mount.

export class CookieManager {
  /** Read a JS-accessible cookie by name */
  static get(name: string): string | null {
    if (typeof document === 'undefined') return null;

    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);

    if (parts.length === 2) {
      const raw = parts.pop()?.split(';').shift();
      if (!raw || raw === 'undefined') return null;
      try {
        return decodeURIComponent(raw);
      } catch {
        return null;
      }
    }
    return null;
  }

  /** Set a JS-accessible cookie */
  static set(name: string, value: unknown, days: number = 30): void {
    if (typeof document === 'undefined') return;
    if (value === undefined || value === null) return;

    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);

    const isProd = import.meta.env.VITE_NODE_ENV === 'production';
    const stringValue = typeof value === 'string' ? value : JSON.stringify(value);

    document.cookie =
      `${name}=${encodeURIComponent(stringValue)};` +
      `expires=${expires.toUTCString()};` +
      `path=/;` +
      (isProd ? 'domain=.universe.tn; Secure; SameSite=None;' : 'SameSite=Lax;');
  }

  /** Delete a cookie */
  static delete(name: string): void {
    if (typeof document === 'undefined') return;
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
  }
}

export default CookieManager;
