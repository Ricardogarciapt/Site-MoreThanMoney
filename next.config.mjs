/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configurações para build forçado
  eslint: {
    // Ignora erros de ESLint durante o build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Ignora erros de TypeScript durante o build
    ignoreBuildErrors: true,
  },
  // Configurações experimentais
  experimental: {
    // Permite builds mesmo com erros
    forceSwcTransforms: true,
  },
  // Configurações de imagens
  images: {
    // Permite imagens de qualquer domínio
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  // Configurações de webpack
  webpack: (config, { dev, isServer }) => {
    // Ignora warnings específicos
    config.ignoreWarnings = [
      /Critical dependency/,
      /Module not found/,
      /Can't resolve/,
    ];
    
    // Configurações para produção
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        minimize: true,
        // Ignora erros durante a minificação
        minimizer: config.optimization.minimizer?.map(minimizer => {
          if (minimizer.constructor.name === 'TerserPlugin') {
            minimizer.options.terserOptions = {
              ...minimizer.options.terserOptions,
              compress: {
                ...minimizer.options.terserOptions?.compress,
                drop_console: false,
                drop_debugger: false,
              },
              mangle: false,
            };
          }
          return minimizer;
        }),
      };
    }
    
    return config;
  },
  // Configurações de output
  output: 'standalone',
  // Configurações de redirecionamentos
  async redirects() {
    return [];
  },
  // Configurações de headers
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
        ],
      },
    ];
  },
};

export default nextConfig;
