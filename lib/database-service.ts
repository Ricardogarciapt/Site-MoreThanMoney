import { supabase, supabaseAdmin } from "./supabase"

// Types for database entities
export interface User {
  id: string
  username: string
  name: string
  email?: string | null
  phone?: string | null
  social_link?: string | null
  jifu_id?: string | null
  package?: string | null
  role?: string | null
  password_hash: string
  is_admin: boolean
  created_at: string
  updated_at: string
  last_login?: string | null
}

export interface Affiliate {
  id: string
  user_id: string
  affiliate_code: string
  created_at: string
  updated_at: string
}

export interface CommissionHistory {
  id: string
  affiliate_user_id: string
  customer_user_id: string
  product_name: string
  amount: number
  status: "pending" | "paid" | "cancelled"
  created_at: string
  updated_at: string
}

export interface TradingIdea {
  id: string
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
  likes: number
  status: "active" | "closed" | "cancelled"
  result?: "win" | "loss" | "breakeven" | null
  pnl?: number | null
  created_at: string
  updated_at: string
}

export interface TradingIdeaComment {
  id: string
  idea_id: string
  author_id: string
  content: string
  created_at: string
}

export interface Payment {
  id: string
  user_id: string
  stripe_payment_intent_id?: string | null
  paypal_order_id?: string | null
  amount: number
  currency: string
  status: "pending" | "completed" | "failed" | "cancelled"
  product_name: string
  payment_method: "stripe" | "paypal"
  created_at: string
  updated_at: string
}

