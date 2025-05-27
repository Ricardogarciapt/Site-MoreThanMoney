// Serviço de pagamentos integrado com Stripe e PayPal
import { loadStripe } from "@stripe/stripe-js"

// Configuração do Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

// Tipos para pagamentos
export interface PaymentItem {
  id: string
  name: string
  price: number
  quantity: number
  type?: string
}

export interface PaymentData {
  items: PaymentItem[]
  customerInfo: {
    name: string
    email: string
    phone?: string
  }
  totalAmount: number
  currency: string
  successUrl: string
  cancelUrl: string
  metadata?: Record<string, string>
}

export interface PaymentResult {
  success: boolean
  paymentId?: string
  error?: string
  redirectUrl?: string
}

// Classe principal do serviço de pagamentos
export class PaymentService {
  private static instance: PaymentService

  public static getInstance(): PaymentService {
    if (!PaymentService.instance) {
      PaymentService.instance = new PaymentService()
    }
    return PaymentService.instance
  }

  // Processar pagamento com Stripe
  async processStripePayment(paymentData: PaymentData): Promise<PaymentResult> {
    try {
      const response = await fetch("/api/payments/stripe/create-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      })

      const session = await response.json()

      if (!response.ok) {
        throw new Error(session.error || "Erro ao criar sessão de pagamento")
      }

      const stripe = await stripePromise
      if (!stripe) {
        throw new Error("Stripe não foi carregado")
      }

      const { error } = await stripe.redirectToCheckout({
        sessionId: session.id,
      })

      if (error) {
        throw new Error(error.message)
      }

      return {
        success: true,
        paymentId: session.id,
      }
    } catch (error) {
      console.error("Erro no pagamento Stripe:", error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Erro desconhecido",
      }
    }
  }

  // Processar pagamento com PayPal
  async processPayPalPayment(paymentData: PaymentData): Promise<PaymentResult> {
    try {
      const response = await fetch("/api/payments/paypal/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      })

      const order = await response.json()

      if (!response.ok) {
        throw new Error(order.error || "Erro ao criar ordem PayPal")
      }

      // Redirecionar para PayPal
      const approvalUrl = order.links.find((link: any) => link.rel === "approve")?.href

      if (approvalUrl) {
        window.location.href = approvalUrl
        return {
          success: true,
          paymentId: order.id,
          redirectUrl: approvalUrl,
        }
      }

      throw new Error("URL de aprovação não encontrada")
    } catch (error) {
      console.error("Erro no pagamento PayPal:", error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Erro desconhecido",
      }
    }
  }

  // Verificar status do pagamento
  async checkPaymentStatus(
    paymentId: string,
    provider: "stripe" | "paypal",
  ): Promise<{
    status: "pending" | "completed" | "failed" | "cancelled"
    details?: any
  }> {
    try {
      const response = await fetch(`/api/payments/${provider}/status/${paymentId}`)
      const result = await response.json()

      return {
        status: result.status,
        details: result.details,
      }
    } catch (error) {
      console.error("Erro ao verificar status:", error)
      return { status: "failed" }
    }
  }

  // Processar webhook de pagamento
  async processWebhook(provider: "stripe" | "paypal", payload: any, signature?: string): Promise<boolean> {
    try {
      const response = await fetch(`/api/payments/${provider}/webhook`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(signature && { "stripe-signature": signature }),
        },
        body: JSON.stringify(payload),
      })

      return response.ok
    } catch (error) {
      console.error("Erro ao processar webhook:", error)
      return false
    }
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
