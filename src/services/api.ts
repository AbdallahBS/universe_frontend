import { getOrCreateDeviceUUID } from "./authService";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type ApiFetchOptions = {
  method?: HttpMethod;
  headers?: Record<string, string>;
  credentials?: RequestCredentials;
  json?: unknown;
  signal?: AbortSignal;
  requireAuth?: boolean;
};

const RAW_BASE = "https://universe-backend-rk1g.onrender.com";
const BASE_URL = (RAW_BASE ?? "").replace(/\/$/, "");

export async function apiFetch<T>(
  path: string,
  opts: ApiFetchOptions = {}
): Promise<T> {
  const url = `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;

  const init: RequestInit = {
    method: opts.method ?? "GET",
    headers: {
      ...(opts.json ? { "Content-Type": "application/json" } : {}),
      ...(opts.headers ?? {}),
    },
    credentials: opts.credentials ?? "include", // This ensures cookies are sent
    body: opts.json !== undefined ? JSON.stringify(opts.json) : undefined,
    signal: opts.signal,
  };

  let res = await fetch(url, init);

  const contentType = res.headers.get("content-type") ?? "";
  const isJson = contentType.includes("application/json");
  const data = isJson ? await res.json().catch(() => ({})) : await res.text();

  try {
    if (!res.ok) {
      console.log("URL : ", url, " | STATUS TEXT : ", res.statusText, " | CODE : ", res.status);
      throw new Error(data.error?.code || "UNAUTHORIZED");
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.message === "INVALID_TOKEN") {
        console.log("Token invalid or expired, refreshing..");
        const refreshRes = await fetch(`${BASE_URL}/v1/auth/refresh`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ UUID: await getOrCreateDeviceUUID() }),
        });
        if (!refreshRes.ok) {
          throw new Error(`Request failed : ${refreshRes.statusText}`);
        }
      } else {
        let message = "Request failed";

        if (isJson && data) {
          // Handle structured error response from backend
          if (
            data.error &&
            typeof data.error === "object" &&
            data.error.message
          ) {
            message = data.error.message;
          } else if (data.message) {
            message = data.message;
          } else if (data.error) {
            message = data.error;
          }
        } else {
          message = res.statusText || "Request failed";
        }

        throw new Error(
          typeof message === "string" ? message : "Request failed"
        );
      }
    }
  }

  return isJson ? (data as T) : (data as unknown as T);
}

export type { ApiFetchOptions };
