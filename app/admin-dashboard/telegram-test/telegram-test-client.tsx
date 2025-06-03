"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, XCircle, MessageSquare, Users, Settings, RefreshCw } from "lucide-react"

interface TelegramMessage {
  id: number
  text: string
  date: string
  topic?: string
  author?: string
}

interface TelegramStatus {
  connected: boolean
  botInfo?: any
  chatInfo?: any
  lastMessage?: TelegramMessage
  error?: string
}

export default function TelegramTestClient() {
  const [status, setStatus] = useState<TelegramStatus>({ connected: false })
  const [messages, setMessages] = useState<TelegramMessage[]>([])
  const [loading, setLoading] = useState(false)

  const testConnection = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/telegram/test")
      const data = await response.json()
      setStatus(data)
    } catch (error) {
      setStatus({
        connected: false,
        error: "Erro ao conectar com a API do Telegram",
      })
    }
    setLoading(false)
  }

  const fetchMessages = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/telegram/messages")
      const data = await response.json()
      setMessages(data.messages || [])
    } catch (error) {
      console.error("Erro ao buscar mensagens:", error)
    }
    setLoading(false)
  }

  const testWebhook = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/telegram/webhook-test", {
        method: "POST",
      })
      const data = await response.json()
      alert(`Webhook test: ${data.success ? "Sucesso" : "Falhou"}`)
    } catch (error) {
      alert("Erro no teste de webhook")
    }
    setLoading(false)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Teste de Integração Telegram</h1>
        <p className="text-gray-600">Verificar conexão com o bot e canal do Telegram MoreThanMoney</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Status da Conexão */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="h-5 w-5 mr-2" />
              Status da Conexão
            </CardTitle>
            <CardDescription>Verificar se o bot está conectado e funcionando</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Status do Bot:</span>
                <Badge variant={status.connected ? "default" : "destructive"}>
                  {status.connected ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-1" /> Conectado
                    </>
                  ) : (
                    <>
                      <XCircle className="h-4 w-4 mr-1" /> Desconectado
                    </>
                  )}
                </Badge>
              </div>

              {status.botInfo && (
                <div className="text-sm text-gray-600">
                  <p>
                    <strong>Bot:</strong> @{status.botInfo.username}
                  </p>
                  <p>
                    <strong>Nome:</strong> {status.botInfo.first_name}
                  </p>
                </div>
              )}

              {status.chatInfo && (
                <div className="text-sm text-gray-600">
                  <p>
                    <strong>Canal:</strong> {status.chatInfo.title}
                  </p>
                  <p>
                    <strong>Membros:</strong> {status.chatInfo.members_count}
                  </p>
                </div>
              )}

              {status.error && (
                <Alert variant="destructive">
                  <AlertDescription>{status.error}</AlertDescription>
                </Alert>
              )}

              <Button onClick={testConnection} disabled={loading} className="w-full">
                {loading ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> Testando...
                  </>
                ) : (
                  <>Testar Conexão</>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Configurações */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              Configurações
            </CardTitle>
            <CardDescription>Configurações atuais do Telegram</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-sm">
                <p>
                  <strong>Bot Token:</strong> {process.env.TELEGRAM_BOT_TOKEN ? "✓ Configurado" : "✗ Não configurado"}
                </p>
                <p>
                  <strong>Webhook Secret:</strong>{" "}
                  {process.env.TELEGRAM_WEBHOOK_SECRET ? "✓ Configurado" : "✗ Não configurado"}
                </p>
                <p>
                  <strong>Canal ID:</strong> -1002055149876
                </p>
              </div>

              <div className="space-y-2">
                <Button onClick={fetchMessages} disabled={loading} variant="outline" className="w-full">
                  Buscar Mensagens Recentes
                </Button>

                <Button onClick={testWebhook} disabled={loading} variant="outline" className="w-full">
                  Testar Webhook
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mensagens Recentes */}
      {messages.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Mensagens Recentes ({messages.length})
            </CardTitle>
            <CardDescription>Últimas mensagens capturadas do canal</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {messages.map((message) => (
                <div key={message.id} className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">{message.topic || "Geral"}</Badge>
                    <span className="text-xs text-gray-500">{message.date}</span>
                  </div>
                  <p className="text-sm">{message.text}</p>
                  {message.author && <p className="text-xs text-gray-400 mt-1">Por: {message.author}</p>}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tópicos Configurados */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Tópicos Configurados</CardTitle>
          <CardDescription>Tópicos que o bot está monitorando</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl mb-2">💰</div>
              <p className="font-medium">SINAIS</p>
              <p className="text-xs text-gray-500">Trading Signals</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl mb-2">🏛️</div>
              <p className="font-medium">ETF'S</p>
              <p className="text-xs text-gray-500">ETF Analysis</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl mb-2">🚀</div>
              <p className="font-medium">Cripto</p>
              <p className="text-xs text-gray-500">Cryptocurrency</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl mb-2">📈</div>
              <p className="font-medium">Forex</p>
              <p className="text-xs text-gray-500">Currency Trading</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
