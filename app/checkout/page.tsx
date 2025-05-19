"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/components/shopping-cart"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, CreditCard, CheckCircle } from "lucide-react"
import Breadcrumbs from "@/components/breadcrumbs"

type PaymentMethod = "credit-card" | "paypal" | "bank-transfer"
type CheckoutStep = "details" | "payment" | "confirmation"

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart()
  const { isAuthenticated, user } = useAuth()
  const router = useRouter()
  const [step, setStep] = useState<CheckoutStep>("details")
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("credit-card")

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Portugal",
    tradingViewUsername: "",
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCvc: "",
    savePaymentInfo: false,
    acceptTerms: false,
  })

  // Redirecionar se o carrinho estiver vazio
  useEffect(() => {
    if (items.length === 0 && step !== "confirmation") {
      router.push("/")
    }
  }, [items, router, step])

  // Preencher dados do usuário se estiver autenticado
  useEffect(() => {
    if (isAuthenticated && user) {
      setFormData((prev) => ({
        ...prev,
        firstName: user.name?.split(" ")[0] || "",
        lastName: user.name?.split(" ").slice(1).join(" ") || "",
        email: user.email || "",
        phone: user.phone || "",
      }))
    }
  }, [isAuthenticated, user])

  // Verificar se há itens que precisam de nome de usuário do TradingView
  const needsTradingViewUsername = items.some((item) => item.type === "scanner" || item.type === "membership")

  // Lidar com mudanças no formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  // Avançar para o próximo passo
  const nextStep = () => {
    if (step === "details") {
      // Validar formulário de detalhes
      if (!formData.firstName || !formData.lastName || !formData.email) {
        alert("Por favor, preencha todos os campos obrigatórios.")
        return
      }
      if (needsTradingViewUsername && !formData.tradingViewUsername) {
        alert("Por favor, informe seu nome de usuário do TradingView.")
        return
      }
      setStep("payment")
    } else if (step === "payment") {
      // Validar formulário de pagamento
      if (paymentMethod === "credit-card") {
        if (!formData.cardNumber || !formData.cardName || !formData.cardExpiry || !formData.cardCvc) {
          alert("Por favor, preencha todos os dados do cartão.")
          return
        }
      }
      if (!formData.acceptTerms) {
        alert("Você precisa aceitar os termos e condições para continuar.")
        return
      }

      // Processar pagamento
      processPayment()
    }
  }

  // Voltar para o passo anterior
  const prevStep = () => {
    if (step === "payment") {
      setStep("details")
    }
  }

  // Processar pagamento
  const processPayment = () => {
    setIsProcessing(true)

    // Simulação de processamento de pagamento
    setTimeout(() => {
      setIsProcessing(false)
      setStep("confirmation")

      // Limpar carrinho após confirmação
      clearCart()

      // Em um cenário real, aqui você enviaria os dados para o backend
      // e processaria o pagamento com um gateway como Stripe, PayPal, etc.
    }, 2000)
  }

  // Continuar comprando
  const continueShopping = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-black/90 py-10">
      <div className="container mx-auto px-4">
        <Breadcrumbs />

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Checkout</h1>
          {step !== "confirmation" && (
            <div className="mt-4 flex items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  step === "details" ? "bg-gold-500 text-black" : "bg-gray-700 text-white"
                }`}
              >
                1
              </div>
              <div className={`h-1 w-16 ${step === "details" ? "bg-gray-700" : "bg-gold-500"}`}></div>
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  step === "payment" ? "bg-gold-500 text-black" : "bg-gray-700 text-white"
                }`}
              >
                2
              </div>
              <div className="h-1 w-16 bg-gray-700"></div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-700 text-white">3</div>
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Conteúdo principal */}
          <div className="flex-1">
            <Card className="bg-gray-900 border-gray-800 shadow-xl overflow-hidden">
              {/* Detalhes do cliente */}
              {step === "details" && (
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-white mb-6">Informações Pessoais</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <Label htmlFor="firstName" className="text-gray-300">
                        Nome *
                      </Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="bg-gray-800 border-gray-700 text-white"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-gray-300">
                        Sobrenome *
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="bg-gray-800 border-gray-700 text-white"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-gray-300">
                        Email *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-gray-800 border-gray-700 text-white"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-gray-300">
                        Telefone
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                  </div>

                  <h2 className="text-xl font-semibold text-white mb-6">Endereço de Faturação</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="md:col-span-2">
                      <Label htmlFor="address" className="text-gray-300">
                        Endereço
                      </Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="city" className="text-gray-300">
                        Cidade
                      </Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="postalCode" className="text-gray-300">
                        Código Postal
                      </Label>
                      <Input
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="country" className="text-gray-300">
                        País
                      </Label>
                      <Input
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                  </div>

                  {needsTradingViewUsername && (
                    <div className="mb-6">
                      <Label htmlFor="tradingViewUsername" className="text-gray-300">
                        Nome de Usuário do TradingView *
                      </Label>
                      <Input
                        id="tradingViewUsername"
                        name="tradingViewUsername"
                        value={formData.tradingViewUsername}
                        onChange={handleChange}
                        className="bg-gray-800 border-gray-700 text-white"
                        required
                      />
                      <p className="text-sm text-gray-400 mt-1">
                        Necessário para conceder acesso aos produtos adquiridos
                      </p>
                    </div>
                  )}
                </CardContent>
              )}

              {/* Pagamento */}
              {step === "payment" && (
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-white mb-6">Método de Pagamento</h2>

                  <div className="space-y-4 mb-6">
                    <div
                      className={`flex items-center p-4 rounded-lg border cursor-pointer ${
                        paymentMethod === "credit-card"
                          ? "border-gold-500 bg-gold-500/10"
                          : "border-gray-700 bg-gray-800"
                      }`}
                      onClick={() => setPaymentMethod("credit-card")}
                    >
                      <input
                        type="radio"
                        checked={paymentMethod === "credit-card"}
                        onChange={() => setPaymentMethod("credit-card")}
                        className="mr-3"
                      />
                      <CreditCard className="h-5 w-5 mr-2 text-gray-400" />
                      <span className="text-white">Cartão de Crédito/Débito</span>
                    </div>

                    <div
                      className={`flex items-center p-4 rounded-lg border cursor-pointer ${
                        paymentMethod === "paypal" ? "border-gold-500 bg-gold-500/10" : "border-gray-700 bg-gray-800"
                      }`}
                      onClick={() => setPaymentMethod("paypal")}
                    >
                      <input
                        type="radio"
                        checked={paymentMethod === "paypal"}
                        onChange={() => setPaymentMethod("paypal")}
                        className="mr-3"
                      />
                      <span className="text-white">PayPal</span>
                    </div>

                    <div
                      className={`flex items-center p-4 rounded-lg border cursor-pointer ${
                        paymentMethod === "bank-transfer"
                          ? "border-gold-500 bg-gold-500/10"
                          : "border-gray-700 bg-gray-800"
                      }`}
                      onClick={() => setPaymentMethod("bank-transfer")}
                    >
                      <input
                        type="radio"
                        checked={paymentMethod === "bank-transfer"}
                        onChange={() => setPaymentMethod("bank-transfer")}
                        className="mr-3"
                      />
                      <span className="text-white">Transferência Bancária</span>
                    </div>
                  </div>

                  {paymentMethod === "credit-card" && (
                    <div className="space-y-4 mb-6">
                      <div>
                        <Label htmlFor="cardNumber" className="text-gray-300">
                          Número do Cartão *
                        </Label>
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={formData.cardNumber}
                          onChange={handleChange}
                          className="bg-gray-800 border-gray-700 text-white"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="cardName" className="text-gray-300">
                          Nome no Cartão *
                        </Label>
                        <Input
                          id="cardName"
                          name="cardName"
                          placeholder="NOME SOBRENOME"
                          value={formData.cardName}
                          onChange={handleChange}
                          className="bg-gray-800 border-gray-700 text-white"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="cardExpiry" className="text-gray-300">
                            Validade *
                          </Label>
                          <Input
                            id="cardExpiry"
                            name="cardExpiry"
                            placeholder="MM/AA"
                            value={formData.cardExpiry}
                            onChange={handleChange}
                            className="bg-gray-800 border-gray-700 text-white"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="cardCvc" className="text-gray-300">
                            CVC/CVV *
                          </Label>
                          <Input
                            id="cardCvc"
                            name="cardCvc"
                            placeholder="123"
                            value={formData.cardCvc}
                            onChange={handleChange}
                            className="bg-gray-800 border-gray-700 text-white"
                            required
                          />
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="savePaymentInfo"
                          name="savePaymentInfo"
                          checked={formData.savePaymentInfo}
                          onCheckedChange={(checked) =>
                            setFormData((prev) => ({ ...prev, savePaymentInfo: checked === true }))
                          }
                        />
                        <label
                          htmlFor="savePaymentInfo"
                          className="text-sm text-gray-300 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Salvar informações de pagamento para futuras compras
                        </label>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "paypal" && (
                    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 text-center mb-6">
                      <p className="text-white mb-4">
                        Você será redirecionado para o PayPal para concluir seu pagamento.
                      </p>
                      <img src="/paypal-logo.png" alt="PayPal" className="mx-auto h-10" />
                    </div>
                  )}

                  {paymentMethod === "bank-transfer" && (
                    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-6">
                      <h3 className="text-white font-medium mb-2">Dados Bancários</h3>
                      <p className="text-gray-300 mb-1">Banco: Banco Comercial Português</p>
                      <p className="text-gray-300 mb-1">IBAN: PT50 0033 0000 45446932471 05</p>
                      <p className="text-gray-300 mb-1">BIC/SWIFT: BCOMPTPL</p>
                      <p className="text-gray-300 mb-1">Beneficiário: MoreThanMoney, Lda</p>
                      <p className="text-gray-300 mb-4">Referência: Seu email</p>
                      <p className="text-sm text-gray-400">
                        Após realizar a transferência, envie o comprovante para suporte@morethanmoney.pt
                      </p>
                    </div>
                  )}

                  <div className="mb-6">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="acceptTerms"
                        name="acceptTerms"
                        checked={formData.acceptTerms}
                        onCheckedChange={(checked) =>
                          setFormData((prev) => ({ ...prev, acceptTerms: checked === true }))
                        }
                        required
                      />
                      <label
                        htmlFor="acceptTerms"
                        className="text-sm text-gray-300 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Li e aceito os{" "}
                        <a href="/terms" className="text-gold-500 hover:underline">
                          Termos e Condições
                        </a>{" "}
                        e a{" "}
                        <a href="/privacy-policy" className="text-gold-500 hover:underline">
                          Política de Privacidade
                        </a>
                      </label>
                    </div>
                  </div>
                </CardContent>
              )}

              {/* Confirmação */}
              {step === "confirmation" && (
                <CardContent className="p-6 text-center py-12">
                  <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-10 w-10 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-3">Pagamento Confirmado!</h2>
                  <p className="text-gray-400 mb-8 max-w-md mx-auto">
                    Obrigado pela sua compra. Enviamos um email com os detalhes da sua compra e instruções para acessar
                    seus produtos.
                  </p>
                  <Button onClick={continueShopping} className="bg-gold-500 hover:bg-gold-600 text-black">
                    Continuar Comprando
                  </Button>
                </CardContent>
              )}

              {/* Rodapé */}
              {step !== "confirmation" && (
                <div className="p-6 border-t border-gray-800">
                  <div className="flex justify-between">
                    {step === "payment" ? (
                      <Button onClick={prevStep} variant="outline" className="border-gray-700 text-gray-300">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Voltar
                      </Button>
                    ) : (
                      <Button onClick={continueShopping} variant="outline" className="border-gray-700 text-gray-300">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Continuar Comprando
                      </Button>
                    )}
                    <Button
                      onClick={nextStep}
                      disabled={isProcessing}
                      className="bg-gold-500 hover:bg-gold-600 text-black"
                    >
                      {isProcessing ? (
                        <span className="flex items-center">
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-black"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Processando...
                        </span>
                      ) : step === "details" ? (
                        "Continuar para Pagamento"
                      ) : (
                        "Finalizar Pagamento"
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* Resumo lateral */}
          {step !== "confirmation" && (
            <div className="w-full lg:w-80">
              <Card className="bg-gray-900 border-gray-800 sticky top-6">
                <CardContent className="p-6">
                  <h2 className="text-lg font-medium text-white mb-4">Resumo do Pedido</h2>

                  <div className="space-y-3 mb-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-gray-300">
                          {item.quantity}x {item.name}
                          {item.details?.duration && ` (${item.details.duration})`}
                        </span>
                        <span className="text-white">€{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-800 pt-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Subtotal</span>
                      <span className="text-white">€{totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm mt-2">
                      <span className="text-gray-400">IVA (23%)</span>
                      <span className="text-white">€{(totalPrice * 0.23).toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="border-t border-gray-800 pt-3 mb-4">
                    <div className="flex justify-between">
                      <span className="font-medium text-white">Total</span>
                      <span className="font-bold text-gold-500">€{(totalPrice * 1.23).toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="bg-gray-800 p-3 rounded-lg text-sm text-gray-300">
                    <p>Pagamento seguro processado com criptografia SSL.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
