import { createClient } from "@supabase/supabase-js"

// Função para obter as variáveis de ambiente
function getEnvVar(key: string, fallback?: string): string {
  // Primeiro tenta do process.env
  if (process.env[key]) {
    return process.env[key]!
  }

  // Se não encontrar e estiver no cliente, tenta do localStorage
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(`env_${key}`)
    if (stored) {
      return stored
    }
  }

  // Se tiver fallback, usa ele
  if (fallback) {
    return fallback
  }

  throw new Error(`Environment variable ${key} is not set`)
}

// URLs e chaves do Supabase
const supabaseUrl = getEnvVar("NEXT_PUBLIC_SUPABASE_URL")
const supabaseAnonKey = getEnvVar("NEXT_PUBLIC_SUPABASE_ANON_KEY")

// Cliente público do Supabase (para uso no frontend)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Cliente com service role (para uso no backend/API routes)
export const supabaseAdmin = createClient(supabaseUrl, getEnvVar("SUPABASE_SERVICE_ROLE_KEY"), {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

// Tipos para as tabelas do Supabase
export interface User {
  id: string
  email: string
  name: string
  role: "user" | "admin" | "member"
  membership_type?: string
  created_at: string
  updated_at: string
}

export interface TradingIdea {
  id: string
  title: string
  description: string
  symbol: string
  direction: "buy" | "sell"
  entry_price: number
  stop_loss?: number
  take_profit?: number
  status: "active" | "closed" | "cancelled"
  created_by: string
  created_at: string
  updated_at: string
}

export interface Portfolio {
  id: string
  name: string
  description: string
  performance: number
  risk_level: "low" | "medium" | "high"
  created_at: string
  updated_at: string
}

// Funções utilitárias para autenticação
export const auth = {
  signUp: async (email: string, password: string, userData?: any) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData,
      },
    })
    return { data, error }
  },

  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  getCurrentUser: async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()
    return { user, error }
  },
}

// Funções para gerenciar usuários (admin)
export const userService = {
  getUsers: async () => {
    const { data, error } = await supabaseAdmin.from("users").select("*").order("created_at", { ascending: false })
    return { data, error }
  },

  updateUserRole: async (userId: string, role: string) => {
    const { data, error } = await supabaseAdmin.from("users").update({ role }).eq("id", userId)
    return { data, error }
  },
}

// Funções para trading ideas
export const tradingIdeasService = {
  getIdeas: async () => {
    const { data, error } = await supabase.from("trading_ideas").select("*").order("created_at", { ascending: false })
    return { data, error }
  },

  createIdea: async (idea: Omit<TradingIdea, "id" | "created_at" | "updated_at">) => {
    const { data, error } = await supabase.from("trading_ideas").insert(idea).select()
    return { data, error }
  },
}

// Funções para portfólios
export const portfolioService = {
  getPortfolios: async () => {
    const { data, error } = await supabase.from("portfolios").select("*").order("created_at", { ascending: false })
    return { data, error }
  },
}
