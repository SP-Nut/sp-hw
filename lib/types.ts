/**
 * Shared type definitions for SP Hardware project
 */

// Database entities
export interface Category {
  id: string;
  name: string;
  created_at?: string;
  updated_at?: string;
}

export interface Brand {
  id: string;
  name: string;
  created_at?: string;
  updated_at?: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  original_price?: number;
  brand_id: string;
  category_id: string;
  rating: number;
  reviews: number;
  image?: string;
  images?: string[];
  in_stock: boolean;
  description?: string;
  created_at?: string;
  updated_at?: string;
  // Joined data
  brand?: Brand;
  category?: Category;
}

// Cart and Order types
export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

export interface OrderItem {
  productId: number;
  productName: string;
  price: number;
  quantity: number;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  email?: string;
  address?: string;
  notes?: string;
}

export interface OrderData {
  items: OrderItem[];
  customer: CustomerInfo;
  total: number;
  orderDate: string;
  orderId?: string;
}

// API Response types
export interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Search and Filter types
export interface ProductFilters {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  inStock?: boolean;
}

export interface SortOption {
  field: 'name' | 'price' | 'rating' | 'created_at';
  direction: 'asc' | 'desc';
}

export interface ProductSearchParams {
  page?: number;
  limit?: number;
  filters?: ProductFilters;
  sort?: SortOption;
}

// LINE Integration types
export interface LineUser {
  userId: string;
  displayName?: string;
  pictureUrl?: string;
  statusMessage?: string;
}

export interface LineOrderData {
  orderId: string;
  items: OrderItem[];
  customer: CustomerInfo;
  total: number;
  orderDate: string;
  lineUserId?: string;
}

// Admin types
export interface AdminUser {
  username: string;
  isAuthenticated: boolean;
  loginTime?: string;
}

// Component Props types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface LoadingState {
  isLoading: boolean;
  error?: string;
}

// Form types
export interface FormErrors {
  [key: string]: string | undefined;
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
}

// Utility types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type RequiredKeys<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type OptionalKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// Environment variables type
export interface EnvConfig {
  supabaseUrl: string;
  supabaseAnonKey: string;
  supabaseServiceRoleKey?: string;
  lineChannelAccessToken?: string;
  lineChannelSecret?: string;
  lineAdminUserId?: string;
  adminUsername: string;
  adminPassword: string;
}

// Error types
export type ErrorCode = 
  | 'NETWORK_ERROR'
  | 'VALIDATION_ERROR'
  | 'NOT_FOUND'
  | 'UNAUTHORIZED'
  | 'INTERNAL_ERROR'
  | 'LINE_API_ERROR';

export interface AppErrorData {
  code: ErrorCode;
  message: string;
  statusCode: number;
  details?: unknown;
}