export interface OAuthProvider {
  provider: 'google' | 'facebook' | 'github';
  providerUserId: string;
}

export interface User {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  isVerified?: boolean;
  profilePicture?: string;
  oauthProviders?: OAuthProvider[];
}

/** internship object **/
export interface Author {
  first_name: string;
  last_name: string;
  headline: string | null;
  username: string | null;
  profile_picture: string | null;
  profile_url: string | null;
}

export interface MediaImage {
  url: string;
  width: number;
  height: number;
}

export interface Document {
  title: string;
  page_count: number;
  url: string;
  thumbnail: string
}

export interface Media {
  type: "image" | "video" | "document" | string;
  url: string;
  thumbnail: string | null;
  images: MediaImage[];
}

export interface PostedAt {
  date: string; // e.g. "2025-08-22 18:41:54"
  relative: string; // e.g. "4 months ago • Visible to anyone on or off LinkedIn"
  timestamp: number;
}

export interface Stats {
  total_reactions: number;
  like: number;
  support: number;
  love: number;
  insight: number;
  celebrate: number;
  funny: number;
  comments: number;
  reposts: number;
}

export interface LinkedInPost {
  _id: string;
  urn: any;
  __v?: number;
  author: Author;
  createdAt: string;
  updatedAt: string;
  document: Document | null;
  full_urn: string;
  media: Media | null;
  post_type: string;
  posted_at: PostedAt;
  profile_input: string;
  reshared_post: LinkedInPost | null;
  stats: Stats;
  text: string;
  title: string;
  category: string;
  url: string;
}

/** Pagination object **/
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}