// User types
export interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  createdAt?: string;
  updatedAt?: string;
}

// Post types
export interface Post {
  _id: string;
  title: string;
  content: string;
  excerpt?: string;
  author: {
    _id: string;
    name: string;
    email: string;
  };
  status: "draft" | "published";
  tags?: string[];
  readTime?: number;
  createdAt: string;
  updatedAt: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  count: number;
  total: number;
  totalPages: number;
  currentPage: number;
  data: T[];
}

export interface ErrorResponse {
  success: false;
  message: string;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}

// Auth types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

// Post form types
export interface PostFormData {
  title: string;
  content: string;
  excerpt?: string;
  status: "draft" | "published";
  tags: string[];
}

// Admin types
export interface DashboardStats {
  totalUsers: number;
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  recentPosts: Post[];
}