// Database service class
export class DatabaseService {
  private static instance: DatabaseService

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService()
    }
    return DatabaseService.instance
  }

  // Helper method to handle Supabase errors
  private handleError(error: any, operation: string) {
    console.error(`Database error in ${operation}:`, error)
    return null
  }

  // User operations
  async createUser(userData: Omit<User, "id" | "created_at" | "updated_at">): Promise<User | null> {
    try {
      const { data, error } = await supabaseAdmin.from("users").insert(userData).select().single()

      if (error) {
        return this.handleError(error, "createUser")
      }

      return data
    } catch (error) {
      return this.handleError(error, "createUser")
    }
  }

  async getUserByUsername(username: string): Promise<User | null> {
    try {
      const { data, error } = await supabaseAdmin.from("users").select("*").eq("username", username).single()

      if (error) {
        if (error.code === "PGRST116") {
          // Not found - this is expected sometimes
          return null
        }
        return this.handleError(error, "getUserByUsername")
      }

      return data
    } catch (error) {
      return this.handleError(error, "getUserByUsername")
    }
  }

  async getUserById(id: string): Promise<User | null> {
    try {
      const { data, error } = await supabase.from("users").select("*").eq("id", id).single()

      if (error) {
        if (error.code === "PGRST116") {
          return null
        }
        return this.handleError(error, "getUserById")
      }

      return data
    } catch (error) {
      return this.handleError(error, "getUserById")
    }
  }

  async getUserByEmail(email: string): Promise<User | null> {
    try {
      const { data, error } = await supabaseAdmin.from("users").select("*").eq("email", email).single()
      if (error) {
        if (error.code === "PGRST116") {
          // Not found
          return null
        }
        return this.handleError(error, "getUserByEmail")
      }
      return data
    } catch (error) {
      return this.handleError(error, "getUserByEmail")
    }
  }

  async getAllUsers(): Promise<User[]> {
    try {
      const { data, error } = await supabaseAdmin.from("users").select("*").order("created_at", { ascending: false })

      if (error) {
        console.error("Error getting all users:", error)
        return []
      }

      return data || []
    } catch (error) {
      console.error("Error getting all users:", error)
      return []
    }
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | null> {
    try {
      const { data, error } = await supabaseAdmin.from("users").update(updates).eq("id", id).select().single()

      if (error) {
        return this.handleError(error, "updateUser")
      }

      return data
    } catch (error) {
      return this.handleError(error, "updateUser")
    }
  }

  async updateUserRole(username: string, role: string): Promise<boolean> {
    try {
      const { error } = await supabaseAdmin.from("users").update({ role }).eq("username", username)

      if (error) {
        console.error("Error updating user role:", error)
        return false
      }

      return true
    } catch (error) {
      console.error("Error updating user role:", error)
      return false
    }
  }

  // Affiliate operations
  async createAffiliate(userId: string, affiliateCode: string): Promise<Affiliate | null> {
    try {
      const { data, error } = await supabaseAdmin
        .from("affiliates")
        .insert({
          user_id: userId,
          affiliate_code: affiliateCode,
        })
        .select()
        .single()

      if (error) {
        return this.handleError(error, "createAffiliate")
      }

      return data
    } catch (error) {
      return this.handleError(error, "createAffiliate")
    }
  }

  async getAffiliateByUserId(userId: string): Promise<Affiliate | null> {
    try {
      const { data, error } = await supabase.from("affiliates").select("*").eq("user_id", userId).single()

      if (error) {
        if (error.code === "PGRST116") {
          return null
        }
        return this.handleError(error, "getAffiliateByUserId")
      }

      return data
    } catch (error) {
      return this.handleError(error, "getAffiliateByUserId")
    }
  }

  async getAffiliateByCode(code: string): Promise<Affiliate | null> {
    try {
      const { data, error } = await supabase.from("affiliates").select("*").eq("affiliate_code", code).single()

      if (error) {
        if (error.code === "PGRST116") {
          return null
        }
        return this.handleError(error, "getAffiliateByCode")
      }

      return data
    } catch (error) {
      return this.handleError(error, "getAffiliateByCode")
    }
  }

  async getAllAffiliates(): Promise<Affiliate[]> {
    try {
      const { data, error } = await supabaseAdmin
        .from("affiliates")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error getting all affiliates:", error)
        return []
      }

      return data || []
    } catch (error) {
      console.error("Error getting all affiliates:", error)
      return []
    }
  }

  async deleteAffiliate(userId: string): Promise<boolean> {
    try {
      const { error } = await supabaseAdmin.from("affiliates").delete().eq("user_id", userId)

      if (error) {
        console.error("Error deleting affiliate:", error)
        return false
      }

      return true
    } catch (error) {
      console.error("Error deleting affiliate:", error)
      return false
    }
  }

  // Commission operations
  async createCommission(
    commissionData: Omit<CommissionHistory, "id" | "created_at" | "updated_at">,
  ): Promise<CommissionHistory | null> {
    try {
      const { data, error } = await supabaseAdmin.from("commission_history").insert(commissionData).select().single()

      if (error) {
        return this.handleError(error, "createCommission")
      }

      return data
    } catch (error) {
      return this.handleError(error, "createCommission")
    }
  }

  async getCommissionsByAffiliateId(affiliateUserId: string): Promise<CommissionHistory[]> {
    try {
      const { data, error } = await supabase
        .from("commission_history")
        .select("*")
        .eq("affiliate_user_id", affiliateUserId)
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error getting commissions by affiliate:", error)
        return []
      }

      return data || []
    } catch (error) {
      console.error("Error getting commissions by affiliate:", error)
      return []
    }
  }

  async getAllCommissions(): Promise<CommissionHistory[]> {
    try {
      const { data, error } = await supabaseAdmin
        .from("commission_history")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error getting all commissions:", error)
        return []
      }

      return data || []
    } catch (error) {
      console.error("Error getting all commissions:", error)
      return []
    }
  }

  async updateCommissionStatus(id: string, status: "pending" | "paid" | "cancelled"): Promise<boolean> {
    try {
      const { error } = await supabaseAdmin.from("commission_history").update({ status }).eq("id", id)

      if (error) {
        console.error("Error updating commission status:", error)
        return false
      }

      return true
    } catch (error) {
      console.error("Error updating commission status:", error)
      return false
    }
  }

  // Trading Ideas operations
  async createTradingIdea(
    ideaData: Omit<TradingIdea, "id" | "created_at" | "updated_at">,
  ): Promise<TradingIdea | null> {
    try {
      const { data, error } = await supabase.from("trading_ideas").insert(ideaData).select().single()

      if (error) {
        return this.handleError(error, "createTradingIdea")
      }

      return data
    } catch (error) {
      return this.handleError(error, "createTradingIdea")
    }
  }

  async getAllTradingIdeas(): Promise<TradingIdea[]> {
    try {
      const { data, error } = await supabase.from("trading_ideas").select("*").order("created_at", { ascending: false })

      if (error) {
        console.error("Error getting all trading ideas:", error)
        return []
      }

      return data || []
    } catch (error) {
      console.error("Error getting all trading ideas:", error)
      return []
    }
  }

  async getTradingIdeasByAuthor(authorId: string): Promise<TradingIdea[]> {
    try {
      const { data, error } = await supabase
        .from("trading_ideas")
        .select("*")
        .eq("author_id", authorId)
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error getting trading ideas by author:", error)
        return []
      }

      return data || []
    } catch (error) {
      console.error("Error getting trading ideas by author:", error)
      return []
    }
  }

  async getTradingIdeaById(id: string): Promise<TradingIdea | null> {
    try {
      const { data, error } = await supabase.from("trading_ideas").select("*").eq("id", id).single()

      if (error) {
        if (error.code === "PGRST116") {
          return null
        }
        return this.handleError(error, "getTradingIdeaById")
      }

      return data
    } catch (error) {
      return this.handleError(error, "getTradingIdeaById")
    }
  }

  async updateTradingIdea(id: string, updates: Partial<TradingIdea>): Promise<TradingIdea | null> {
    try {
      const { data, error } = await supabase.from("trading_ideas").update(updates).eq("id", id).select().single()

      if (error) {
        return this.handleError(error, "updateTradingIdea")
      }

      return data
    } catch (error) {
      return this.handleError(error, "updateTradingIdea")
    }
  }

  async deleteTradingIdea(id: string): Promise<boolean> {
    try {
      const { error } = await supabase.from("trading_ideas").delete().eq("id", id)

      if (error) {
        console.error("Error deleting trading idea:", error)
        return false
      }

      return true
    } catch (error) {
      console.error("Error deleting trading idea:", error)
      return false
    }
  }

  // Payment operations
  async createPayment(paymentData: Omit<Payment, "id" | "created_at" | "updated_at">): Promise<Payment | null> {
    try {
      const { data, error } = await supabaseAdmin.from("payments").insert(paymentData).select().single()

      if (error) {
        return this.handleError(error, "createPayment")
      }

      return data
    } catch (error) {
      return this.handleError(error, "createPayment")
    }
  }

  async getPaymentsByUserId(userId: string): Promise<Payment[]> {
    try {
      const { data, error } = await supabase
        .from("payments")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error getting payments by user:", error)
        return []
      }

      return data || []
    } catch (error) {
      console.error("Error getting payments by user:", error)
      return []
    }
  }

  async updatePaymentStatus(id: string, status: "pending" | "completed" | "failed" | "cancelled"): Promise<boolean> {
    try {
      const { error } = await supabaseAdmin.from("payments").update({ status }).eq("id", id)

      if (error) {
        console.error("Error updating payment status:", error)
        return false
      }

      return true
    } catch (error) {
      console.error("Error updating payment status:", error)
      return false
    }
  }
}

// Export singleton instance
export const db = DatabaseService.getInstance()
