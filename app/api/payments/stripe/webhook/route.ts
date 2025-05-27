import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { memberService } from "@/lib/member-service"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
})

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get("stripe-signature")!

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, endpointSecret)
    } catch (err) {
      console.error("Webhook signature verification failed:", err)
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    // Processar diferentes tipos de eventos
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object as Stripe.Checkout.Session
        await handleSuccessfulPayment(session)
        break

      case "payment_intent.succeeded":
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.log("Pagamento confirmado:", paymentIntent.id)
        break

      case "payment_intent.payment_failed":
        const failedPayment = event.data.object as Stripe.PaymentIntent
        console.log("Pagamento falhou:", failedPayment.id)
        break

      default:
        console.log(`Evento não tratado: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Erro no webhook:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

async function handleSuccessfulPayment(session: Stripe.Checkout.Session) {
  try {
    // Recuperar detalhes da sessão
    const sessionWithLineItems = await stripe.checkout.sessions.retrieve(session.id, { expand: ["line_items"] })

    const customerEmail = session.customer_email
    const customerName = session.metadata?.customerName
    const lineItems = sessionWithLineItems.line_items?.data

    if (!customerEmail || !lineItems) {
      console.error("Dados insuficientes na sessão")
      return
    }

    // Processar cada item comprado
    for (const item of lineItems) {
      const productName = item.description

      // Determinar o tipo de produto e atualizar o usuário
      if (productName?.includes("Scanner")) {
        await updateUserAccess(customerEmail, "scanner")
      } else if (productName?.includes("Copytrading")) {
        await updateUserAccess(customerEmail, "copytrading")
      } else if (productName?.includes("JIFU")) {
        await updateUserAccess(customerEmail, "jifu")
      }
    }

    // Enviar email de confirmação (implementar depois)
    await sendConfirmationEmail(customerEmail, customerName, lineItems)

    console.log("Pagamento processado com sucesso para:", customerEmail)
  } catch (error) {
    console.error("Erro ao processar pagamento bem-sucedido:", error)
  }
}

async function updateUserAccess(email: string, accessType: string) {
  try {
    // Buscar usuário por email
    const members = await memberService.getAllMembers()
    const member = members.find((m) => m.email === email)

    if (member) {
      // Atualizar acesso do usuário
      const currentPackage = member.package || ""
      const newPackage = currentPackage ? `${currentPackage},${accessType}` : accessType

      await memberService.updateMemberPackage(member.id, newPackage)
      console.log(`Acesso ${accessType} adicionado para ${email}`)
    }
  } catch (error) {
    console.error("Erro ao atualizar acesso do usuário:", error)
  }
}

async function sendConfirmationEmail(email: string, name: string | undefined, items: any[]) {
  // Implementar envio de email de confirmação
  console.log("Enviando email de confirmação para:", email)
  // TODO: Integrar com serviço de email (SendGrid, Mailgun, etc.)
}
