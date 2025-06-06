"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Search, Download, Eye, Check, X, Clock, Euro, FileText, AlertCircle, CheckCircle, XCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import type { CommissionHistory } from "@/lib/affiliate-system"
import { updateCommissionStatus, bulkUpdateCommissions, getCommissionHistory } from "@/app/actions/commission-actions"

interface CommissionStats {
  total: number
  pending: number
  paid: number
  cancelled: number
  totalAmount: number
  pendingAmount: number
  paidAmount: number
}

// Função utilitária para calcular estatísticas
function calculateCommissionStats(commissions: CommissionHistory[]): CommissionStats {
  return {
    total: commissions.length,
    pending: commissions.filter((c) => c.status === "pending").length,
    paid: commissions.filter((c) => c.status === "paid").length,
    cancelled: commissions.filter((c) => c.status === "cancelled").length,
    totalAmount: commissions.reduce((sum, c) => sum + c.amount, 0),
    pendingAmount: commissions.filter((c) => c.status === "pending").reduce((sum, c) => sum + c.amount, 0),
    paidAmount: commissions.filter((c) => c.status === "paid").reduce((sum, c) => sum + c.amount, 0),
  }
}

export default function AffiliateCommissionsPage() {
  const { toast } = useToast()
  const [commissions, setCommissions] = useState<CommissionHistory[]>([])
  const [filteredCommissions, setFilteredCommissions] = useState<CommissionHistory[]>([])
  const [selectedCommissions, setSelectedCommissions] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [dateFilter, setDateFilter] = useState<string>("all")
  const [selectedCommission, setSelectedCommission] = useState<CommissionHistory | null>(null)
  const [bulkAction, setBulkAction] = useState<string>("")
  const [stats, setStats] = useState<CommissionStats>({
    total: 0,
    pending: 0,
    paid: 0,
    cancelled: 0,
    totalAmount: 0,
    pendingAmount: 0,
    paidAmount: 0,
  })
  const [loading, setLoading] = useState(true)
  const [actionInProgress, setActionInProgress] = useState(false)

  // Carregar dados
  useEffect(() => {
    loadCommissions()
  }, [])

  // Filtrar comissões
  useEffect(() => {
    filterCommissions()
  }, [commissions, searchTerm, statusFilter, dateFilter])

  const loadCommissions = async () => {
    setLoading(true)
    try {
      const data = await getCommissionHistory()
      setCommissions(data)
      const newStats = calculateCommissionStats(data)
      setStats(newStats)
    } catch (error) {
      console.error("Error loading commissions:", error)
      toast({
        title: "Erro ao carregar comissões",
        description: "Não foi possível carregar os dados das comissões.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const filterCommissions = () => {
    let filtered = [...commissions]

    // Filtro por texto
    if (searchTerm) {
      filtered = filtered.filter(
        (commission) =>
          commission.affiliateUsername.toLowerCase().includes(searchTerm.toLowerCase()) ||
          commission.customerUsername.toLowerCase().includes(searchTerm.toLowerCase()) ||
          commission.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          commission.id.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filtro por status
    if (statusFilter !== "all") {
      filtered = filtered.filter((commission) => commission.status === statusFilter)
    }

    // Filtro por data
    if (dateFilter !== "all") {
      const now = new Date()
      const filterDate = new Date()

      switch (dateFilter) {
        case "today":
          filterDate.setHours(0, 0, 0, 0)
          filtered = filtered.filter((commission) => new Date(commission.date) >= filterDate)
          break
        case "week":
          filterDate.setDate(now.getDate() - 7)
          filtered = filtered.filter((commission) => new Date(commission.date) >= filterDate)
          break
        case "month":
          filterDate.setMonth(now.getMonth() - 1)
          filtered = filtered.filter((commission) => new Date(commission.date) >= filterDate)
          break
      }
    }

    setFilteredCommissions(filtered)
  }

  const handleStatusUpdate = async (commissionId: string, newStatus: "pending" | "paid" | "cancelled") => {
    setActionInProgress(true)
    try {
      const result = await updateCommissionStatus(commissionId, newStatus)

      if (result.success) {
        // Atualizar estado local
        const updatedCommissions = commissions.map((commission) => {
          if (commission.id === commissionId) {
            return { ...commission, status: newStatus }
          }
          return commission
        })

        setCommissions(updatedCommissions)
        setStats(calculateCommissionStats(updatedCommissions))

        toast({
          title: "Status atualizado",
          description: result.message,
        })
      } else {
        toast({
          title: "Erro ao atualizar status",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error updating commission status:", error)
      toast({
        title: "Erro ao atualizar status",
        description: "Ocorreu um erro ao processar sua solicitação.",
        variant: "destructive",
      })
    } finally {
      setActionInProgress(false)
    }
  }

  const handleBulkAction = async () => {
    if (!bulkAction || selectedCommissions.length === 0) return

    setActionInProgress(true)
    try {
      const result = await bulkUpdateCommissions(selectedCommissions, bulkAction as "pending" | "paid" | "cancelled")

      if (result.success) {
        // Atualizar estado local
        const updatedCommissions = commissions.map((commission) => {
          if (selectedCommissions.includes(commission.id)) {
            return { ...commission, status: bulkAction as "pending" | "paid" | "cancelled" }
          }
          return commission
        })

        setCommissions(updatedCommissions)
        setStats(calculateCommissionStats(updatedCommissions))
        setSelectedCommissions([])
        setBulkAction("")

        toast({
          title: "Ações em lote concluídas",
          description: result.message,
        })
      } else {
        toast({
          title: "Erro nas ações em lote",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error performing bulk action:", error)
      toast({
        title: "Erro nas ações em lote",
        description: "Ocorreu um erro ao processar sua solicitação.",
        variant: "destructive",
      })
    } finally {
      setActionInProgress(false)
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedCommissions(filteredCommissions.map((c) => c.id))
    } else {
      setSelectedCommissions([])
    }
  }

  const handleSelectCommission = (commissionId: string, checked: boolean) => {
    if (checked) {
      setSelectedCommissions([...selectedCommissions, commissionId])
    } else {
      setSelectedCommissions(selectedCommissions.filter((id) => id !== commissionId))
    }
  }

  const exportToCSV = () => {
    const csvContent = [
      ["ID", "Afiliado", "Cliente", "Produto", "Valor", "Status", "Data"].join(","),
      ...filteredCommissions.map((commission) =>
        [
          commission.id,
          commission.affiliateUsername,
          commission.customerUsername,
          commission.productName,
          `€${commission.amount.toFixed(2)}`,
          commission.status,
          new Date(commission.date).toLocaleDateString("pt-PT"),
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `comissoes_${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="text-yellow-600 border-yellow-600">
            <Clock className="w-3 h-3 mr-1" />
            Pendente
          </Badge>
        )
      case "paid":
        return (
          <Badge variant="outline" className="text-green-600 border-green-600">
            <CheckCircle className="w-3 h-3 mr-1" />
            Paga
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="outline" className="text-red-600 border-red-600">
            <XCircle className="w-3 h-3 mr-1" />
            Cancelada
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gold-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Gestão de Comissões</h1>
          <p className="text-gray-400">Gerir e monitorizar todas as comissões de afiliados</p>
        </div>
        <Button onClick={exportToCSV} className="bg-gold-500 hover:bg-gold-600">
          <Download className="w-4 h-4 mr-2" />
          Exportar CSV
        </Button>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Total de Comissões</p>
                <p className="text-2xl font-bold text-white">{stats.total}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Valor Total</p>
                <p className="text-2xl font-bold text-white">€{stats.totalAmount.toFixed(2)}</p>
              </div>
              <Euro className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Pendentes</p>
                <p className="text-2xl font-bold text-white">{stats.pending}</p>
                <p className="text-sm text-yellow-500">€{stats.pendingAmount.toFixed(2)}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Pagas</p>
                <p className="text-2xl font-bold text-white">{stats.paid}</p>
                <p className="text-sm text-green-500">€{stats.paidAmount.toFixed(2)}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros e Ações */}
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar por afiliado, cliente, produto ou ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-700 border-gray-600 text-white"
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px] bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Status</SelectItem>
                  <SelectItem value="pending">Pendentes</SelectItem>
                  <SelectItem value="paid">Pagas</SelectItem>
                  <SelectItem value="cancelled">Canceladas</SelectItem>
                </SelectContent>
              </Select>

              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-full sm:w-[180px] bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Períodos</SelectItem>
                  <SelectItem value="today">Hoje</SelectItem>
                  <SelectItem value="week">Última Semana</SelectItem>
                  <SelectItem value="month">Último Mês</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {selectedCommissions.length > 0 && (
              <div className="flex gap-2">
                <Select value={bulkAction} onValueChange={setBulkAction}>
                  <SelectTrigger className="w-[180px] bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Ação em lote" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paid">Marcar como Paga</SelectItem>
                    <SelectItem value="pending">Marcar como Pendente</SelectItem>
                    <SelectItem value="cancelled">Marcar como Cancelada</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  onClick={handleBulkAction}
                  disabled={!bulkAction || actionInProgress}
                  className="bg-gold-500 hover:bg-gold-600"
                >
                  {actionInProgress ? "Processando..." : `Aplicar (${selectedCommissions.length})`}
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Comissões */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Comissões ({filteredCommissions.length})</CardTitle>
          <CardDescription>Lista completa de todas as comissões de afiliados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-700">
                  <TableHead className="w-12">
                    <Checkbox
                      checked={
                        selectedCommissions.length === filteredCommissions.length && filteredCommissions.length > 0
                      }
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="text-gray-300">ID</TableHead>
                  <TableHead className="text-gray-300">Afiliado</TableHead>
                  <TableHead className="text-gray-300">Cliente</TableHead>
                  <TableHead className="text-gray-300">Produto</TableHead>
                  <TableHead className="text-gray-300">Valor</TableHead>
                  <TableHead className="text-gray-300">Status</TableHead>
                  <TableHead className="text-gray-300">Data</TableHead>
                  <TableHead className="text-gray-300">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCommissions.map((commission) => (
                  <TableRow key={commission.id} className="border-gray-700">
                    <TableCell>
                      <Checkbox
                        checked={selectedCommissions.includes(commission.id)}
                        onCheckedChange={(checked) => handleSelectCommission(commission.id, checked as boolean)}
                      />
                    </TableCell>
                    <TableCell className="text-white font-mono text-sm">{commission.id}</TableCell>
                    <TableCell className="text-white">{commission.affiliateUsername}</TableCell>
                    <TableCell className="text-white">{commission.customerUsername}</TableCell>
                    <TableCell className="text-white">
                      <div className="max-w-[200px] truncate" title={commission.productName}>
                        {commission.productName}
                      </div>
                    </TableCell>
                    <TableCell className="text-white font-semibold">€{commission.amount.toFixed(2)}</TableCell>
                    <TableCell>{getStatusBadge(commission.status)}</TableCell>
                    <TableCell className="text-gray-300">
                      {new Date(commission.date).toLocaleDateString("pt-PT")}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedCommission(commission)}
                              className="border-gray-600 text-gray-300 hover:bg-gray-700"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-gray-800 border-gray-700 text-white">
                            <DialogHeader>
                              <DialogTitle>Detalhes da Comissão</DialogTitle>
                              <DialogDescription>
                                Informações completas sobre a comissão {selectedCommission?.id}
                              </DialogDescription>
                            </DialogHeader>
                            {selectedCommission && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label className="text-gray-300">ID da Comissão</Label>
                                    <p className="font-mono text-sm">{selectedCommission.id}</p>
                                  </div>
                                  <div>
                                    <Label className="text-gray-300">Status</Label>
                                    <div className="mt-1">{getStatusBadge(selectedCommission.status)}</div>
                                  </div>
                                  <div>
                                    <Label className="text-gray-300">Afiliado</Label>
                                    <p>{selectedCommission.affiliateUsername}</p>
                                  </div>
                                  <div>
                                    <Label className="text-gray-300">Cliente</Label>
                                    <p>{selectedCommission.customerUsername}</p>
                                  </div>
                                  <div className="col-span-2">
                                    <Label className="text-gray-300">Produto</Label>
                                    <p>{selectedCommission.productName}</p>
                                  </div>
                                  <div>
                                    <Label className="text-gray-300">Valor da Comissão</Label>
                                    <p className="text-xl font-semibold text-green-500">
                                      €{selectedCommission.amount.toFixed(2)}
                                    </p>
                                  </div>
                                  <div>
                                    <Label className="text-gray-300">Data</Label>
                                    <p>{new Date(selectedCommission.date).toLocaleString("pt-PT")}</p>
                                  </div>
                                </div>

                                <div className="flex gap-2 pt-4">
                                  <Button
                                    onClick={() => handleStatusUpdate(selectedCommission.id, "paid")}
                                    className="bg-green-600 hover:bg-green-700"
                                    disabled={selectedCommission.status === "paid" || actionInProgress}
                                  >
                                    <Check className="w-4 h-4 mr-2" />
                                    {actionInProgress ? "Processando..." : "Marcar como Paga"}
                                  </Button>
                                  <Button
                                    onClick={() => handleStatusUpdate(selectedCommission.id, "cancelled")}
                                    variant="destructive"
                                    disabled={selectedCommission.status === "cancelled" || actionInProgress}
                                  >
                                    <X className="w-4 h-4 mr-2" />
                                    {actionInProgress ? "Processando..." : "Cancelar"}
                                  </Button>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>

                        {commission.status === "pending" && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleStatusUpdate(commission.id, "paid")}
                              disabled={actionInProgress}
                              className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                            >
                              <Check className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleStatusUpdate(commission.id, "cancelled")}
                              disabled={actionInProgress}
                              className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredCommissions.length === 0 && (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400">Nenhuma comissão encontrada</p>
              <p className="text-sm text-gray-500">Tente ajustar os filtros de pesquisa</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
