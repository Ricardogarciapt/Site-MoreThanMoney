# Instruções de Deploy - MoreThanMoney

## Pré-requisitos

1. Conta no Vercel
2. Projeto Supabase configurado
3. Conta Stripe configurada
4. Bot do Telegram criado

## Configuração das Variáveis de Ambiente no Vercel

### Variáveis Críticas (Obrigatórias)

\`\`\`
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_51RTQzjJ7AovKm8m2brgzKYnWLl6NrBSAhBY5g516y9GYUH7jfMLm1jNiaTY01ywPohGIFSvMk84Fwgw98lNqkcp100m1iblSAy
STRIPE_SECRET_KEY=mk_1RTjBoJ7AovKm8m2zaaJTotK
STRIPE_WEBHOOK_SECRET=whsec_SHaO2EgUdrJBfosRBbjDEZjg4MObHxrR

NEXT_PUBLIC_SUPABASE_URL=https://mllycoenhpjfceyvaqxz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1sbHljb2VuaHBqZmNleXZhcXh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0NDUyMjYsImV4cCI6MjA2NDAyMTIyNn0.bM-wNUUll7UggDvVfJYk10aecQUs4q8w47q4IoL3Gb4
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1sbHljb2VuaHBqZmNleXZhcXh6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0ODQ0NTIyNiwiZXhwIjoyMDY0MDIxMjI2fQ.B2Y6hyYLAQubeyk9bC3HF8c1mCL9sj8GvqJ7W8G6aMY

NEXTAUTH_SECRET=morethanmoney_secure_auth_secret_key_2024
NEXTAUTH_URL=https://seu-dominio-de-producao.com
\`\`\`

### Variáveis Importantes

\`\`\`
TELEGRAM_BOT_TOKEN=7926573487:AAFAbQSWYOOSkLteucaj82Xk_v1xpT-B3ok
TELEGRAM_CHANNEL_ID=-1002486420436
TELEGRAM_WEBHOOK_SECRET=telegram_webhook_secret_key
\`\`\`

### Variáveis Opcionais

\`\`\`
NEXT_PUBLIC_GA_ID=G-S8J5PC8615
YOUTUBE_API_KEY=AIzaSyAjO5G-lZKW2gd0DAD3hMQ6PaeIAyXn5po
NOTION_API_KEY=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
NOTION_DATABASE_ID=MorethanMoney
\`\`\`

## Passos para Deploy

1. Faça login no Vercel Dashboard
2. Importe o repositório do projeto
3. Configure as variáveis de ambiente listadas acima
4. Clique em "Deploy"

## Configuração de Webhooks

### Stripe Webhook

Configure o webhook do Stripe para apontar para:
\`\`\`
https://seu-dominio-de-producao.com/api/payments/stripe/webhook
\`\`\`

### Telegram Webhook

Configure o webhook do Telegram usando a seguinte URL:
\`\`\`
https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/setWebhook?url=https://seu-dominio-de-producao.com/api/telegram/webhook
\`\`\`

## Verificação Pós-Deploy

1. Verifique se a página inicial carrega corretamente
2. Teste o login/registro de usuários
3. Verifique se o painel de administração está acessível
4. Teste uma transação de pagamento
5. Verifique se as mensagens do Telegram estão sendo recebidas

## Solução de Problemas

Se encontrar problemas após o deploy:

1. Verifique os logs no Vercel Dashboard
2. Confirme se todas as variáveis de ambiente estão configuradas corretamente
3. Verifique se os webhooks estão configurados e funcionando
4. Teste a conexão com o Supabase
5. Verifique se o bot do Telegram está ativo e tem permissões corretas
