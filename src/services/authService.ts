import { apiFetch } from './api';
import { TokensResponse } from 'types/network';
import { SignupPayload } from 'types/auth';
import { Thumbmark } from '@thumbmarkjs/thumbmarkjs';

export async function getOrCreateDeviceUUID(): Promise<string> {
  const thumbmark = new Thumbmark();

  try {
    const res = await thumbmark.get();

    return String(res.thumbmark);
  } catch (err: any) {
    throw new Error(String(err));
  }
}

export async function signup(payload: SignupPayload): Promise<TokensResponse> {
  const UUID = await getOrCreateDeviceUUID();
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

export async function login(payload: { email: string; password: string; rememberMe: any }): Promise<TokensResponse> {
  const UUID = await getOrCreateDeviceUUID();

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
      requireAuth: true,
    });
    return data;
  } catch (err: any) {
    const message = typeof err?.message === 'string' ? err.message : 'Logout failed';
    throw new Error(message);
  }
}

export async function googleLogin(idToken: string): Promise<TokensResponse> {
  const UUID = await getOrCreateDeviceUUID();
  try {
    const data = await apiFetch<TokensResponse>('/v1/auth/google', {
      method: 'POST',
      json: { idToken, UUID, deviceType: 'web' },
      requireAuth: false,
    });
    return data;
  } catch (err: any) {
    const message = typeof err?.message === 'string' ? err.message : 'Google login failed';
    throw new Error(message);
  }
}

export async function getStats() {
  try {
    const data = await apiFetch<any>('/v1/auth/stats', { requireAuth: false });
    return data;
  } catch (err: any) {
    const message = typeof err?.message === 'string' ? err.message : 'Cannot fetch stats';
    throw new Error(message);
  }
}

/**
 * Request password reset email
 * @param email - User's email address
 * @returns Success message (always succeeds to prevent user enumeration)
 */
export async function requestPasswordReset(email: string): Promise<{ message: string }> {
  try {
    const data = await apiFetch<{ message: string }>('/v1/auth/forgot-password/request', {
      method: 'POST',
      json: { email },
      requireAuth: false,
    });
    return data;
  } catch (err: any) {
    const message = typeof err?.message === 'string' ? err.message : 'Failed to send reset email';
    throw new Error(message);
  }
}

/**
 * Validate a reset token before showing the password form
 * @param token - Reset token from email link
 * @returns Validation result with valid boolean and optional error message
 */
export async function validateResetToken(token: string): Promise<{ valid: boolean; error?: string }> {
  try {
    const data = await apiFetch<{ valid: boolean; error?: string }>(`/v1/auth/forgot-password/validate?token=${encodeURIComponent(token)}`, {
      method: 'GET',
      requireAuth: false,
    });
    return data;
  } catch (err: any) {
    return { valid: false, error: 'Failed to validate token' };
  }
}

/**
 * Confirm password reset with token and new password
 * @param token - Reset token from email link
 * @param newPassword - New password (min 8 characters)
 * @returns Success message
 */
export async function confirmPasswordReset(token: string, newPassword: string): Promise<{ message: string }> {
  try {
    const data = await apiFetch<{ message: string }>('/v1/auth/forgot-password/confirm', {
      method: 'POST',
      json: { token, newPassword },
      requireAuth: false,
    });
    return data;
  } catch (err: any) {
    const message = typeof err?.message === 'string' ? err.message : 'Failed to reset password';
    throw new Error(message);
  }
}

/**
 * Change password for authenticated user (from profile settings)
 * @param currentPassword - User's current password
 * @param newPassword - New password (min 8 characters)
 * @returns Success message
 */
export async function changePassword(currentPassword: string, newPassword: string): Promise<{ message: string }> {
  try {
    const data = await apiFetch<{ message: string }>('/v1/auth/change-password', {
      method: 'POST',
      json: { currentPassword, newPassword },
      requireAuth: true,
    });
    return data;
  } catch (err: any) {
    const message = typeof err?.message === 'string' ? err.message : 'Failed to change password';
    throw new Error(message);
  }
}
