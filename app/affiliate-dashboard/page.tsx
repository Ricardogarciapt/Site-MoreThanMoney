"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, ExternalLink, Users, DollarSign, Download, Share2, FileText, BarChart3 } from "lucide-react"
import { useRouter } from "next/navigation"
import { MembershipRequired } from "@/components/membership-required"
import { useConfigStore } from "@/lib/config-service"
import { useToast } from "@/components/ui/use-toast"

// Simulação de banco de dados para afiliados
const mockAffiliateData = {
  referrals: [
    { id: 1, name: "João Silva", email: "joao@example.com", date: "2025-04-15", status: "Ativo", commission: 25 },
    { id: 2, name: "Maria Oliveira", email: "maria@example.com", date: "2025-04-18", status: "Ativo", commission: 25 },
    { id: 3, name: "Pedro Santos", email: "pedro@example.com", date: "2025-04-20", status: "Pendente", commission: 0 },
    { id: 4, name: "Ana Costa", email: "ana@example.com", date: "2025-04-22", status: "Ativo", commission: 25 },
    {
      id: 5,
      name: "Carlos Ferreira",
      email: "carlos@example.com",
      date: "2025-04-25",
      status: "Inativo",
      commission: 10,
    },
  ],
  transactions: [
    { id: 1, date: "2025-05-01", description: "Comissão - João Silva", status: "Pago", amount: 25 },
    { id: 2, date: "2025-05-01", description: "Comissão - Maria Oliveira", status: "Pago", amount: 25 },
    { id: 3, date: "2025-05-01", description: "Comissão - Ana Costa", status: "Pendente", amount: 25 },
    { id: 4, date: "2025-05-01", description: "Comissão - Carlos Ferreira", status: "Pendente", amount: 10 },
    { id: 5, date: "2025-04-01", description: "Pagamento Mensal", status: "Pago", amount: -50 },
  ],
  marketingMaterials: [
    {
      id: 1,
      name: "Banner Principal",
      type: "banner",
      size: "728x90",
      campaign: "Scanner",
      url: "/affiliate-materials/banner1.jpg",
    },
    {
      id: 2,
      name: "Banner Lateral",
      type: "banner",
      size: "300x250",
      campaign: "JIFU",
      url: "/affiliate-materials/banner2.jpg",
    },
    {
      id: 3,
      name: "Banner Quadrado",
      type: "banner",
      size: "250x250",
      campaign: "Copytrading",
      url: "/affiliate-materials/banner3.jpg",
    },
    { id: 4, name: "Email Template", type: "email", campaign: "Scanner", url: "/affiliate-materials/email1.html" },
    { id: 5, name: "Vídeo Promocional", type: "video", campaign: "JIFU", url: "/affiliate-materials/video1.mp4" },
    { id: 6, name: "PDF Informativo", type: "document", campaign: "Geral", url: "/affiliate-materials/info.pdf" },
  ],
}

