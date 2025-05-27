import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { items, customerInfo, successUrl, cancelUrl, metadata } = body

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
      quantity: item.quantity,
    }))

    // Criar sessão de checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "sepa_debit"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}${successUrl}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}${cancelUrl}`,
      customer_email: customerInfo.email,
      metadata: {
        customerName: customerInfo.name,
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

    return NextResponse.json({ id: session.id, url: session.url })
  } catch (error) {
    console.error("Erro ao criar sessão Stripe:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
