import { getOrCreateDeviceUUID } from "./authService";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface ApiFetchOptions {
  method?: HttpMethod;
  headers?: Record<string, string>;
  credentials?: RequestCredentials;
  json?: unknown;
  signal?: AbortSignal;
  requireAuth?: boolean;
}

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const RAW_BASE = import.meta.env.VITE_API_URL;
const BASE_URL = (RAW_BASE ?? "").replace(/\/$/, "");

// ---------- GLOBAL REFRESH CONTROL ----------
let isRefreshing = false;
let refreshPromise: Promise<void> | null = null;

// Refresh function
async function refreshTokens(): Promise<void> {
  if (!refreshPromise) {
    isRefreshing = true;

    refreshPromise = (async () => {
      const uuid = await getOrCreateDeviceUUID();

      const response = await fetch(`${BASE_URL}/v1/auth/refresh`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ UUID: uuid })
      });

      const contentType = response.headers.get("content-type") ?? "";
      const isJson = contentType.includes("application/json");
      const responseData = isJson ? await response.json().catch(() => null) : await response.text();

      if (!response.ok) {
         const errorCode =
    responseData?.error?.code ||
    responseData?.code ||
    responseData?.message ||
    response.statusText;

        isRefreshing = false;
        refreshPromise = null;
        console.log("REFRESH_FAILED");
        console.log(errorCode);
        throw new Error("REFRESH_FAILED");
      }

      // Wait until refreshed successfully
      isRefreshing = false;
      refreshPromise = null;
    })();
  }

  return refreshPromise;
}

// ---------- MAIN FETCH WRAPPER ----------
export async function apiFetch<T>(path: string, opts: ApiFetchOptions = {}): Promise<T> {
  const url = `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;

  const requestInit: RequestInit = {
    method: opts.method ?? "GET",
    credentials: opts.credentials ?? "include",
    headers: {
      ...(opts.json ? { "Content-Type": "application/json" } : {}),
      ...(opts.headers ?? {})
    },
    body: opts.json !== undefined ? JSON.stringify(opts.json) : undefined,
    signal: opts.signal
  };

  let response = await fetch(url, requestInit);

  // Extract response body
  const contentType = response.headers.get("content-type") ?? "";
  const isJson = contentType.includes("application/json");
  const responseData = isJson ? await response.json().catch(() => null) : await response.text();

  // ---------- FIRST VALIDATION ----------
  if (response.ok) {
    return (isJson ? responseData : (responseData as unknown)) as T;
  }

  // If request requires auth & token invalid → try refresh
  const errorCode =
    responseData?.error?.code ||
    responseData?.code ||
    responseData?.message ||
    response.statusText;

  const tokenExpired =
    errorCode === "INVALID_TOKEN" ||
    errorCode === "TOKEN_EXPIRED" ||
    errorCode === "AUTH_EXPIRED" ||
    response.status === 401 ||
    response.status === 400;

  //if (opts.requireAuth && tokenExpired) {
  if (tokenExpired) {
    // ---------- TOKEN REFRESH LOGIC ----------
    try {
      if (!isRefreshing) {
        console.log("start refreshing...");
        
        // Start refresh
        await refreshTokens();
      } else {
        // Wait for the refresh already in progress
        await refreshPromise;
      }

      await delay(300);
      // After successful refresh → retry original request once
      const retryResponse = await fetch(url, requestInit);

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
    } catch (err) {
      throw new Error("AUTH_EXPIRED");
    }
  }

  // ---------- NON-AUTH ERRORS ----------
  const errorMessage =
    (responseData?.error?.message ??
      responseData?.message ??
      errorCode ??
      "Request failed") as string;

  throw new Error(errorMessage);
}

export type { ApiFetchOptions };
