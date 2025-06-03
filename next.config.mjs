/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ignore build errors for deployment
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Optimize for production
  swcMinify: true,
  
  // Image optimization
  images: {
    domains: ['blob.v0.dev'],
    unoptimized: false,
  },
  
  // Headers for security and performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
  
  // Experimental features
  experimental: {
    appDir: true,
    serverActions: true,
  },
}

export default nextConfig
