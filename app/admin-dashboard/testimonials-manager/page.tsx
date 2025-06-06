"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, Edit, Trash2, Upload, Star, TrendingUp, Users, MessageSquare, ImageIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast"
import {
  getTestimonials,
  saveTestimonials,
  toggleFeatured,
  toggleVerified,
  type Testimonial,
} from "@/lib/testimonials-service"

export default function TestimonialsManagerPage() {
  const { user, isAuthenticated, isAdmin } = useAuth()
  const router = useRouter()
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRating, setFilterRating] = useState<number | null>(null)
  const [stats, setStats] = useState({
    total: 0,
    featured: 0,
    verified: 0,
    avgRating: 0,
    avgProfit: 0,
  })

  const [formData, setFormData] = useState<Partial<Testimonial>>({
    name: "",
    role: "",
    company: "",
    image: "",
    content: "",
    rating: 5,
    profitPercentage: 0,
    monthlyReturn: 0,
    investmentAmount: 0,
    tradingPeriod: "",
    location: "",
    verified: false,
    featured: false,
  })

  // Verificar autenticação
  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      router.push("/admin-login")
    }
  }, [isAuthenticated, isAdmin, router])

  // Carregar testemunhos
  useEffect(() => {
    loadTestimonials()
  }, [])

  // Calcular estatísticas
  useEffect(() => {
    const total = testimonials.length
    const featured = testimonials.filter((t) => t.featured).length
    const verified = testimonials.filter((t) => t.verified).length
    const avgRating =
      testimonials.length > 0 ? testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length : 0
    const avgProfit =
      testimonials.length > 0
        ? testimonials.reduce((sum, t) => sum + (t.profitPercentage || 0), 0) / testimonials.length
        : 0

    setStats({ total, featured, verified, avgRating, avgProfit })
  }, [testimonials])

  const loadTestimonials = () => {
    try {
      const loadedTestimonials = getTestimonials()
      setTestimonials(loadedTestimonials)
    } catch (error) {
      console.error("Erro ao carregar testemunhos:", error)
      toast({
        title: "Erro",
        description: "Não foi possível carregar os testemunhos",
        variant: "destructive",
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (editingTestimonial) {
        // Editar testemunho existente
        const updatedTestimonials = testimonials.map((t) =>
          t.id === editingTestimonial.id ? ({ ...formData, id: t.id, updatedAt: new Date() } as Testimonial) : t,
        )
        saveTestimonials(updatedTestimonials)
        setTestimonials(updatedTestimonials)
      } else {
        // Criar novo testemunho
        const newTestimonial: Testimonial = {
          ...formData,
          id: Date.now().toString(),
          createdAt: new Date(),
        } as Testimonial

        const updatedTestimonials = [...testimonials, newTestimonial]
        saveTestimonials(updatedTestimonials)
        setTestimonials(updatedTestimonials)
      }

      resetForm()
      setIsDialogOpen(false)
      toast({
        title: "Sucesso",
        description: editingTestimonial ? "Testemunho atualizado com sucesso" : "Testemunho adicionado com sucesso",
      })
    } catch (error) {
      console.error("Erro ao salvar testemunho:", error)
      toast({
        title: "Erro",
        description: "Não foi possível salvar o testemunho",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial)
    setFormData({
      ...testimonial,
      // Garantir que todos os campos estejam presentes
      profit: testimonial.profit || "",
      timeframe: testimonial.timeframe || testimonial.tradingPeriod || "",
      avatar: testimonial.avatar || testimonial.image || "",
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este testemunho?")) {
      const updatedTestimonials = testimonials.filter((t) => t.id !== id)
      saveTestimonials(updatedTestimonials)
      setTestimonials(updatedTestimonials)
      toast({
        title: "Sucesso",
        description: "Testemunho excluído com sucesso",
      })
    }
  }

  const handleToggleFeatured = (id: string) => {
    const result = toggleFeatured(id)
    if (result) {
      loadTestimonials()
      toast({
        title: "Sucesso",
        description: `Testemunho ${result.featured ? "destacado" : "removido dos destaques"} com sucesso`,
      })
    }
  }

  const handleToggleVerified = (id: string) => {
    const result = toggleVerified(id)
    if (result) {
      loadTestimonials()
      toast({
        title: "Sucesso",
        description: `Testemunho ${result.verified ? "verificado" : "não verificado"} com sucesso`,
      })
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      role: "",
      company: "",
      image: "",
      content: "",
      rating: 5,
      profitPercentage: 0,
      monthlyReturn: 0,
      investmentAmount: 0,
      tradingPeriod: "",
      location: "",
      verified: false,
      featured: false,
    })
    setEditingTestimonial(null)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Em produção, aqui você faria upload para um serviço de storage
      // Por agora, vamos simular com um URL local
      const imageUrl = `/testimonials/${file.name}`
      setFormData((prev) => ({ ...prev, image: imageUrl }))
      toast({
        title: "Imagem carregada",
        description: `Imagem ${file.name} foi carregada com sucesso`,
      })
    }
  }

  const filteredTestimonials = testimonials.filter((testimonial) => {
    const matchesSearch =
      testimonial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testimonial.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRating = filterRating === null || testimonial.rating === filterRating
    return matchesSearch && matchesRating
  })

  if (!isAuthenticated || !isAdmin) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Gerenciar Testemunhos</h1>
          <p className="text-gray-400">Adicione, edite e gerencie os testemunhos dos clientes</p>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card className="bg-black/50 border-gray-800/50 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Total</p>
                  <p className="text-2xl font-bold text-white">{stats.total}</p>
                </div>
                <MessageSquare className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-gray-800/50 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Em Destaque</p>
                  <p className="text-2xl font-bold text-white">{stats.featured}</p>
                </div>
                <Star className="h-8 w-8 text-gold-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-gray-800/50 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Verificados</p>
                  <p className="text-2xl font-bold text-white">{stats.verified}</p>
                </div>
                <Users className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-gray-800/50 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Avaliação Média</p>
                  <p className="text-2xl font-bold text-white">{stats.avgRating.toFixed(1)}</p>
                </div>
                <Star className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-gray-800/50 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Lucro Médio</p>
                  <p className="text-2xl font-bold text-white">{stats.avgProfit.toFixed(0)}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controles */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Input
              placeholder="Buscar testemunhos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>
          <select
            value={filterRating || ""}
            onChange={(e) => setFilterRating(e.target.value ? Number(e.target.value) : null)}
            className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
          >
            <option value="">Todas as avaliações</option>
            <option value="5">5 estrelas</option>
            <option value="4">4 estrelas</option>
            <option value="3">3 estrelas</option>
            <option value="2">2 estrelas</option>
            <option value="1">1 estrela</option>
          </select>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={resetForm}
                className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-black font-semibold"
              >
                <Plus className="h-4 w-4 mr-2" />
                Novo Testemunho
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl bg-gray-900 border-gray-700 text-white max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-white">
                  {editingTestimonial ? "Editar Testemunho" : "Novo Testemunho"}
                </DialogTitle>
                <DialogDescription className="text-gray-400">
                  {editingTestimonial ? "Edite as informações do testemunho" : "Adicione um novo testemunho de cliente"}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-white">
                      Nome *
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      required
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="role" className="text-white">
                      Função *
                    </Label>
                    <Input
                      id="role"
                      value={formData.role}
                      onChange={(e) => setFormData((prev) => ({ ...prev, role: e.target.value }))}
                      required
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="company" className="text-white">
                      Empresa
                    </Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location" className="text-white">
                      Localização
                    </Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="image" className="text-white">
                    Imagem
                  </Label>
                  <div className="flex items-center space-x-4">
                    <Input
                      id="image"
                      value={formData.image}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, image: e.target.value, avatar: e.target.value }))
                      }
                      placeholder="/testimonials/nome-arquivo.jpg"
                      className="bg-gray-800 border-gray-700 text-white flex-1"
                    />
                    <label className="cursor-pointer">
                      <Button type="button" variant="outline" className="border-gray-600 text-gray-300" asChild>
                        <span>
                          <Upload className="h-4 w-4 mr-2" />
                          Upload
                        </span>
                      </Button>
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    </label>
                  </div>
                  {formData.image && (
                    <div className="mt-2">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={formData.image || "/placeholder.svg"} alt="Preview" />
                        <AvatarFallback>
                          <ImageIcon />
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="content" className="text-white">
                    Testemunho *
                  </Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
                    required
                    rows={4}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="rating" className="text-white">
                      Avaliação *
                    </Label>
                    <select
                      id="rating"
                      value={formData.rating}
                      onChange={(e) => setFormData((prev) => ({ ...prev, rating: Number(e.target.value) }))}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                    >
                      <option value={5}>5 estrelas</option>
                      <option value={4}>4 estrelas</option>
                      <option value={3}>3 estrelas</option>
                      <option value={2}>2 estrelas</option>
                      <option value={1}>1 estrela</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="profitPercentage" className="text-white">
                      Lucro (%)
                    </Label>
                    <Input
                      id="profitPercentage"
                      type="number"
                      value={formData.profitPercentage}
                      onChange={(e) => {
                        const value = Number(e.target.value)
                        setFormData((prev) => ({
                          ...prev,
                          profitPercentage: value,
                          profit: `+${value} pips`,
                        }))
                      }}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="monthlyReturn" className="text-white">
                      Retorno Mensal (%)
                    </Label>
                    <Input
                      id="monthlyReturn"
                      type="number"
                      step="0.1"
                      value={formData.monthlyReturn}
                      onChange={(e) => setFormData((prev) => ({ ...prev, monthlyReturn: Number(e.target.value) }))}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="investmentAmount" className="text-white">
                      Valor Investido (€)
                    </Label>
                    <Input
                      id="investmentAmount"
                      type="number"
                      value={formData.investmentAmount}
                      onChange={(e) => setFormData((prev) => ({ ...prev, investmentAmount: Number(e.target.value) }))}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="tradingPeriod" className="text-white">
                      Período de Trading
                    </Label>
                    <Input
                      id="tradingPeriod"
                      value={formData.tradingPeriod}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          tradingPeriod: e.target.value,
                          timeframe: e.target.value,
                        }))
                      }
                      placeholder="ex: 6 meses"
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.verified}
                      onChange={(e) => setFormData((prev) => ({ ...prev, verified: e.target.checked }))}
                      className="rounded border-gray-600 bg-gray-800"
                    />
                    <span className="text-white">Verificado</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData((prev) => ({ ...prev, featured: e.target.checked }))}
                      className="rounded border-gray-600 bg-gray-800"
                    />
                    <span className="text-white">Em Destaque</span>
                  </label>
                </div>

                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                    className="border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-black font-semibold"
                  >
                    {isLoading ? "Salvando..." : "Salvar"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Tabela de Testemunhos */}
        <Card className="bg-black/50 border-gray-800/50 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white">Testemunhos ({filteredTestimonials.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-700">
                    <TableHead className="text-gray-300">Cliente</TableHead>
                    <TableHead className="text-gray-300">Testemunho</TableHead>
                    <TableHead className="text-gray-300">Avaliação</TableHead>
                    <TableHead className="text-gray-300">Lucro</TableHead>
                    <TableHead className="text-gray-300">Status</TableHead>
                    <TableHead className="text-gray-300">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTestimonials.map((testimonial) => (
                    <TableRow key={testimonial.id} className="border-gray-700">
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={testimonial.image || "/placeholder.svg"} alt={testimonial.name} />
                            <AvatarFallback className="bg-gray-700 text-white">
                              {testimonial.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-white">{testimonial.name}</p>
                            <p className="text-sm text-gray-400">{testimonial.role}</p>
                            {testimonial.location && <p className="text-xs text-gray-500">{testimonial.location}</p>}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs">
                        <p className="text-gray-300 truncate">{testimonial.content}</p>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < testimonial.rating ? "text-yellow-400 fill-current" : "text-gray-600"
                              }`}
                            />
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        {testimonial.profit ? (
                          <div className="flex items-center space-x-1">
                            <TrendingUp className="h-4 w-4 text-green-400" />
                            <span className="text-green-400 font-medium">{testimonial.profit}</span>
                          </div>
                        ) : testimonial.profitPercentage ? (
                          <div className="flex items-center space-x-1">
                            <TrendingUp className="h-4 w-4 text-green-400" />
                            <span className="text-green-400 font-medium">{testimonial.profitPercentage}%</span>
                          </div>
                        ) : (
                          <span className="text-gray-500">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col space-y-1">
                          {testimonial.verified && (
                            <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                              Verificado
                            </Badge>
                          )}
                          {testimonial.featured && (
                            <Badge variant="secondary" className="bg-gold-500/20 text-gold-400 border-gold-500/30">
                              Destaque
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(testimonial)}
                            className="border-gray-600 text-gray-300 hover:bg-gray-800"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleToggleFeatured(testimonial.id)}
                            className={`border-gray-600 hover:bg-gray-800 ${
                              testimonial.featured ? "text-gold-400" : "text-gray-300"
                            }`}
                          >
                            <Star className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleToggleVerified(testimonial.id)}
                            className={`border-gray-600 hover:bg-gray-800 ${
                              testimonial.verified ? "text-green-400" : "text-gray-300"
                            }`}
                          >
                            <Users className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(testimonial.id)}
                            className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
