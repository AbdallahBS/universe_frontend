export interface User {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  isVerified?: boolean;
  roles?: string[];
}