import { getOrCreateDeviceUUID } from "./authService";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface ApiFetchOptions {
  method?: HttpMethod;
  headers?: Record<string, string>;
  credentials?: RequestCredentials;
  json?: unknown;
  body?: FormData;
  signal?: AbortSignal;
  requireAuth?: boolean;
}

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const RAW_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";
const BASE_URL = (RAW_BASE ?? "http://localhost:3000").replace(/\/$/, "");

// ─────────────────────────────────────────────────────────────────────────────
// TOKEN STORE
// Tokens are kept in memory AND persisted to storage so they survive page
// refreshes in cross-origin deployments (Netlify → Render) where httpOnly
// cookies are not sent by the browser on cross-site fetch requests.
// ─────────────────────────────────────────────────────────────────────────────
const STORAGE_KEY_AT = "_universe_at";
const STORAGE_KEY_RT = "_universe_rt";

let _accessToken: string | null = null;
let _refreshToken: string | null = null;

/** Load persisted tokens into memory on module init (page refresh recovery). */
function loadTokensFromStorage() {
  try {
    _accessToken = sessionStorage.getItem(STORAGE_KEY_AT) || localStorage.getItem(STORAGE_KEY_AT) || null;
    _refreshToken = sessionStorage.getItem(STORAGE_KEY_RT) || localStorage.getItem(STORAGE_KEY_RT) || null;
  } catch {
    // storage blocked (private browsing edge-cases)
  }
}

function persistTokens(at: string | null, rt: string | null, rememberMe = false) {
  _accessToken = at;
  _refreshToken = rt;
  try {
    const store = rememberMe ? localStorage : sessionStorage;
    if (at) store.setItem(STORAGE_KEY_AT, at); else { sessionStorage.removeItem(STORAGE_KEY_AT); localStorage.removeItem(STORAGE_KEY_AT); }
    if (rt) store.setItem(STORAGE_KEY_RT, rt); else { sessionStorage.removeItem(STORAGE_KEY_RT); localStorage.removeItem(STORAGE_KEY_RT); }
  } catch { /* ignore */ }
}

function clearTokenStorage() {
  _accessToken = null;
  _refreshToken = null;
  try {
    sessionStorage.removeItem(STORAGE_KEY_AT);
    sessionStorage.removeItem(STORAGE_KEY_RT);
    localStorage.removeItem(STORAGE_KEY_AT);
    localStorage.removeItem(STORAGE_KEY_RT);
  } catch { /* ignore */ }
}

// Load on import (catches page refreshes)
loadTokensFromStorage();

/** Called by AuthContext after login/signup to persist both tokens. */
export function setSessionTokens(accessToken: string, refreshToken: string, rememberMe = false) {
  persistTokens(accessToken, refreshToken, rememberMe);
}

/** Called by AuthContext on logout. */
export function clearSessionTokens() {
  clearTokenStorage();
}

/** Legacy shim used in AuthContext — maps to setSessionTokens. */
export function setInMemoryAccessToken(token: string | null) {
  if (token) { _accessToken = token; } else { _accessToken = null; }
}

// ─────────────────────────────────────────────────────────────────────────────
// REFRESH CONTROL
// ─────────────────────────────────────────────────────────────────────────────
let isRefreshing = false;
let refreshPromise: Promise<void> | null = null;

async function refreshTokens(): Promise<void> {
  if (!refreshPromise) {
    isRefreshing = true;

    refreshPromise = (async () => {
      const uuid = await getOrCreateDeviceUUID();

      // Send the persisted refresh token in the body as a fallback when
      // the httpOnly cookie is not delivered cross-origin (Netlify → Render).
      const body: Record<string, string> = { UUID: uuid };
      if (_refreshToken) body.refreshToken = _refreshToken;

      const response = await fetch(`${BASE_URL}/v1/auth/refresh`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      const contentType = response.headers.get("content-type") ?? "";
      const isJson = contentType.includes("application/json");
      const responseData = isJson ? await response.json().catch(() => null) : await response.text();

      if (!response.ok) {
        isRefreshing = false;
        refreshPromise = null;
        clearTokenStorage();
        throw new Error("REFRESH_FAILED");
      }

      // Store the new tokens returned by the refresh endpoint.
      if (responseData?.accessToken || responseData?.refreshToken) {
        persistTokens(
          responseData.accessToken ?? _accessToken,
          responseData.refreshToken ?? _refreshToken,
          !!localStorage.getItem(STORAGE_KEY_AT) // keep rememberMe preference
        );
      }

      isRefreshing = false;
      refreshPromise = null;
    })();
  }

  return refreshPromise;
}

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────
function buildHeaders(
  contentTypeHeader: Record<string, string>,
  extraHeaders: Record<string, string> = {},
  requireAuth = false
): Record<string, string> {
  const bearerHeader: Record<string, string> =
    requireAuth && _accessToken ? { Authorization: `Bearer ${_accessToken}` } : {};
  return { ...contentTypeHeader, ...bearerHeader, ...extraHeaders };
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN FETCH WRAPPER
// ─────────────────────────────────────────────────────────────────────────────
export async function apiFetch<T>(path: string, opts: ApiFetchOptions = {}): Promise<T> {
  const url = `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;

  let bodyToSend: BodyInit | undefined;
  let contentTypeHeader: Record<string, string> = {};

  if (opts.body instanceof FormData) {
    bodyToSend = opts.body;
  } else if (opts.json !== undefined) {
    bodyToSend = JSON.stringify(opts.json);
    contentTypeHeader = { "Content-Type": "application/json" };
  }

  const makeInit = (): RequestInit => ({
    method: opts.method ?? "GET",
    credentials: opts.credentials ?? "include",
    headers: buildHeaders(contentTypeHeader, opts.headers, opts.requireAuth),
    body: bodyToSend,
    signal: opts.signal
  });

  let response = await fetch(url, makeInit());

  const contentType = response.headers.get("content-type") ?? "";
  const isJson = contentType.includes("application/json");
  const responseData = isJson ? await response.json().catch(() => null) : await response.text();

  if (response.ok) {
    return (isJson ? responseData : responseData as unknown) as T;
  }

  const errorCode =
    responseData?.error?.code ||
    responseData?.code ||
    responseData?.message ||
    response.statusText;

  const tokenExpired =
    errorCode === "INVALID_TOKEN" ||
    errorCode === "TOKEN_EXPIRED" ||
    errorCode === "AUTH_EXPIRED" ||
    response.status === 401;

  if (tokenExpired && opts.requireAuth) {
    try {
      if (!isRefreshing) {
        await refreshTokens();
      } else {
        await refreshPromise;
      }
      await delay(300);

      // Retry with freshly-updated Bearer token (rebuilt via makeInit).
      const retryResponse = await fetch(url, makeInit());
      const retryContentType = retryResponse.headers.get("content-type") ?? "";
      const retryIsJson = retryContentType.includes("application/json");
      const retryData = retryIsJson
        ? await retryResponse.json().catch(() => null)
        : await retryResponse.text();

      if (!retryResponse.ok) {
        throw new Error(
          retryIsJson && retryData?.error?.message
            ? retryData.error.message
            : "Request failed after refresh"
        );
      }
      return retryData as T;
    } catch (err: any) {
      throw new Error(err ?? "AUTH_EXPIRED");
    }
  }

  const errorMessage =
    (responseData?.error?.message ??
      responseData?.message ??
      errorCode ??
      "Request failed") as string;

  throw new Error(errorMessage);
}

export type { ApiFetchOptions };