export default function AffiliateDashboard() {
  const { isAuthenticated, user } = useAuth()
  const router = useRouter()
  const { config } = useConfigStore()
  const { toast } = useToast()
  const [affiliateLinks, setAffiliateLinks] = useState({
    main: "",
    jifu: "",
    scanner: "",
    copytrading: "",
  })
  const [stats, setStats] = useState({
    clicks: 0,
    signups: 0,
    earnings: 0,
    pendingPayments: 0,
    conversionRate: 0,
    activeReferrals: 0,
  })
  const [referrals, setReferrals] = useState(mockAffiliateData.referrals)
  const [transactions, setTransactions] = useState(mockAffiliateData.transactions)
  const [marketingMaterials, setMarketingMaterials] = useState(mockAffiliateData.marketingMaterials)
  const [paymentMethod, setPaymentMethod] = useState("")
  const [paymentDetails, setPaymentDetails] = useState("")
  const [withdrawAmount, setWithdrawAmount] = useState(0)
  const [isWithdrawing, setIsWithdrawing] = useState(false)

  useEffect(() => {
    if (isAuthenticated && user) {
      // Gerar links de afiliado baseados no nome de usuário
      const username = user.username || (user.email ? user.email.split("@")[0] : "usuario")
      const domain = window.location.hostname
      const baseUrl = `https://${domain}`

      setAffiliateLinks({
        main: `${baseUrl}?ref=${username}`,
        jifu: config.affiliateLinks?.jifuAffiliateLink || "https://shop.jifu.com/ricardogarcia/one-enrollment?eslug=livecustomer",
        scanner: `${baseUrl}/scanner?ref=${username}`,
        copytrading: `${baseUrl}/copytrading?ref=${username}`,
      })

      // Simular carregamento de estatísticas
      // Em uma implementação real, isso viria de uma API
      const mockClicks = Math.floor(Math.random() * 200) + 50
      const mockSignups = Math.floor(Math.random() * 20) + 5
      const mockEarnings = Math.floor(Math.random() * 500) + 100
      const mockPendingPayments = Math.floor(Math.random() * 200) + 50

      setStats({
        clicks: mockClicks,
        signups: mockSignups,
        earnings: mockEarnings,
        pendingPayments: mockPendingPayments,
        conversionRate: Math.round((mockSignups / mockClicks) * 100),
        activeReferrals: mockAffiliateData.referrals.filter((r) => r.status === "Ativo").length,
      })
    }
  }, [isAuthenticated, user, config.affiliateLinks?.jifuAffiliateLink])

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast({
          title: "Link copiado!",
          description: "O link foi copiado para a área de transferência.",
        })
      })
      .catch((err) => {
        console.error("Erro ao copiar: ", err)
        toast({
          title: "Erro ao copiar",
          description: "Não foi possível copiar o link. Tente novamente.",
          variant: "destructive",
        })
      })
  }

  const handleWithdraw = () => {
    if (!paymentMethod) {
      toast({
        title: "Método de pagamento necessário",
        description: "Por favor, selecione um método de pagamento.",
        variant: "destructive",
      })
      return
    }

    if (!paymentDetails) {
      toast({
        title: "Detalhes de pagamento necessários",
        description: "Por favor, forneça os detalhes para o pagamento.",
        variant: "destructive",
      })
      return
    }

    if (withdrawAmount <= 0) {
      toast({
        title: "Valor inválido",
        description: "O valor de saque deve ser maior que zero.",
        variant: "destructive",
      })
      return
    }

    if (withdrawAmount > stats.earnings - stats.pendingPayments) {
      toast({
        title: "Saldo insuficiente",
        description: "Você não tem saldo suficiente para este saque.",
        variant: "destructive",
      })
      return
    }

    setIsWithdrawing(true)

    // Simulação de processamento
    setTimeout(() => {
      // Atualizar saldo
      setStats((prev) => ({
        ...prev,
        pendingPayments: prev.pendingPayments + withdrawAmount,
      }))

      // Adicionar nova transação
      const newTransaction = {
        id: transactions.length + 1,
        date: new Date().toISOString().split("T")[0],
        description: `Solicitação de Saque - ${paymentMethod}`,
        status: "Processando",
        amount: -withdrawAmount,
      }

      setTransactions([newTransaction, ...transactions])

      toast({
        title: "Solicitação enviada",
        description: "Sua solicitação de saque foi enviada com sucesso e está sendo processada.",
      })

      setIsWithdrawing(false)
      setWithdrawAmount(0)
    }, 2000)
  }

  const generateReferralLink = (baseLink, campaign) => {
    const username = user?.username || (user?.email ? user.email.split("@")[0] : "usuario")
    return `${baseLink}${baseLink.includes("?") ? "&" : "?"}ref=${username}&utm_source=affiliate&utm_medium=referral&utm_campaign=${campaign}`
  }

  if (!isAuthenticated) {
    return <MembershipRequired />
  }

  // Verificar se o programa de afiliados está ativo
  if (!config.affiliateProgram?.enabled) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-6">Programa de Afiliados</h1>
        <Card>
          <CardContent className="p-8">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-yellow-500/20 flex items-center justify-center">
                <FileText className="h-8 w-8 text-yellow-500" />
              </div>
              <h2 className="text-xl font-semibold">Programa Temporariamente Indisponível</h2>
              <p className="text-gray-400 max-w-md text-center">
                O programa de afiliados está temporariamente desativado. Por favor, volte mais tarde ou entre em contato
                com o suporte para mais informações.
              </p>
              <Button onClick={() => router.push("/")} className="mt-4">
                Voltar para a Página Inicial
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Painel de Afiliados</h1>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-5">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="links">Meus Links</TabsTrigger>
          <TabsTrigger value="referrals">Indicados</TabsTrigger>
          <TabsTrigger value="earnings">Ganhos</TabsTrigger>
          <TabsTrigger value="materials">Materiais</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Cliques Totais</CardTitle>
                <Users className="h-4 w-4 text-gold-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.clicks}</div>
                <p className="text-xs text-muted-foreground">+{Math.floor(Math.random() * 10)}% desde o último mês</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Cadastros</CardTitle>
                <Users className="h-4 w-4 text-gold-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.signups}</div>
                <p className="text-xs text-muted-foreground">Taxa de Conversão: {stats.conversionRate}%</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ganhos Totais</CardTitle>
                <DollarSign className="h-4 w-4 text-gold-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">€{stats.earnings}</div>
                <p className="text-xs text-muted-foreground">Disponível: €{stats.earnings - stats.pendingPayments}</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Desempenho Recente</CardTitle>
                <CardDescription>Visão geral dos últimos 30 dias</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center bg-black/20 rounded-md border border-gray-800">
                  <BarChart3 className="h-16 w-16 text-gray-500" />
                  <span className="ml-2 text-gray-500">Gráfico de Desempenho</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Seu Link Principal</CardTitle>
                <CardDescription>Compartilhe para ganhar comissões</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <Input value={affiliateLinks.main} readOnly className="flex-1 text-xs" />
                  <Button variant="outline" size="icon" onClick={() => copyToClipboard(affiliateLinks.main)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>

                <div className="mt-4">
                  <h3 className="text-sm font-medium mb-2">Compartilhar</h3>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() =>
                        window.open(
                          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(affiliateLinks.main)}`,
                          "_blank",
                        )
                      }
                    >
                      <svg
                        className="h-4 w-4 mr-2"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.19795 21.5H13.198V13.4901H16.8021L17.198 9.50977H13.198V7.5C13.198 6.94772 13.6457 6.5 14.198 6.5H17.198V2.5H14.198C11.4365 2.5 9.19795 4.73858 9.19795 7.5V9.50977H7.19795L6.80206 13.4901H9.19795V21.5Z"></path>
                      </svg>
                      Facebook
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() =>
                        window.open(
                          `https://twitter.com/intent/tweet?url=${encodeURIComponent(affiliateLinks.main)}&text=${encodeURIComponent("Confira esta plataforma incrível de trading e investimentos!")}`,
                          "_blank",
                        )
                      }
                    >
                      <svg
                        className="h-4 w-4 mr-2"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M22 5.89998C21.26 6.20998 20.46 6.41998 19.64 6.50998C20.49 6.00998 21.14 5.24998 21.44 4.34998C20.64 4.79998 19.74 5.12998 18.79 5.29998C18.03 4.54998 16.97 4.09998 15.79 4.09998C13.53 4.09998 11.71 5.92998 11.71 8.17998C11.71 8.48998 11.74 8.78998 11.8 9.06998C8.34 8.89998 5.27 7.28998 3.2 4.89998C2.87 5.48998 2.68 6.17998 2.68 6.89998C2.68 8.28998 3.39 9.51998 4.46 10.2C3.79 10.2 3.16 10.02 2.61 9.73998V9.78998C2.61 11.76 4 13.42 5.84 13.79C5.52 13.88 5.17 13.92 4.81 13.92C4.56 13.92 4.31 13.9 4.07 13.86C4.56 15.5 6.09 16.7 7.9 16.73C6.47 17.85 4.7 18.51 2.78 18.51C2.47 18.51 2.16 18.49 1.85 18.45C3.68 19.65 5.86 20.33 8.2 20.33C15.78 20.33 19.96 14 19.96 8.47998C19.96 8.30998 19.96 8.13998 19.95 7.96998C20.76 7.39998 21.45 6.69998 22 5.89998Z"></path>
                      </svg>
                      Twitter
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Últimas Transações</CardTitle>
              <CardDescription>Suas transações mais recentes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md">
                <div className="grid grid-cols-4 gap-4 p-4 font-medium border-b">
                  <div>Data</div>
                  <div>Descrição</div>
                  <div>Status</div>
                  <div className="text-right">Valor</div>
                </div>
                <div className="divide-y">
                  {transactions.slice(0, 3).map((transaction) => (
                    <div key={transaction.id} className="grid grid-cols-4 gap-4 p-4">
                      <div>{transaction.date}</div>
                      <div>{transaction.description}</div>
                      <div>{transaction.status}</div>
                      <div className={`text-right ${transaction.amount > 0 ? "text-green-500" : "text-gray-400"}`}>
                        €{transaction.amount}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full mt-4"
                onClick={() => document.querySelector('[data-value="earnings"]').click()}
              >
                Ver Todas as Transações
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="links">
          <Card>
            <CardHeader>
              <CardTitle>Meus Links de Afiliado</CardTitle>
              <CardDescription>Gerencie seus links de afiliado para diferentes produtos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="main-link">Link Principal</Label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Input id="main-link" value={affiliateLinks.main} readOnly className="flex-1" />
                    <Button variant="outline" size="icon" onClick={() => copyToClipboard(affiliateLinks.main)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => window.open(affiliateLinks.main, "_blank")}>
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Link para a página inicial com seu código de afiliado.</p>
                </div>

                <div>
                  <Label htmlFor="jifu-link">Link JIFU</Label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Input id="jifu-link" value={affiliateLinks.jifu} readOnly className="flex-1" />
                    <Button variant="outline" size="icon" onClick={() => copyToClipboard(affiliateLinks.jifu)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => window.open(affiliateLinks.jifu, "_blank")}>
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Link para registro na plataforma JIFU.</p>
                </div>

                <div>
                  <Label htmlFor="scanner-link">Link Scanner MTM</Label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Input id="scanner-link" value={affiliateLinks.scanner} readOnly className="flex-1" />
                    <Button variant="outline" size="icon" onClick={() => copyToClipboard(affiliateLinks.scanner)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => window.open(affiliateLinks.scanner, "_blank")}>
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Link direto para a página do Scanner MTM.</p>
                </div>

                <div>
                  <Label htmlFor="copytrading-link">Link Copytrading</Label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Input id="copytrading-link" value={affiliateLinks.copytrading} readOnly className="flex-1" />
                    <Button variant="outline" size="icon" onClick={() => copyToClipboard(affiliateLinks.copytrading)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => window.open(affiliateLinks.copytrading, "_blank")}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Link direto para a página de Copytrading.</p>
                </div>

                <div className="bg-black/30 p-4 rounded-lg border border-gold-500/20">
                  <h3 className="text-lg font-medium mb-2">Gerador de Links</h3>
                  <p className="text-sm text-gray-400 mb-4">
                    Crie links personalizados para campanhas específicas com parâmetros UTM.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label htmlFor="base-url">URL Base</Label>
                      <select id="base-url" className="w-full mt-1 p-2 rounded-md border border-gray-700 bg-black/50">
                        <option value={window.location.origin}>Página Inicial</option>
                        <option value={`${window.location.origin}/scanner`}>Scanner</option>
                        <option value={`${window.location.origin}/copytrading`}>Copytrading</option>
                        <option value={`${window.location.origin}/jifu-education`}>Educação JIFU</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="campaign">Campanha</Label>
                      <select id="campaign" className="w-full mt-1 p-2 rounded-md border border-gray-700 bg-black/50">
                        <option value="general">Geral</option>
                        <option value="scanner">Scanner</option>
                        <option value="jifu">JIFU</option>
                        <option value="copytrading">Copytrading</option>
                        <option value="blackfriday">Black Friday</option>
                      </select>
                    </div>
                  </div>

                  <Button
                    className="w-full bg-gold-600 hover:bg-gold-700 text-black"
                    onClick={() => {
                      const baseUrl = document.getElementById("base-url").value
                      const campaign = document.getElementById("campaign").value
                      const generatedLink = generateReferralLink(baseUrl, campaign)
                      copyToClipboard(generatedLink)
                    }}
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Gerar e Copiar Link
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="referrals">
          <Card>
            <CardHeader>
              <CardTitle>Seus Indicados</CardTitle>
              <CardDescription>Lista de pessoas que se registraram usando seu link</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md">
                <div className="grid grid-cols-5 gap-4 p-4 font-medium border-b">
                  <div>Nome</div>
                  <div>Email</div>
                  <div>Data</div>
                  <div>Status</div>
                  <div className="text-right">Comissão</div>
                </div>
                <div className="divide-y">
                  {referrals.map((referral) => (
                    <div key={referral.id} className="grid grid-cols-5 gap-4 p-4">
                      <div>{referral.name}</div>
                      <div>{referral.email}</div>
                      <div>{referral.date}</div>
                      <div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            referral.status === "Ativo"
                              ? "bg-green-500/20 text-green-500"
                              : referral.status === "Pendente"
                                ? "bg-yellow-500/20 text-yellow-500"
                                : "bg-gray-500/20 text-gray-500"
                          }`}
                        >
                          {referral.status}
                        </span>
                      </div>
                      <div className="text-right">€{referral.commission}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 bg-black/30 p-4 rounded-lg border border-gold-500/20">
                <h3 className="text-lg font-medium mb-2">Programa de Afiliados</h3>
                <p className="text-sm text-gray-400 mb-4">Informações sobre o programa de afiliados e comissões.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Taxas de Comissão</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex justify-between">
                        <span>Nível 1 (Direto):</span>
                        <span className="font-bold text-gold-500">
                          {config.affiliateProgram?.commissionRates.level1 || 10}%
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span>Nível 2 (Indireto):</span>
                        <span className="font-bold text-gold-500">
                          {config.affiliateProgram?.commissionRates.level2 || 5}%
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Pagamentos</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex justify-between">
                        <span>Valor mínimo para saque:</span>
                        <span className="font-bold">€{config.affiliateProgram?.payoutThreshold || 50}</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Métodos de pagamento:</span>
                        <span className="font-bold">
                          {config.affiliateProgram?.paymentMethods.join(", ") || "PayPal, Transferência Bancária"}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="earnings">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Resumo Financeiro</CardTitle>
                <CardDescription>Visão geral dos seus ganhos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-gray-800">
                    <span>Ganhos Totais:</span>
                    <span className="text-xl font-bold">€{stats.earnings}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-800">
                    <span>Pagamentos Pendentes:</span>
                    <span className="text-xl font-bold">€{stats.pendingPayments}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-800">
                    <span>Saldo Disponível:</span>
                    <span className="text-xl font-bold text-gold-500">€{stats.earnings - stats.pendingPayments}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Próximo Pagamento:</span>
                    <span className="text-xl font-bold">Em 15 dias</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Solicitar Pagamento</CardTitle>
                <CardDescription>Solicite o pagamento dos seus ganhos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="payment-method">Método de Pagamento</Label>
                    <select
                      id="payment-method"
                      className="w-full mt-1 p-2 rounded-md border border-gray-700 bg-black/50"
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                      <option value="">Selecione um método</option>
                      {config.affiliateProgram?.paymentMethods.map((method) => (
                        <option key={method} value={method}>
                          {method}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="payment-details">Detalhes do Pagamento</Label>
                    <Input
                      id="payment-details"
                      placeholder={
                        paymentMethod === "PayPal"
                          ? "Email do PayPal"
                          : paymentMethod === "Transferência Bancária"
                            ? "IBAN"
                            : paymentMethod === "Crypto"
                              ? "Endereço da Carteira"
                              : "Detalhes para pagamento"
                      }
                      value={paymentDetails}
                      onChange={(e) => setPaymentDetails(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="withdraw-amount">Valor (€)</Label>
                    <Input
                      id="withdraw-amount"
                      type="number"
                      min={config.affiliateProgram?.payoutThreshold || 50}
                      max={stats.earnings - stats.pendingPayments}
                      value={withdrawAmount || ""}
                      onChange={(e) => setWithdrawAmount(Number.parseFloat(e.target.value))}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Valor mínimo: €{config.affiliateProgram?.payoutThreshold || 50}
                    </p>
                  </div>

                  <Button
                    className="w-full bg-gold-600 hover:bg-gold-700 text-black"
                    disabled={
                      isWithdrawing ||
                      withdrawAmount <= 0 ||
                      withdrawAmount > stats.earnings - stats.pendingPayments ||
                      !paymentMethod ||
                      !paymentDetails
                    }
                    onClick={handleWithdraw}
                  >
                    {isWithdrawing ? "Processando..." : "Solicitar Pagamento"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Histórico de Transações</CardTitle>
              <CardDescription>Todas as suas transações</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md">
                <div className="grid grid-cols-4 gap-4 p-4 font-medium border-b">
                  <div>Data</div>
                  <div>Descrição</div>
                  <div>Status</div>
                  <div className="text-right">Valor</div>
                </div>
                <div className="divide-y">
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="grid grid-cols-4 gap-4 p-4">
                      <div>{transaction.date}</div>
                      <div>{transaction.description}</div>
                      <div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            transaction.status === "Pago"
                              ? "bg-green-500/20 text-green-500"
                              : transaction.status === "Pendente"
                                ? "bg-yellow-500/20 text-yellow-500"
                                : transaction.status === "Processando"
                                  ? "bg-blue-500/20 text-blue-500"
                                  : "bg-gray-500/20 text-gray-500"
                          }`}
                        >
                          {transaction.status}
                        </span>
                      </div>
                      <div className={`text-right ${transaction.amount > 0 ? "text-green-500" : "text-gray-400"}`}>
                        €{transaction.amount}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="materials">
          <Card>
            <CardHeader>
              <CardTitle>Materiais de Marketing</CardTitle>
              <CardDescription>Acesse banners, vídeos e outros materiais para promover os produtos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {marketingMaterials.map((material) => (
                  <Card key={material.id}>
                    <CardContent className="p-4">
                      <div className="aspect-video bg-gray-800 rounded-md mb-2 flex items-center justify-center overflow-hidden">
                        {material.type === "banner" ? (
                          <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                            <span className="text-gray-400">Banner {material.size}</span>
                          </div>
                        ) : material.type === "video" ? (
                          <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                            <span className="text-gray-400">Vídeo Promocional</span>
                          </div>
                        ) : material.type === "email" ? (
                          <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                            <span className="text-gray-400">Template de Email</span>
                          </div>
                        ) : (
                          <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                            <span className="text-gray-400">Documento PDF</span>
                          </div>
                        )}
                      </div>
                      <h3 className="font-medium">{material.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {material.size && `${material.size} - `}Campanha {material.campaign}
                      </p>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Copy className="h-4 w-4 mr-2" />
                          Copiar Link
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-8 bg-black/30 p-4 rounded-lg border border-gold-500/20">
                <h3 className="text-lg font-medium mb-2">Dicas para Afiliados</h3>
                <p className="text-sm text-gray-400 mb-4">
                  Maximize seus ganhos com estas dicas para promover os produtos.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="h-8 w-8 rounded-full bg-gold-500/20 flex items-center justify-center shrink-0 mr-4 mt-0.5">
                      <span className="text-gold-500 font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Use Redes Sociais</h4>
                      <p className="text-gray-400">
                        Compartilhe seus links de afiliado em suas redes sociais, especialmente em grupos relacionados a
                        trading e investimentos.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="h-8 w-8 rounded-full bg-gold-500/20 flex items-center justify-center shrink-0 mr-4 mt-0.5">
                      <span className="text-gold-500 font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Crie Conteúdo Educativo</h4>
                      <p className="text-gray-400">
                        Blogs, vídeos e tutoriais sobre trading e investimentos podem atrair mais pessoas para seus
                        links.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="h-8 w-8 rounded-full bg-gold-500/20 flex items-center justify-center shrink-0 mr-4 mt-0.5">
                      <span className="text-gold-500 font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Use Email Marketing</h4>
                      <p className="text-gray-400">
                        Se você tem uma lista de emails, envie newsletters com seus links de afiliado.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
