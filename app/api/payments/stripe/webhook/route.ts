import { type NextRequest, NextResponse } from "next/server"
import { headers } from "next/headers"
import Stripe from "stripe"

// Verificar se estamos em runtime
const isRuntime = typeof window === "undefined" && process.env.NODE_ENV !== "test"

// Inicializar Stripe apenas se disponível
let stripe: any = null

if (isRuntime && process.env.STRIPE_SECRET_KEY) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-06-20",
  })
}

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  try {
    // Verificar se o Stripe está configurado
    if (!stripe) {
      console.error("Stripe não configurado para webhook")
      return NextResponse.json({ error: "Webhook não disponível" }, { status: 503 })
    }

    const body = await request.text()
    const headersList = headers()
    const signature = headersList.get("stripe-signature")

    if (!signature) {
      console.error("Assinatura do webhook ausente")
      return NextResponse.json({ error: "Assinatura inválida" }, { status: 400 })
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
    if (!webhookSecret) {
      console.error("Webhook secret não configurado")
      return NextResponse.json({ error: "Webhook não configurado" }, { status: 503 })
    }

    // Verificar assinatura do webhook
    let event
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      console.error("Erro na verificação do webhook:", err)
      return NextResponse.json({ error: "Webhook inválido" }, { status: 400 })
    }

    // Processar eventos do Stripe
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object
        console.log("Pagamento concluído:", session.id)

        // Aqui você pode:
        // 1. Atualizar banco de dados
        // 2. Enviar email de confirmação
        // 3. Liberar acesso ao produto
        // 4. Atualizar membership do usuário

        await handlePaymentSuccess(session)
        break

      case "payment_intent.succeeded":
        const paymentIntent = event.data.object
        console.log("Payment Intent sucesso:", paymentIntent.id)
        break

      case "payment_intent.payment_failed":
        const failedPayment = event.data.object
        console.log("Pagamento falhou:", failedPayment.id)
        break

      default:
        console.log(`Evento não tratado: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Erro no webhook:", error)
    return NextResponse.json({ error: "Erro interno" }, { status: 500 })
  }
}

// Função para processar pagamento bem-sucedido
async function handlePaymentSuccess(session: any) {
  try {
    // Extrair informações do pagamento
    const customerEmail = session.customer_email
    const customerName = session.metadata?.customerName
    const amount = session.amount_total / 100 // Converter de centavos

    console.log("Processando pagamento:", {
      email: customerEmail,
      name: customerName,
      amount: amount,
      sessionId: session.id,
    })

    // TODO: Integrar com banco de dados
    // - Criar/atualizar usuário
    // - Registrar pagamento
    // - Atualizar membership
    // - Enviar email de confirmação
  } catch (error) {
    console.error("Erro ao processar pagamento:", error)
  }
}

// Health check
export async function GET() {
  return NextResponse.json({
    status: "webhook_ready",
    stripe_configured: !!process.env.STRIPE_SECRET_KEY,
    webhook_secret_configured: !!process.env.STRIPE_WEBHOOK_SECRET,
  })
}
