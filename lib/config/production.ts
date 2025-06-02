// Configurações específicas para produção
export const productionConfig = {
  database: {
    connectionPooling: true,
    maxConnections: 20,
    timeout: 30000,
  },
  auth: {
    sessionTimeout: 24 * 60 * 60 * 1000, // 24 horas
    maxLoginAttempts: 5,
    lockoutDuration: 15 * 60 * 1000, // 15 minutos
  },
  api: {
    rateLimit: {
      windowMs: 15 * 60 * 1000, // 15 minutos
      max: 100, // máximo 100 requests por janela
    },
  },
  cache: {
    ttl: 5 * 60 * 1000, // 5 minutos
  },
  logging: {
    level: "error", // apenas logs de erro em produção
    enableConsole: false,
  },
  performance: {
    enableCompression: true,
    enableCaching: true,
    minifyAssets: true,
  },
}
