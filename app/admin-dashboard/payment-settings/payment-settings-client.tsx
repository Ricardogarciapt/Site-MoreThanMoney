"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CreditCard, ArrowLeft, Shield, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function PaymentSettingsClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-white">Configurações de Pagamento</h1>
          <p className="text-gray-400">Configure as chaves do Stripe para processar pagamentos.</p>
        </div>

        <div className="grid gap-6">
          {/* Stripe Configuration Card */}
          <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Configuração do Stripe
              </CardTitle>
              <CardDescription>Configure suas chaves do Stripe para processar pagamentos.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Security Warning */}
              <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-amber-400 mb-1">Aviso de Segurança</h4>
                  <p className="text-amber-300 text-sm">
                    Mantenha suas chaves secretas seguras. Nunca as compartilhe ou as exponha publicamente.
                  </p>
                </div>
              </div>

              {/* Publishable Key */}
              <div className="space-y-2">
                <Label htmlFor="publishable-key" className="text-white">
                  Chave Publicável (pk_...)
                </Label>
                <Input
                  id="publishable-key"
                  type="text"
                  placeholder="pk_test_..."
                  className="bg-gray-800/50 border-white/10 text-white"
                />
                <p className="text-xs text-gray-400">Esta chave é usada no frontend e pode ser exposta publicamente.</p>
              </div>

              {/* Secret Key */}
              <div className="space-y-2">
                <Label htmlFor="secret-key" className="text-white">
                  Chave Secreta (sk_...)
                </Label>
                <Input
                  id="secret-key"
                  type="password"
                  placeholder="sk_test_..."
                  className="bg-gray-800/50 border-white/10 text-white"
                />
                <p className="text-xs text-gray-400">Esta chave é usada no backend e deve ser mantida em segredo.</p>
              </div>

              {/* Webhook Secret */}
              <div className="space-y-2">
                <Label htmlFor="webhook-secret" className="text-white">
                  Webhook Secret (whsec_...)
                </Label>
                <Input
                  id="webhook-secret"
                  type="password"
                  placeholder="whsec_..."
                  className="bg-gray-800/50 border-white/10 text-white"
                />
                <p className="text-xs text-gray-400">Usado para verificar a autenticidade dos webhooks do Stripe.</p>
              </div>

              {/* Mode Indicator */}
              <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-4 w-4 text-blue-400" />
                  <h4 className="font-medium text-blue-400">Modo de Operação</h4>
                </div>
                <p className="text-blue-300 text-sm">
                  Atualmente configurado para: <span className="font-medium">Modo de Teste</span>
                </p>
                <p className="text-blue-300/70 text-xs mt-1">Nenhuma transação real será processada neste modo.</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button className="bg-gold-600 hover:bg-gold-700 text-black">Salvar Configurações</Button>
                <Button variant="outline" className="border-green-500 text-green-400 hover:bg-green-500/10">
                  Testar Conexão
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Instructions Card */}
          <Card className="bg-black/50 border-gold-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Como Configurar</CardTitle>
              <CardDescription>Siga estes passos para configurar o Stripe corretamente.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-gold-500 text-black rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-1">Acesse o Dashboard do Stripe</h4>
                    <p className="text-gray-400 text-sm">
                      Faça login em dashboard.stripe.com e navegue até a seção "Developers" → "API keys".
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-gold-500 text-black rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-1">Copie as Chaves</h4>
                    <p className="text-gray-400 text-sm">
                      Copie a "Publishable key" e a "Secret key" do seu ambiente (teste ou produção).
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-gold-500 text-black rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-1">Configure Webhooks</h4>
                    <p className="text-gray-400 text-sm">
                      Crie um webhook endpoint apontando para:{" "}
                      <code className="bg-gray-800 px-1 rounded">
                        https://morethanmoney.pt/api/payments/stripe/webhook
                      </code>
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-gold-500 text-black rounded-full flex items-center justify-center text-sm font-bold">
                    4
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-1">Cole as Chaves</h4>
                    <p className="text-gray-400 text-sm">Cole as chaves nos campos acima e salve as configurações.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Back Button */}
        <div className="mt-8">
          <Link href="/admin-dashboard">
            <Button variant="outline" className="border-gold-500 text-gold-400 hover:bg-gold-500/10">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar para o Painel
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
