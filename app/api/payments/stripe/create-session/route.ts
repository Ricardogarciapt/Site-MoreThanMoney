import { type NextRequest, NextResponse } from "next/server"

// Verificar se estamos em runtime (não durante build)
const isRuntime = typeof window === "undefined" && process.env.NODE_ENV !== "test"

// Chaves do Stripe (configuradas diretamente)
const STRIPE_SECRET_KEY =
  "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"

// Inicializar Stripe apenas se as chaves estiverem disponíveis
let stripe: any = null

if (isRuntime && STRIPE_SECRET_KEY) {
  const Stripe = require("stripe")
  stripe = new Stripe(STRIPE_SECRET_KEY, {
    apiVersion: "2024-06-20",
  })
}

export async function POST(request: NextRequest) {
  try {
    // Verificar se o Stripe está configurado
    if (!stripe) {
      console.error("Stripe não configurado - chave secreta ausente")
      return NextResponse.json({ error: "Serviço de pagamento não disponível" }, { status: 503 })
    }

    const body = await request.json()
    const { items, customerInfo, successUrl, cancelUrl, metadata } = body

    // Validar dados obrigatórios
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Itens do carrinho são obrigatórios" }, { status: 400 })
    }

    if (!customerInfo || !customerInfo.email) {
      return NextResponse.json({ error: "Informações do cliente são obrigatórias" }, { status: 400 })
    }

    // Criar line items para o Stripe
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: "eur",
        product_data: {
          name: item.name,
          description: item.type || "Produto MoreThanMoney",
        },
        unit_amount: Math.round(item.price * 100), // Stripe usa centavos
      },
      quantity: item.quantity || 1,
    }))

    // URL base para redirecionamentos
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://morethanmoney.pt"

    // Criar sessão de checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "sepa_debit"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${baseUrl}${successUrl || "/payment/success"}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}${cancelUrl || "/payment/cancelled"}`,
      customer_email: customerInfo.email,
      metadata: {
        customerName: customerInfo.name || "",
        customerPhone: customerInfo.phone || "",
        ...metadata,
      },
      billing_address_collection: "required",
      shipping_address_collection: {
        allowed_countries: ["PT", "ES", "FR", "IT", "DE", "NL", "BE"],
      },
      automatic_tax: {
        enabled: true,
      },
    })

    return NextResponse.json({
      id: session.id,
      url: session.url,
    })
  } catch (error) {
    console.error("Erro ao criar sessão Stripe:", error)

    // Retornar erro mais específico
    const errorMessage = error instanceof Error ? error.message : "Erro interno do servidor"

    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}

// Função para verificar saúde da API
export async function GET() {
  const isConfigured = !!STRIPE_SECRET_KEY

  return NextResponse.json({
    status: "ok",
    stripe_configured: isConfigured,
    environment: process.env.NODE_ENV,
  })
}
