import { User } from "./resource";

// Tokens returned by auth endpoints
export interface TokensResponse {
  accessToken: string;
  refreshToken: string;
  user?: User;
}

export interface DBCollectionInfo {
  name: string;
  documentCount: number;
  storageSize: number;
  totalIndexSize: number;
}