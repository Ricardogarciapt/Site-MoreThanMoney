// Serviço de pagamentos com verificações de segurança
import { loadStripe } from "@stripe/stripe-js"

// Verificar se a chave pública está disponível
const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

// Inicializar Stripe apenas se a chave estiver disponível
const stripePromise = stripePublicKey ? loadStripe(stripePublicKey) : null

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

  // Verificar se o Stripe está configurado
  private isStripeConfigured(): boolean {
    return !!stripePublicKey && !!stripePromise
  }

  // Processar pagamento com Stripe
  async processStripePayment(paymentData: PaymentData): Promise<PaymentResult> {
    try {
      // Verificar se o Stripe está configurado
      if (!this.isStripeConfigured()) {
        throw new Error("Stripe não está configurado. Verifique as chaves de API.")
      }

      // Validar dados obrigatórios
      if (!paymentData.items || paymentData.items.length === 0) {
        throw new Error("Carrinho vazio")
      }

      if (!paymentData.customerInfo.email) {
        throw new Error("Email é obrigatório")
      }

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

  // Verificar status do pagamento
  async checkPaymentStatus(
    paymentId: string,
    provider: "stripe" = "stripe",
  ): Promise<{
    status: "pending" | "completed" | "failed" | "cancelled"
    details?: any
  }> {
    try {
      const response = await fetch(`/api/payments/stripe/status/${paymentId}`)

      if (!response.ok) {
        throw new Error("Erro ao verificar status")
      }

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

  // Verificar se o serviço está disponível
  async checkServiceHealth(): Promise<boolean> {
    try {
      const response = await fetch("/api/payments/stripe/create-session")
      return response.status !== 503
    } catch {
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
