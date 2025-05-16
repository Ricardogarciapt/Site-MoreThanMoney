"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Timer, ArrowUpRight, ArrowDownRight, Target, TrendingUp, TrendingDown, CheckCircle2, X } from "lucide-react"

interface Signal {
  id: string
  symbol: string
  direction: "buy" | "sell"
  price: string
  stopLoss: string
  takeProfit: string
  timeLeft: number
  status: "active" | "expired" | "accepted"
}

interface TapToTradeWidgetProps {
  onAccept: (signal: Signal) => void
}

export function TapToTradeWidget({ onAccept }: TapToTradeWidgetProps) {
  const [activeSignals, setActiveSignals] = useState<Signal[]>([
    {
      id: "1",
      symbol: "EUR/USD",
      direction: "buy",
      price: "1.0890",
      stopLoss: "1.0850",
      takeProfit: "1.0950",
      timeLeft: 120,
      status: "active",
    },
    {
      id: "2",
      symbol: "GBP/JPY",
      direction: "sell",
      price: "169.20",
      stopLoss: "169.60",
      takeProfit: "168.50",
      timeLeft: 75,
      status: "active",
    },
    {
      id: "3",
      symbol: "BTC/USD",
      direction: "buy",
      price: "26950",
      stopLoss: "26750",
      takeProfit: "27300",
      timeLeft: 100,
      status: "active",
    },
  ])

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSignals((prev) =>
        prev.map((signal) => {
          if (signal.status !== "active") return signal
          const newTimeLeft = signal.timeLeft - 1
          if (newTimeLeft <= 0) {
            return { ...signal, timeLeft: 0, status: "expired" }
          }
          return { ...signal, timeLeft: newTimeLeft }
        }),
      )
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Formatar tempo restante
  const formatTimeLeft = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  // Calcular porcentagem de tempo restante
  const calculateTimePercentage = (seconds: number) => {
    return (seconds / 120) * 100
  }

  // Reabastecer sinais quando todos expirarem
  useEffect(() => {
    if (activeSignals.every((signal) => signal.status !== "active")) {
      // Simular chegada de novos sinais após 5 segundos
      const timeout = setTimeout(() => {
        setActiveSignals([
          {
            id: "4",
            symbol: "USD/JPY",
            direction: "sell",
            price: "145.60",
            stopLoss: "146.00",
            takeProfit: "144.80",
            timeLeft: 120,
            status: "active",
          },
          {
            id: "5",
            symbol: "XAU/USD",
            direction: "buy",
            price: "1930.50",
            stopLoss: "1925.00",
            takeProfit: "1940.00",
            timeLeft: 120,
            status: "active",
          },
          {
            id: "6",
            symbol: "ETH/USD",
            direction: "buy",
            price: "1875",
            stopLoss: "1850",
            takeProfit: "1920",
            timeLeft: 120,
            status: "active",
          },
        ])
      }, 5000)

      return () => clearTimeout(timeout)
    }
  }, [activeSignals])

  const handleAcceptSignal = (signal: Signal) => {
    setActiveSignals((prev) => prev.map((s) => (s.id === signal.id ? { ...s, status: "accepted" } : s)))
    onAccept(signal)
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {activeSignals.map((signal) => (
        <Card
          key={signal.id}
          className={`bg-black/50 border-gold-500/30 backdrop-blur-sm overflow-hidden relative ${
            signal.status === "expired" ? "opacity-60" : ""
          }`}
        >
          {/* Barra de progresso do tempo */}
          {signal.status === "active" && (
            <div
              className="absolute top-0 left-0 h-1 bg-gold-500"
              style={{ width: `${calculateTimePercentage(signal.timeLeft)}%` }}
            />
          )}

          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-xl flex items-center">
                {signal.symbol}
                {signal.direction === "buy" ? (
                  <TrendingUp className="h-4 w-4 text-green-500 ml-2" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500 ml-2" />
                )}
              </CardTitle>
              <Badge
                className={`
                  ${
                    signal.status === "active"
                      ? "bg-green-500/20 text-green-500"
                      : signal.status === "accepted"
                        ? "bg-blue-500/20 text-blue-500"
                        : "bg-red-500/20 text-red-500"
                  }
                `}
              >
                {signal.status === "active" ? "Ativo" : signal.status === "accepted" ? "Aceito" : "Expirado"}
              </Badge>
            </div>
            {signal.status === "active" && (
              <div className="flex items-center mt-1 text-gold-500">
                <Timer className="h-4 w-4 mr-1" />
                <span className="text-sm">{formatTimeLeft(signal.timeLeft)} restantes</span>
              </div>
            )}
          </CardHeader>

          <CardContent className="py-3">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-xs text-gray-400">Direção</p>
                <p className={`font-medium ${signal.direction === "buy" ? "text-green-500" : "text-red-500"}`}>
                  {signal.direction === "buy" ? (
                    <span className="flex items-center">
                      <ArrowUpRight className="h-4 w-4 mr-1" /> Compra
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <ArrowDownRight className="h-4 w-4 mr-1" /> Venda
                    </span>
                  )}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-400">Preço de Entrada</p>
                <p className="font-medium">{signal.price}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-400">Stop Loss</p>
                <p className="font-medium text-red-500">{signal.stopLoss}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-400">Take Profit</p>
                <p className="font-medium text-green-500">{signal.takeProfit}</p>
              </div>
            </div>
          </CardContent>

          <CardFooter>
            {signal.status === "active" ? (
              <Button
                className="w-full bg-gold-600 hover:bg-gold-700 text-black"
                onClick={() => handleAcceptSignal(signal)}
              >
                <Target className="h-4 w-4 mr-2" />
                Aceitar Sinal
              </Button>
            ) : signal.status === "accepted" ? (
              <Button disabled className="w-full bg-blue-500/20 text-blue-500 cursor-default">
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Sinal Aceito
              </Button>
            ) : (
              <Button disabled className="w-full bg-red-500/20 text-red-500 cursor-default">
                <X className="h-4 w-4 mr-2" />
                Sinal Expirado
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
