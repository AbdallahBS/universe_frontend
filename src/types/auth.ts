export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

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

// Email verification payload
export interface VerifyEmailPayload {
  code?: string;
  token?: string;
}

// Email verification response
export interface VerifyEmailResponse {
  message: string;
}