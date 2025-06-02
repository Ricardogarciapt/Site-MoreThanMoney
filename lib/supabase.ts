import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables")
}

// Client for public operations (client-side)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Admin client for server-side operations with elevated privileges
export const supabaseAdmin = createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

// Database types for TypeScript
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          username: string
          name: string
          email: string | null
          phone: string | null
          social_link: string | null
          jifu_id: string | null
          package: string | null
          role: string | null
          password_hash: string
          is_admin: boolean
          created_at: string
          updated_at: string
          last_login: string | null
        }
        Insert: {
          id?: string
          username: string
          name: string
          email?: string | null
          phone?: string | null
          social_link?: string | null
          jifu_id?: string | null
          package?: string | null
          role?: string | null
          password_hash: string
          is_admin?: boolean
          created_at?: string
          updated_at?: string
          last_login?: string | null
        }
        Update: {
          id?: string
          username?: string
          name?: string
          email?: string | null
          phone?: string | null
          social_link?: string | null
          jifu_id?: string | null
          package?: string | null
          role?: string | null
          password_hash?: string
          is_admin?: boolean
          created_at?: string
          updated_at?: string
          last_login?: string | null
        }
      }
      affiliates: {
        Row: {
          id: string
          user_id: string
          affiliate_code: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          affiliate_code: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          affiliate_code?: string
          created_at?: string
          updated_at?: string
        }
      }
      commission_history: {
        Row: {
          id: string
          affiliate_user_id: string
          customer_user_id: string
          product_name: string
          amount: number
          status: "pending" | "paid" | "cancelled"
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          affiliate_user_id: string
          customer_user_id: string
          product_name: string
          amount: number
          status?: "pending" | "paid" | "cancelled"
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          affiliate_user_id?: string
          customer_user_id?: string
          product_name?: string
          amount?: number
          status?: "pending" | "paid" | "cancelled"
          created_at?: string
          updated_at?: string
        }
      }
      trading_ideas: {
        Row: {
          id: string
          title: string
          description: string | null
          symbol: string
          timeframe: string
          direction: "long" | "short"
          entry_price: number | null
          stop_loss: number | null
          take_profit: number | null
          risk_reward: number | null
          author_id: string
          likes: number
          status: "active" | "closed" | "cancelled"
          result: "win" | "loss" | "breakeven" | null
          pnl: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          symbol: string
          timeframe: string
          direction: "long" | "short"
          entry_price?: number | null
          stop_loss?: number | null
          take_profit?: number | null
          risk_reward?: number | null
          author_id: string
          likes?: number
          status?: "active" | "closed" | "cancelled"
          result?: "win" | "loss" | "breakeven" | null
          pnl?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          symbol?: string
          timeframe?: string
          direction?: "long" | "short"
          entry_price?: number | null
          stop_loss?: number | null
          take_profit?: number | null
          risk_reward?: number | null
          author_id?: string
          likes?: number
          status?: "active" | "closed" | "cancelled"
          result?: "win" | "loss" | "breakeven" | null
          pnl?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      trading_idea_comments: {
        Row: {
          id: string
          idea_id: string
          author_id: string
          content: string
          created_at: string
        }
        Insert: {
          id?: string
          idea_id: string
          author_id: string
          content: string
          created_at?: string
        }
        Update: {
          id?: string
          idea_id?: string
          author_id?: string
          content?: string
          created_at?: string
        }
      }
      payments: {
        Row: {
          id: string
          user_id: string
          stripe_payment_intent_id: string | null
          paypal_order_id: string | null
          amount: number
          currency: string
          status: "pending" | "completed" | "failed" | "cancelled"
          product_name: string
          payment_method: "stripe" | "paypal"
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          stripe_payment_intent_id?: string | null
          paypal_order_id?: string | null
          amount: number
          currency: string
          status?: "pending" | "completed" | "failed" | "cancelled"
          product_name: string
          payment_method: "stripe" | "paypal"
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          stripe_payment_intent_id?: string | null
          paypal_order_id?: string | null
          amount?: number
          currency?: string
          status?: "pending" | "completed" | "failed" | "cancelled"
          product_name?: string
          payment_method?: "stripe" | "paypal"
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

// Test connection function
export async function testConnection() {
  try {
    const { data, error } = await supabase.from("users").select("count").limit(1)
    if (error) {
      console.error("Supabase connection error:", error)
      return false
    }
    console.log("Supabase connected successfully")
    return true
  } catch (error) {
    console.error("Supabase connection failed:", error)
    return false
  }
}
