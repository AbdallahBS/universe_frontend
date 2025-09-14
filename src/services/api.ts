type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type ApiFetchOptions = {
  method?: HttpMethod;
  headers?: Record<string, string>;
  credentials?: RequestCredentials;
  json?: unknown;
  signal?: AbortSignal;
  requireAuth?: boolean;
};

const RAW_BASE = "http://localhost:3000";
const BASE_URL = (RAW_BASE ?? '').replace(/\/$/, '');

export async function apiFetch<T>(path: string, opts: ApiFetchOptions = {}): Promise<T> {
  const url = `${BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;

  const init: RequestInit = {
    method: opts.method ?? 'GET',
    headers: {
      ...(opts.json ? { 'Content-Type': 'application/json' } : {}),
      ...(opts.headers ?? {})
    },
    credentials: opts.credentials ?? 'include', // This ensures cookies are sent
    body: opts.json !== undefined ? JSON.stringify(opts.json) : undefined,
    signal: opts.signal,
  };

  const res = await fetch(url, init);

  const contentType = res.headers.get('content-type') ?? '';
  const isJson = contentType.includes('application/json');
  const data = isJson ? await res.json().catch(() => ({})) : await res.text();

  if (!res.ok) {
    let message = 'Request failed';
    
    if (isJson && data) {
      // Handle structured error response from backend
      if (data.error && typeof data.error === 'object' && data.error.message) {
        message = data.error.message;
      } else if (data.message) {
        message = data.message;
      } else if (data.error) {
        message = data.error;
      }
    } else {
      message = res.statusText || 'Request failed';
    }
    
    throw new Error(typeof message === 'string' ? message : 'Request failed');
  }

  return (isJson ? (data as T) : (data as unknown as T));
}

export type { ApiFetchOptions };


