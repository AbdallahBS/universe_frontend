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

// Stats interfaces for AuthController responses

// UsersCount stat structure
interface UsersStat {
  usersCount: number;
  addedUsersPercentage: number;
}

// Sessions (active users) stat structure
interface SessionsStat {
  activeUsers: number;
}

// Contents stat structure
interface ContentsStat {
  internshipOffersCount: number;
  totalDocumentsCount: number;
}

// getPublicStats response
export interface PublicStatsResponse {
  contentsCount: ContentsStat;
  usersCount: number;
}

// getPrivateStats response
export interface PrivateStatsResponse {
  usersCount: UsersStat;
  sessionsCount: SessionsStat;
  contentsCount: ContentsStat;
  dailyVisitors: number;
}

export interface Role {
  roleName: string;
  description: string;
  color: string;
}

// API response structure
export interface GetRolesResponse {
  success: boolean;
  data: Role[];
}