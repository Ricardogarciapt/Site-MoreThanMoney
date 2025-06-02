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

// Classe principal do serviço de pagamentos (simplificada)
export class PaymentService {
  private static instance: PaymentService

  public static getInstance(): PaymentService {
    if (!PaymentService.instance) {
      PaymentService.instance = new PaymentService()
    }
    return PaymentService.instance
  }

  // Verificar se o Stripe está configurado
  isStripeConfigured(): boolean {
    return !!(process.env.STRIPE_SECRET_KEY && process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  }

  // Criar sessão de pagamento
  async createPaymentSession(
    products: PaymentProduct[],
    successUrl: string,
    cancelUrl: string,
    customerEmail?: string,
  ): Promise<PaymentSession> {
    return createStripeSession(products, successUrl, cancelUrl, customerEmail)
  }

  // Verificar status do pagamento
  async checkPaymentStatus(sessionId: string): Promise<{
    status: "pending" | "completed" | "failed" | "cancelled"
    details?: any
  }> {
    try {
      const session = await getStripeSession(sessionId)
      if (!session) {
        return { status: "failed" }
      }

      const statusMap: Record<string, "pending" | "completed" | "failed" | "cancelled"> = {
        complete: "completed",
        expired: "cancelled",
        open: "pending",
      }

      return {
        status: statusMap[session.status] || "failed",
        details: session,
      }
    } catch (error) {
      console.error("Error checking payment status:", error)
      return { status: "failed" }
    }
  }

  // Verificar se o serviço está disponível
  async checkServiceHealth(): Promise<boolean> {
    return this.isStripeConfigured()
  }
}

// Exportar instância singleton
export const paymentService = PaymentService.getInstance()

// Funções utilitárias
export function formatCurrency(amount: number, currency = "EUR"): string {
  return new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: currency,
  }).format(amount)
}

export function calculateTax(amount: number, taxRate = 0.23): number {
  return amount * taxRate
}

export function calculateTotal(subtotal: number, tax = 0): number {
  return subtotal + tax
}
