import { apiFetch } from './api';
import type { SignupPayload, TokensResponse } from '../types/auth';

function getOrCreateDeviceUUID(): string {
  try {
    const key = 'deviceUUID';
    const existing = localStorage.getItem(key);
    if (existing) return existing;
    // Prefer crypto.randomUUID when available
    // Fallback to timestamp-random
    const generated = (globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`);
    localStorage.setItem(key, generated);
    return generated;
  } catch {
    // In environments without localStorage
    return (globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`);
  }
}

export async function signup(payload: SignupPayload): Promise<TokensResponse> {
  const UUID = getOrCreateDeviceUUID();
  try {
    const data = await apiFetch<TokensResponse>('/v1/auth/signup', {
      method: 'POST',
      json: { ...payload, UUID },
      requireAuth: false,
    });
    return data;
  } catch (err: any) {
    const message = typeof err?.message === 'string' ? err.message : 'Signup failed';
    throw new Error(message);
  }
}

export async function verifyEmail(payload: { code?: string; token?: string }): Promise<{ message: string }> {
  try {
    const data = await apiFetch<{ message: string }>('/v1/auth/verify-email/confirm', {
      method: 'POST',
      json: payload,
      requireAuth: false,
    });
    return data;
  } catch (err: any) {
    const message = typeof err?.message === 'string' ? err.message : 'Email verification failed';
    throw new Error(message);
  }
}

export async function requestEmailVerification(): Promise<{ message: string }> {
  try {
    const data = await apiFetch<{ message: string }>('/v1/auth/verify-email/request', {
      method: 'POST',
      requireAuth: true,
    });
    return data;
  } catch (err: any) {
    const message = typeof err?.message === 'string' ? err.message : 'Failed to request verification email';
    throw new Error(message);
  }
}

export async function login(payload: { email: string; password: string; UUID?: string }): Promise<TokensResponse> {
  const UUID = payload.UUID || getOrCreateDeviceUUID();
  try {
    const data = await apiFetch<TokensResponse>('/v1/auth/login', {
      method: 'POST',
      json: { ...payload, UUID },
      requireAuth: false,
    });
    return data;
  } catch (err: any) {
    const message = typeof err?.message === 'string' ? err.message : 'Login failed';
    throw new Error(message);
  }
}

export async function logout(): Promise<{ message: string }> {
  try {
    // No need to send refresh token - backend will read it from cookies
    const data = await apiFetch<{ message: string }>('/v1/auth/logout', {
      method: 'POST',
      json: {}, // Empty body - backend reads refresh token from cookies
      requireAuth: false,
    });
    return data;
  } catch (err: any) {
    const message = typeof err?.message === 'string' ? err.message : 'Logout failed';
    throw new Error(message);
  }
}

export async function refreshToken(): Promise<TokensResponse> {
  try {
    // No need to send refresh token - backend will read it from cookies
    const data = await apiFetch<TokensResponse>('/v1/auth/refresh', {
      method: 'POST',
      json: {}, // Empty body - backend reads refresh token from cookies
      requireAuth: false,
    });
    return data;
  } catch (err: any) {
    const message = typeof err?.message === 'string' ? err.message : 'Token refresh failed';
    throw new Error(message);
  }
}


