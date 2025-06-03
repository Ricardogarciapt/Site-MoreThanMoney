"use client"

import dynamic from "next/dynamic"

// Dados simulados
const visitData = [
  { name: "Jan", value: 1200 },
  { name: "Fev", value: 1900 },
  { name: "Mar", value: 2400 },
  { name: "Abr", value: 1800 },
  { name: "Mai", value: 2800 },
  { name: "Jun", value: 3200 },
  { name: "Jul", value: 3800 },
]

const salesData = [
  { name: "Jan", value: 4000 },
  { name: "Fev", value: 6000 },
  { name: "Mar", value: 8000 },
  { name: "Abr", value: 7000 },
  { name: "Mai", value: 9000 },
  { name: "Jun", value: 11000 },
  { name: "Jul", value: 12000 },
]

const productSalesData = [
  { name: "Scanner", value: 45 },
  { name: "Copytrading", value: 30 },
  { name: "Membership", value: 15 },
  { name: "Bootcamp", value: 10 },
]

const COLORS = ["#f9b208", "#e67e22", "#3498db", "#9b59b6"]

const userGrowthData = [
  { name: "Jan", novos: 65, ativos: 120 },
  { name: "Fev", novos: 78, ativos: 150 },
  { name: "Mar", novos: 90, ativos: 180 },
  { name: "Abr", novos: 81, ativos: 200 },
  { name: "Mai", novos: 95, ativos: 220 },
  { name: "Jun", novos: 110, ativos: 250 },
  { name: "Jul", novos: 120, ativos: 280 },
]

const StatisticsClient = dynamic(() => import("./statistics-client"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gold-400 font-medium">Carregando estatísticas...</p>
      </div>
    </div>
  ),
})

export default function StatisticsPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gold-400 font-medium">Carregando estatísticas...</p>
      </div>
    </div>
  )
}
