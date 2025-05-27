import { type NextRequest, NextResponse } from "next/server"

const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID!
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET!
const PAYPAL_BASE_URL =
  process.env.NODE_ENV === "production" ? "https://api-m.paypal.com" : "https://api-m.sandbox.paypal.com"

async function getPayPalAccessToken() {
  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString("base64")

  const response = await fetch(`${PAYPAL_BASE_URL}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  })

  const data = await response.json()
  return data.access_token
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { items, customerInfo, successUrl, cancelUrl } = body

    const accessToken = await getPayPalAccessToken()

    // Calcular total
    const totalAmount = items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0).toFixed(2)

    // Criar ordem PayPal
    const orderData = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "EUR",
            value: totalAmount,
            breakdown: {
              item_total: {
                currency_code: "EUR",
                value: totalAmount,
              },
            },
          },
          items: items.map((item: any) => ({
            name: item.name,
            unit_amount: {
              currency_code: "EUR",
              value: item.price.toFixed(2),
            },
            quantity: item.quantity.toString(),
          })),
        },
      ],
      application_context: {
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL}${successUrl}`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}${cancelUrl}`,
        brand_name: "MoreThanMoney",
        locale: "pt-PT",
        landing_page: "BILLING",
        user_action: "PAY_NOW",
      },
    }

    const response = await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    })

    const order = await response.json()

    if (!response.ok) {
      throw new Error(order.message || "Erro ao criar ordem PayPal")
    }

    return NextResponse.json(order)
  } catch (error) {
    console.error("Erro ao criar ordem PayPal:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
