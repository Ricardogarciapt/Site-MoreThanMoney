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

    let event
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      console.error("Erro na verificação do webhook:", err)
      return NextResponse.json({ error: "Webhook inválido" }, { status: 400 })
    }

    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object
        console.log("Pagamento concluído:", session.id)
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

async function handlePaymentSuccess(session: any) {
  try {
    const customerEmail = session.customer_email
    const customerName = session.metadata?.customerName
    const amount = session.amount_total / 100

    console.log("Processando pagamento:", {
      email: customerEmail,
      name: customerName,
      amount: amount,
      sessionId: session.id,
    })

    // Convidar membro para o grupo Skool
    if (customerEmail && process.env.SKOOL_WEBHOOK_URL) {
      try {
        const skoolUrl = `${process.env.SKOOL_WEBHOOK_URL}?email=${encodeURIComponent(customerEmail)}`
        const skoolRes = await fetch(skoolUrl, { method: "GET" })
        console.log("Skool invite enviado para", customerEmail, "- status:", skoolRes.status)
      } catch (skoolErr) {
        console.error("Erro ao convidar para Skool:", skoolErr)
      }
    } else {
      console.warn("SKOOL_WEBHOOK_URL não configurado ou email ausente")
    }

  } catch (error) {
    console.error("Erro ao processar pagamento:", error)
  }
}

export async function GET() {
  return NextResponse.json({
    status: "webhook_ready",
    stripe_configured: !!process.env.STRIPE_SECRET_KEY,
    webhook_secret_configured: !!process.env.STRIPE_WEBHOOK_SECRET,
    skool_webhook_configured: !!process.env.SKOOL_WEBHOOK_URL,
  })
}
