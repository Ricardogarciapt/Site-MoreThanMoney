# MoreThanMoney - Plataforma de Trading e Investimentos

## 🚀 Deployment em Produção

### Pré-requisitos

1. **Vercel Account** configurado
2. **Supabase Project** ativo
3. **Stripe Account** (para pagamentos)
4. **PayPal Business Account** (para pagamentos)

### Variáveis de Ambiente (Produção)

Configure no Vercel Dashboard:

\`\`\`bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://mllycoenhpjfceyvaqxz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...

# PayPal
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret

# YouTube (para educação)
YOUTUBE_API_KEY=your_youtube_api_key
NEXT_PUBLIC_YOUTUBE_API_KEY=your_youtube_api_key

# Telegram
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_WEBHOOK_SECRET=your_webhook_secret

# Notion (opcional)
NOTION_API_KEY=your_notion_api_key
NOTION_DATABASE_ID=your_database_id

# App Config
NEXT_PUBLIC_BASE_URL=https://morethanmoney.pt
NEXT_PUBLIC_GA_ID=GA_MEASUREMENT_ID
\`\`\`

### Deploy Steps

1. **Preparar código:**
   \`\`\`bash
   npm run type-check
   npm run build
   \`\`\`

2. **Deploy para Vercel:**
   \`\`\`bash
   npm run deploy:production
   \`\`\`

3. **Configurar domínio personalizado no Vercel**

4. **Configurar webhooks:**
   - Stripe: `https://morethanmoney.pt/api/payments/stripe/webhook`
   - PayPal: `https://morethanmoney.pt/api/payments/paypal/webhook`

### Monitoramento

- **Health Check:** `https://morethanmoney.pt/health`
- **Logs:** Vercel Dashboard
- **Database:** Supabase Dashboard

### Segurança

- ✅ HTTPS enforced
- ✅ Rate limiting
- ✅ CORS configured
- ✅ CSP headers
- ✅ SQL injection protection
- ✅ XSS protection

### Performance

- ✅ Image optimization
- ✅ Bundle optimization
- ✅ Compression enabled
- ✅ CDN via Vercel Edge
- ✅ Database connection pooling

## 📊 Métricas

- **Target Load Time:** < 2s
- **Lighthouse Score:** > 90
- **Uptime:** > 99.9%
