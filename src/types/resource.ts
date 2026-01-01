export interface OAuthProvider {
  provider: 'google' | 'facebook' | 'github';
  providerUserId: string;
}

export type UserStatus = 'looking_for_internship' | 'looking_for_master_alternance' | 'looking_for_job' | 'employed' | 'student';

export interface User {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  isVerified?: boolean;
  profilePicture?: string;
  oauthProviders?: OAuthProvider[];
  status?: UserStatus | null;
  rememberMe?: boolean;
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
  date: string;
  relative: string;
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

export const EmptyPost: LinkedInPost =
{
  _id: "",
  urn: {},
  author: {
    first_name: "",
    last_name: "",
    headline: "",
    username: "",
    profile_picture: "",
    profile_url: "",
  },
  createdAt: "",
  updatedAt: "",
  document: null,
  full_urn: "",
  media: null,
  post_type: "",
  posted_at: {
    date: "",
    relative: "",
    timestamp: 0,
  },
  profile_input: "",
  reshared_post: null,
  stats: {
    total_reactions: 0,
    like: 0,
    support: 0,
    love: 0,
    insight: 0,
    celebrate: 0,
    funny: 0,
    comments: 0,
    reposts: 0,
  },
  text: "",
  title: "",
  category: "",
  url: "",
};

/** Pagination object **/
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}