import { createClient } from '@supabase/supabase-js'

// ประเภทข้อมูลสำหรับ Database
export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string
          name: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          name: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          created_at?: string
          updated_at?: string
        }
      }
      brands: {
        Row: {
          id: string
          name: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          name: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          created_at?: string
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: number
          name: string
          price: number
          original_price: number | null
          brand_id: string | null
          category_id: string | null
          rating: number | null
          reviews: number | null
          image: string | null
          in_stock: boolean | null
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          name: string
          price: number
          original_price?: number | null
          brand_id?: string | null
          category_id?: string | null
          rating?: number | null
          reviews?: number | null
          image?: string | null
          in_stock?: boolean | null
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          name?: string
          price?: number
          original_price?: number | null
          brand_id?: string | null
          category_id?: string | null
          rating?: number | null
          reviews?: number | null
          image?: string | null
          in_stock?: boolean | null
          description?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)