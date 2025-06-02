/** @type {import('next').NextConfig} */
const nextConfig = {
  // Otimizações de produção
  experimental: {
    optimizePackageImports: ["@supabase/supabase-js", "lucide-react"],
    bundlePagesRouterDependencies: true,
  },
  
  // Removi optimizeCss que depende do critters
  
  // Compressão
  compress: true,
  
  // Headers de segurança
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://js.stripe.com https://www.paypal.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: https: blob:",
              "connect-src 'self' https://api.stripe.com https://api.paypal.com https://*.supabase.co wss://*.supabase.co",
              "frame-src 'self' https://js.stripe.com https://www.paypal.com",
            ].join("; "),
          },
        ],
      },
    ]
  },
  
  // Redirects de produção
  async redirects() {
    return [
      {
        source: "/test-supabase",
        destination: "/",
        permanent: false,
        has: [
          {
            type: "header",
            key: "host",
            value: "(?!localhost).*", // Apenas em produção
          },
        ],
      },
      {
        source: "/debug",
        destination: "/",
        permanent: false,
        has: [
          {
            type: "header",
            key: "host",
            value: "(?!localhost).*", // Apenas em produção
          },
        ],
      },
    ]
  },
  
  // Configurações de imagem
  images: {
    domains: ["hebbkx1anhila5yf.public.blob.vercel-storage.com", "blob.v0.dev"],
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    unoptimized: true,
  },
  
  // ESLint config
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // TypeScript config
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
