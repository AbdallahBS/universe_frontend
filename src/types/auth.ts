export interface User {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  isVerified?: boolean;
}

export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

// Pages available in the auth flow
export type AuthPage = 'landing' | 'login' | 'signup' | 'verify';

// UI form model for signup
export interface SignupFormData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

// Payload sent to backend /v1/auth/signup
export interface SignupPayload {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  UUID?: string;
}

// Tokens returned by auth endpoints
export interface TokensResponse {
  accessToken: string;
  refreshToken: string;
  user?: User;
}

// Email verification payload
export interface VerifyEmailPayload {
  code?: string;
  token?: string;
}

// Email verification response
export interface VerifyEmailResponse {
  message: string;
}