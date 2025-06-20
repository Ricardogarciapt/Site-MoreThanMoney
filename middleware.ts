import { type NextRequest, NextResponse } from "next/server"

// Rate limiting simples em memória (para produção usar Redis)
const rateLimit = new Map<string, { count: number; timestamp: number }>()

function isRateLimited(ip: string, limit = 100, windowMs: number = 15 * 60 * 1000): boolean {
  const now = Date.now()
  const windowStart = now - windowMs

  // Limpar entradas antigas
  for (const [key, value] of rateLimit.entries()) {
    if (value.timestamp < windowStart) {
      rateLimit.delete(key)
    }
  }

  const current = rateLimit.get(ip)

  if (!current || current.timestamp < windowStart) {
    rateLimit.set(ip, { count: 1, timestamp: now })
    return false
  }

  if (current.count >= limit) {
    return true
  }

  current.count++
  return false
}

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Adicionar headers de segurança básicos
  response.headers.set("X-Frame-Options", "DENY")
  response.headers.set("X-Content-Type-Options", "nosniff")

  // Rate limiting para APIs
  if (request.nextUrl.pathname.startsWith("/api/")) {
    const ip = request.ip || request.headers.get("x-forwarded-for") || "unknown"

    if (isRateLimited(ip)) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 })
    }
  }

  // Headers específicos para admin
  if (request.nextUrl.pathname.startsWith("/admin")) {
    response.headers.set("Cache-Control", "no-cache, no-store, must-revalidate")
  }

  // Add header to skip static optimization for admin routes
  if (request.nextUrl.pathname.startsWith("/admin-dashboard")) {
    const headers = new Headers(request.headers)
    headers.set("x-skip-static", "1")

    return NextResponse.next({
      request: {
        headers,
      },
    })
  }

  return response
}

export const config = {
  matcher: ["/api/:path*", "/admin/:path*", "/admin-dashboard/:path*"],
}
