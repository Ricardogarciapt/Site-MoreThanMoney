import Stripe from "stripe"

// Initialize Stripe with environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-06-20",
})

export interface PaymentSession {
  id: string
  url: string | null
  status: string
}

export interface PaymentProduct {
  id: string
  name: string
  price: number
  currency: string
  description?: string
}

// Create Stripe checkout session
export async function createStripeSession(
  products: PaymentProduct[],
  successUrl: string,
  cancelUrl: string,
  customerEmail?: string,
): Promise<PaymentSession> {
  try {
    const lineItems = products.map((product) => ({
      price_data: {
        currency: product.currency,
        product_data: {
          name: product.name,
          description: product.description,
        },
        unit_amount: Math.round(product.price * 100), // Convert to cents
      },
      quantity: 1,
    }))

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: successUrl,
      cancel_url: cancelUrl,
      customer_email: customerEmail,
      metadata: {
        products: JSON.stringify(products.map((p) => ({ id: p.id, name: p.name }))),
      },
    })

    return {
      id: session.id,
      url: session.url,
      status: session.status || "pending",
    }
  } catch (error) {
    console.error("Error creating Stripe session:", error)
    throw new Error("Failed to create payment session")
  }
}

// Verify Stripe webhook signature
export function verifyStripeWebhook(body: string, signature: string): Stripe.Event | null {
  try {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
    if (!webhookSecret) {
      throw new Error("Stripe webhook secret not configured")
    }

    return stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (error) {
    console.error("Error verifying Stripe webhook:", error)
    return null
  }
}

// Get payment session details
export async function getStripeSession(sessionId: string): Promise<Stripe.Checkout.Session | null> {
  try {
    return await stripe.checkout.sessions.retrieve(sessionId)
  } catch (error) {
    console.error("Error retrieving Stripe session:", error)
    return null
  }
}
