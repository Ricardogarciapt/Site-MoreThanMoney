import { createClient, type SupabaseClient } from "@supabase/supabase-js"
import type { Database } from "./database.types"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables")
}

// Configuração para produção
const isProd = process.env.NODE_ENV === "production"
const prodDomain = "morethanmoney.pt"

// Client para operações públicas (client-side)
export const supabase: SupabaseClient<Database> = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    ...(isProd && {
      cookieOptions: {
        domain: prodDomain,
        sameSite: "lax",
        secure: true,
      },
    }),
  },
  db: {
    schema: "public",
  },
  global: {
    headers: {
      "x-application-name": "MoreThanMoney",
    },
  },
})

// Admin client para operações server-side com privilégios elevados
if (!supabaseServiceRoleKey) {
  console.error("CRITICAL WARNING: SUPABASE_SERVICE_ROLE_KEY is not set. Admin operations may fail.")
}

export const supabaseAdmin: SupabaseClient<Database> = createClient(
  supabaseUrl,
  supabaseServiceRoleKey || supabaseAnonKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
    db: {
      schema: "public",
    },
    global: {
      headers: {
        "x-application-name": "MoreThanMoney-Admin",
      },
    },
  },
)

// Cache de conexão para produção
let connectionCache: { timestamp: number; isHealthy: boolean } | null = null
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutos

export async function testConnection(): Promise<boolean> {
  // Usar cache em produção
  if (process.env.NODE_ENV === "production" && connectionCache) {
    const now = Date.now()
    if (now - connectionCache.timestamp < CACHE_DURATION) {
      return connectionCache.isHealthy
    }
  }

  try {
    const { error } = await supabase.from("users").select("count").limit(1)
    const isHealthy = !error

    // Atualizar cache
    connectionCache = {
      timestamp: Date.now(),
      isHealthy,
    }

    if (!isHealthy) {
      console.error("Supabase connection error:", error)
    }

    return isHealthy
  } catch (error) {
    console.error("Supabase connection failed:", error)
    connectionCache = {
      timestamp: Date.now(),
      isHealthy: false,
    }
    return false
  }
}

// Health check para monitoring
export async function healthCheck() {
  const startTime = Date.now()
  const isConnected = await testConnection()
  const responseTime = Date.now() - startTime

  return {
    status: isConnected ? "healthy" : "unhealthy",
    responseTime,
    timestamp: new Date().toISOString(),
    database: {
      connected: isConnected,
      url: supabaseUrl,
    },
  }
}
