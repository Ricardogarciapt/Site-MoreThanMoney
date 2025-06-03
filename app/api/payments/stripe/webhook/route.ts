import { type NextRequest, NextResponse } from "next/server"
import { headers } from "next/headers"
import Stripe from "stripe"
import { db, type User } from "@/lib/database-service" // Adjust path if necessary

// Verificar se estamos em runtime
const isRuntime = typeof window === "undefined" && process.env.NODE_ENV !== "test"

// Inicializar Stripe apenas se disponível
let stripe: Stripe | null = null

if (isRuntime && process.env.STRIPE_SECRET_KEY) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-06-20",
    typescript: true, // Enable TypeScript support for Stripe types
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

    let event: Stripe.Event
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err: any) {
      console.error("Erro na verificação do webhook:", err.message)
      return NextResponse.json({ error: `Webhook signature verification failed: ${err.message}` }, { status: 400 })
    }

    // Processar eventos do Stripe
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object as Stripe.Checkout.Session
        console.log("Checkout session concluído:", session.id)
        await handlePaymentSuccess(session)
        break

      case "payment_intent.succeeded":
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.log("Payment Intent sucesso:", paymentIntent.id)
        // Handle payment intent success if needed, though checkout.session.completed is often primary
        break

      case "payment_intent.payment_failed":
        const failedPayment = event.data.object as Stripe.PaymentIntent
        console.log("Pagamento falhou:", failedPayment.id, failedPayment.last_payment_error?.message)
        // Handle failed payment (e.g., notify user, update order status)
        break

      default:
        console.log(`Evento não tratado: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error("Erro no webhook:", error.message)
    return NextResponse.json({ error: "Erro interno" }, { status: 500 })
  }
}

async function handlePaymentSuccess(session: Stripe.Checkout.Session) {
  if (!stripe) {
    console.error("Stripe not initialized in handlePaymentSuccess")
    return
  }
  try {
    const customerEmail = session.customer_details?.email
    const customerName = session.customer_details?.name || session.metadata?.customerName
    const amount = session.amount_total ? session.amount_total / 100 : 0
    const currency = session.currency?.toUpperCase() || "EUR"
    const stripePaymentIntentId =
      typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id
    const userIdFromMetadata = session.metadata?.userId

    // Fetch line items to get product details
    let productName = "Produto MoreThanMoney"
    const productType = "one_time" // Default type
    if (session.id) {
      try {
        const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { limit: 1 })
        if (lineItems.data.length > 0) {
          productName = lineItems.data[0].description || productName
          // You might store product type (subscription/one_time) in price metadata or product metadata
          // For example: productType = lineItems.data[0].price?.recurring ? "subscription" : "one_time";
        }
      } catch (lineItemError: any) {
        console.error("Error fetching line items:", lineItemError.message)
      }
    }

    console.log("Processando pagamento bem-sucedido:", {
      email: customerEmail,
      name: customerName,
      amount: amount,
      sessionId: session.id,
      paymentIntentId: stripePaymentIntentId,
      productName: productName,
      userIdFromMetadata: userIdFromMetadata,
    })

    let user: User | null = null

    if (userIdFromMetadata) {
      user = await db.getUserById(userIdFromMetadata)
      if (user) {
        console.log(`Usuário encontrado por ID de metadados: ${user.id}`)
      }
    }

    if (!user && customerEmail) {
      user = await db.getUserByEmail(customerEmail)
      if (user) {
        console.log(`Usuário encontrado por email: ${user.id}`)
      }
    }

    if (!user) {
      console.warn(
        `Usuário não encontrado para email: ${customerEmail} e ID de metadados: ${userIdFromMetadata}. Pagamento será registrado sem associação direta de usuário ou com um usuário convidado, se aplicável.`,
      )
      // Decide how to handle payments for non-existent users.
      // Option 1: Create a guest user record (if your system supports it)
      // Option 2: Log the payment for manual association or create a placeholder user
      // Option 3: Reject/flag if user must exist (less common for webhooks)
      // For now, we'll log and proceed to record payment without user_id if user is null
    }

    // Registrar pagamento
    const paymentData = {
      user_id: user ? user.id : null, // Allow null if user not found, or handle differently
      stripe_payment_intent_id: stripePaymentIntentId,
      amount: amount,
      currency: currency,
      status: "completed" as const,
      product_name: productName,
      payment_method: "stripe" as const,
    }

    // @ts-ignore // Supabase types might need adjustment if user_id can be null
    const paymentRecord = await db.createPayment(paymentData)

    if (paymentRecord) {
      console.log("Pagamento registrado no banco de dados:", paymentRecord.id)

      if (user) {
        // Atualizar membership/pacote do usuário
        let newPackage = user.package // Default to current package
        // Example logic: determine package based on product name or Stripe Price ID/Product ID
        if (productName.toLowerCase().includes("básico") || productName.toLowerCase().includes("basic")) {
          newPackage = "basic"
        } else if (productName.toLowerCase().includes("scanner")) {
          // Differentiate annual vs lifetime based on price or metadata if needed
          newPackage = "scanner-annual" // Example
        } else if (productName.toLowerCase().includes("premium")) {
          newPackage = "premium"
        }
        // Add more specific conditions based on your product catalog

        if (newPackage && newPackage !== user.package) {
          const updatedUser = await db.updateUser(user.id, { package: newPackage })
          if (updatedUser) {
            console.log(`Pacote do usuário ${user.id} atualizado para ${newPackage}`)
          } else {
            console.error(`Falha ao atualizar pacote do usuário ${user.id}`)
          }
        }
      }
    } else {
      console.error("Falha ao registrar pagamento no banco de dados.")
    }

    // TODO: Enviar email de confirmação
  } catch (error: any) {
    console.error("Erro ao processar pagamento bem-sucedido:", error.message)
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
