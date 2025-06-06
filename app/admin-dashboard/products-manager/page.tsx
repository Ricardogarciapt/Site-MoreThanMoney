"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/hooks/use-toast"
import {
  Package,
  Plus,
  Edit,
  Trash2,
  Download,
  Upload,
  Search,
  Eye,
  AlertTriangle,
  FileText,
  DollarSign,
} from "lucide-react"
import { useRouter } from "next/navigation"

interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  category: "course" | "scanner" | "copytrading" | "membership" | "automation"
  status: "active" | "inactive" | "draft"
  stock: number
  unlimited: boolean
  features: string[]
  images: string[]
  tags: string[]
  createdAt: Date
  updatedAt: Date
  metadata?: Record<string, any>
}

export default function ProductsManagerPage() {
  const { user, isAuthenticated, isAdmin } = useAuth()
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isImportModalOpen, setIsImportModalOpen] = useState(false)
  const [importData, setImportData] = useState("")

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    originalPrice: 0,
    category: "course" as Product["category"],
    status: "active" as Product["status"],
    stock: 0,
    unlimited: false,
    features: [] as string[],
    images: [] as string[],
    tags: [] as string[],
  })

  // Redirect if not admin
  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      router.push("/admin-dashboard")
    }
  }, [isAuthenticated, isAdmin, router])

  // Load products
  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      setLoading(true)
      // Simular dados para demonstração
      const mockProducts: Product[] = [
        {
          id: "1",
          name: "Bootcamp MoreThanMoney",
          description: "Curso completo de trading e investimentos com mais de 50 horas de conteúdo premium",
          price: 497,
          originalPrice: 997,
          category: "course",
          status: "active",
          stock: 0,
          unlimited: true,
          features: [
            "Acesso vitalício ao curso",
            "Mais de 50 horas de conteúdo",
            "Suporte da comunidade VIP",
            "Certificado de conclusão",
            "Atualizações gratuitas",
            "Acesso ao grupo Telegram VIP",
          ],
          images: ["/bootcamp-mtm-screenshot.png"],
          tags: ["trading", "investimentos", "educação", "premium"],
          createdAt: new Date(),
          updatedAt: new Date(),
          metadata: {
            duration: "50+ horas",
            level: "Iniciante a Avançado",
            language: "Português",
            support: "24/7",
          },
        },
        {
          id: "2",
          name: "Scanner MTM Gold Killer",
          description: "Scanner avançado para identificar oportunidades de trading em ouro com precisão de 85%+",
          price: 97,
          originalPrice: 197,
          category: "scanner",
          status: "active",
          stock: 0,
          unlimited: true,
          features: [
            "Sinais em tempo real",
            "Análise técnica avançada",
            "Alertas personalizados",
            "Suporte 24/7",
            "Backtesting histórico",
            "Interface intuitiva",
          ],
          images: ["/scanner-preview.png"],
          tags: ["scanner", "ouro", "sinais", "automação"],
          createdAt: new Date(),
          updatedAt: new Date(),
          metadata: {
            accuracy: "85%+",
            timeframes: "M1, M5, M15, H1, H4, D1",
            markets: "XAUUSD, Gold Futures",
            alerts: "Email, SMS, Telegram",
          },
        },
        {
          id: "3",
          name: "Copytrading Premium VIP",
          description: "Acesso exclusivo aos melhores portfólios de copytrading com gestão de risco automática",
          price: 197,
          originalPrice: 397,
          category: "copytrading",
          status: "active",
          stock: 50,
          unlimited: false,
          features: [
            "Acesso a 10+ portfólios premium",
            "Gestão de risco automática",
            "Relatórios detalhados diários",
            "Suporte prioritário VIP",
            "Análise de performance",
            "Diversificação automática",
          ],
          images: ["/trading-animation.png"],
          tags: ["copytrading", "portfólios", "automação", "vip"],
          createdAt: new Date(),
          updatedAt: new Date(),
          metadata: {
            minDeposit: "€500",
            expectedReturn: "15-25% anual",
            riskLevel: "Médio",
            traders: "10+ traders verificados",
          },
        },
        {
          id: "4",
          name: "Membership MoreThanMoney VIP",
          description: "Acesso completo a todos os recursos da plataforma MoreThanMoney",
          price: 97,
          category: "membership",
          status: "active",
          stock: 0,
          unlimited: true,
          features: [
            "Acesso a todos os scanners",
            "Sinais VIP do Telegram",
            "Suporte prioritário",
            "Webinars exclusivos",
            "Análises de mercado diárias",
            "Comunidade VIP",
          ],
          images: ["/logo-new.png"],
          tags: ["membership", "vip", "acesso-completo"],
          createdAt: new Date(),
          updatedAt: new Date(),
          metadata: {
            duration: "Mensal",
            renewal: "Automático",
            benefits: "Todos os recursos",
          },
        },
      ]
      setProducts(mockProducts)
    } catch (error) {
      console.error("Erro ao carregar produtos:", error)
      toast({
        title: "Erro",
        description: "Erro ao carregar produtos",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCreateProduct = async () => {
    try {
      const newProduct: Product = {
        ...formData,
        id: Date.now().toString(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      setProducts([...products, newProduct])
      toast({
        title: "Sucesso",
        description: "Produto criado com sucesso",
      })
      setIsCreateModalOpen(false)
      resetForm()
    } catch (error) {
      console.error("Erro ao criar produto:", error)
      toast({
        title: "Erro",
        description: "Erro ao criar produto",
        variant: "destructive",
      })
    }
  }

  const handleUpdateProduct = async () => {
    if (!selectedProduct) return

    try {
      const updatedProducts = products.map((p) =>
        p.id === selectedProduct.id
          ? { ...formData, id: selectedProduct.id, createdAt: selectedProduct.createdAt, updatedAt: new Date() }
          : p,
      )
      setProducts(updatedProducts)

      toast({
        title: "Sucesso",
        description: "Produto atualizado com sucesso",
      })
      setIsEditModalOpen(false)
      setSelectedProduct(null)
      resetForm()
    } catch (error) {
      console.error("Erro ao atualizar produto:", error)
      toast({
        title: "Erro",
        description: "Erro ao atualizar produto",
        variant: "destructive",
      })
    }
  }

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm("Tem certeza que deseja deletar este produto?")) return

    try {
      setProducts(products.filter((p) => p.id !== productId))
      toast({
        title: "Sucesso",
        description: "Produto deletado com sucesso",
      })
    } catch (error) {
      console.error("Erro ao deletar produto:", error)
      toast({
        title: "Erro",
        description: "Erro ao deletar produto",
        variant: "destructive",
      })
    }
  }

  const handleExportProducts = () => {
    try {
      const dataStr = JSON.stringify(products, null, 2)
      const dataBlob = new Blob([dataStr], { type: "application/json" })
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement("a")
      link.href = url
      link.download = `produtos-${new Date().toISOString().split("T")[0]}.json`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      toast({
        title: "Sucesso",
        description: "Produtos exportados com sucesso",
      })
    } catch (error) {
      console.error("Erro ao exportar produtos:", error)
      toast({
        title: "Erro",
        description: "Erro ao exportar produtos",
        variant: "destructive",
      })
    }
  }

  const handleImportProducts = () => {
    try {
      const importedProducts = JSON.parse(importData)
      if (!Array.isArray(importedProducts)) {
        throw new Error("Formato inválido")
      }

      // Validar estrutura dos produtos
      const validProducts = importedProducts.filter(
        (product) => product.name && product.description && typeof product.price === "number",
      )

      if (validProducts.length === 0) {
        throw new Error("Nenhum produto válido encontrado")
      }

      // Adicionar IDs únicos se não existirem
      const productsWithIds = validProducts.map((product) => ({
        ...product,
        id: product.id || Date.now().toString() + Math.random().toString(36).substr(2, 9),
        createdAt: product.createdAt ? new Date(product.createdAt) : new Date(),
        updatedAt: new Date(),
      }))

      setProducts([...products, ...productsWithIds])
      setImportData("")
      setIsImportModalOpen(false)

      toast({
        title: "Sucesso",
        description: `${validProducts.length} produtos importados com sucesso`,
      })
    } catch (error) {
      console.error("Erro ao importar produtos:", error)
      toast({
        title: "Erro",
        description: "Erro ao importar produtos. Verifique o formato JSON.",
        variant: "destructive",
      })
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: 0,
      originalPrice: 0,
      category: "course",
      status: "active",
      stock: 0,
      unlimited: false,
      features: [],
      images: [],
      tags: [],
    })
  }

  const openEditModal = (product: Product) => {
    setSelectedProduct(product)
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      originalPrice: product.originalPrice || 0,
      category: product.category,
      status: product.status,
      stock: product.stock,
      unlimited: product.unlimited,
      features: product.features,
      images: product.images,
      tags: product.tags,
    })
    setIsEditModalOpen(true)
  }

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || product.category === filterCategory
    const matchesStatus = filterStatus === "all" || product.status === filterStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "inactive":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "draft":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "course":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "scanner":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30"
      case "copytrading":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30"
      case "membership":
        return "bg-pink-500/20 text-pink-400 border-pink-500/30"
      case "automation":
        return "bg-cyan-500/20 text-cyan-400 border-cyan-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  if (!isAuthenticated || !isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <Card className="bg-black/50 border-red-500/50">
          <CardContent className="p-8 text-center">
            <AlertTriangle className="h-12 w-12 text-red-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">Acesso Negado</h2>
            <p className="text-gray-400">Você não tem permissão para acessar esta página.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const activeProducts = products.filter((p) => p.status === "active").length
  const totalValue = products.reduce((sum, p) => sum + p.price, 0)
  const lowStockProducts = products.filter((p) => !p.unlimited && p.stock < 10).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Gestão de Produtos</h1>
            <p className="text-gray-400 text-lg">Gerir catálogo de produtos, stock e preços da plataforma</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={handleExportProducts}
              variant="outline"
              className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10"
            >
              <Download className="h-4 w-4 mr-2" />
              Exportar JSON
            </Button>
            <Dialog open={isImportModalOpen} onOpenChange={setIsImportModalOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="border-green-500/50 text-green-400 hover:bg-green-500/10">
                  <Upload className="h-4 w-4 mr-2" />
                  Importar JSON
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-black/90 border-gray-800 max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-white">Importar Produtos</DialogTitle>
                  <DialogDescription className="text-gray-400">
                    Cole o JSON dos produtos para importar. O formato deve ser um array de objetos produto.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label className="text-white">Dados JSON</Label>
                    <Textarea
                      value={importData}
                      onChange={(e) => setImportData(e.target.value)}
                      placeholder='[{"name": "Produto", "description": "Descrição", "price": 100, ...}]'
                      className="bg-gray-800 border-gray-700 text-white min-h-[200px] font-mono text-sm"
                    />
                  </div>
                  <div className="flex justify-end space-x-3">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsImportModalOpen(false)
                        setImportData("")
                      }}
                      className="border-gray-600 text-gray-400"
                    >
                      Cancelar
                    </Button>
                    <Button
                      onClick={handleImportProducts}
                      disabled={!importData.trim()}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      Importar Produtos
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-black font-semibold">
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Produto
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-black/90 border-gray-800 max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-white text-xl">Criar Novo Produto</DialogTitle>
                  <DialogDescription className="text-gray-400">
                    Preencha todos os dados do novo produto
                  </DialogDescription>
                </DialogHeader>
                <ProductForm
                  formData={formData}
                  setFormData={setFormData}
                  onSubmit={handleCreateProduct}
                  onCancel={() => {
                    setIsCreateModalOpen(false)
                    resetForm()
                  }}
                  submitText="Criar Produto"
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-black/50 border-gray-800/50 backdrop-blur-xl hover:bg-black/60 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Total de Produtos</p>
                  <p className="text-3xl font-bold text-white">{products.length}</p>
                  <p className="text-xs text-gray-500 mt-1">Catálogo completo</p>
                </div>
                <div className="p-3 bg-blue-500/20 rounded-full">
                  <Package className="h-8 w-8 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-gray-800/50 backdrop-blur-xl hover:bg-black/60 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Produtos Ativos</p>
                  <p className="text-3xl font-bold text-green-400">{activeProducts}</p>
                  <p className="text-xs text-gray-500 mt-1">Disponíveis para venda</p>
                </div>
                <div className="p-3 bg-green-500/20 rounded-full">
                  <Eye className="h-8 w-8 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-gray-800/50 backdrop-blur-xl hover:bg-black/60 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Valor Total</p>
                  <p className="text-3xl font-bold text-gold-400">€{totalValue.toLocaleString()}</p>
                  <p className="text-xs text-gray-500 mt-1">Valor do catálogo</p>
                </div>
                <div className="p-3 bg-gold-500/20 rounded-full">
                  <DollarSign className="h-8 w-8 text-gold-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-gray-800/50 backdrop-blur-xl hover:bg-black/60 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Stock Baixo</p>
                  <p className="text-3xl font-bold text-red-400">{lowStockProducts}</p>
                  <p className="text-xs text-gray-500 mt-1">Requer atenção</p>
                </div>
                <div className="p-3 bg-red-500/20 rounded-full">
                  <AlertTriangle className="h-8 w-8 text-red-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-black/50 border-gray-800/50 backdrop-blur-xl mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Pesquisar produtos por nome ou descrição..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              </div>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-full lg:w-48 bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="all">Todas as Categorias</SelectItem>
                  <SelectItem value="course">Cursos</SelectItem>
                  <SelectItem value="scanner">Scanners</SelectItem>
                  <SelectItem value="copytrading">Copytrading</SelectItem>
                  <SelectItem value="membership">Memberships</SelectItem>
                  <SelectItem value="automation">Automação</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full lg:w-48 bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="all">Todos os Status</SelectItem>
                  <SelectItem value="active">Ativo</SelectItem>
                  <SelectItem value="inactive">Inativo</SelectItem>
                  <SelectItem value="draft">Rascunho</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Products List */}
        <Card className="bg-black/50 border-gray-800/50 backdrop-blur-xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white text-xl">Produtos ({filteredProducts.length})</CardTitle>
                <CardDescription className="text-gray-400">Lista completa de produtos do catálogo</CardDescription>
              </div>
              <Badge variant="outline" className="border-blue-500/50 text-blue-400">
                {filteredProducts.length} de {products.length}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-500 mx-auto"></div>
                <p className="text-gray-400 mt-4 text-lg">Carregando produtos...</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Nenhum produto encontrado</h3>
                <p className="text-gray-400 mb-6">
                  {searchTerm || filterCategory !== "all" || filterStatus !== "all"
                    ? "Tente ajustar os filtros de pesquisa"
                    : "Comece criando seu primeiro produto"}
                </p>
                {!searchTerm && filterCategory === "all" && filterStatus === "all" && (
                  <Button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="bg-gold-500 hover:bg-gold-600 text-black"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Criar Primeiro Produto
                  </Button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex flex-col lg:flex-row lg:items-center justify-between p-6 border border-gray-700 rounded-lg hover:bg-gray-800/30 transition-all duration-200 hover:border-gray-600"
                  >
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="w-20 h-20 bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                        {product.images.length > 0 ? (
                          <img
                            src={product.images[0] || "/placeholder.svg"}
                            alt={product.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <Package className="h-10 w-10 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-white font-semibold text-lg truncate">{product.name}</h3>
                          <div className="text-right ml-4 flex-shrink-0">
                            <p className="text-white font-bold text-xl">€{product.price}</p>
                            {product.originalPrice && product.originalPrice > product.price && (
                              <p className="text-gray-400 line-through text-sm">€{product.originalPrice}</p>
                            )}
                          </div>
                        </div>
                        <p className="text-gray-400 text-sm mb-3 line-clamp-2">{product.description}</p>
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <Badge className={getCategoryColor(product.category)}>{product.category}</Badge>
                          <Badge className={getStatusColor(product.status)}>{product.status}</Badge>
                          {!product.unlimited && product.stock < 10 && (
                            <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                              Stock Baixo ({product.stock})
                            </Badge>
                          )}
                          {product.unlimited && (
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                              Stock Ilimitado
                            </Badge>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {product.tags.slice(0, 3).map((tag, index) => (
                            <Badge key={index} variant="outline" className="border-gray-600 text-gray-400 text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {product.tags.length > 3 && (
                            <Badge variant="outline" className="border-gray-600 text-gray-400 text-xs">
                              +{product.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 mt-4 lg:mt-0 lg:ml-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openEditModal(product)}
                        className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteProduct(product.id)}
                        className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Edit Modal */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="bg-black/90 border-gray-800 max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-white text-xl">Editar Produto</DialogTitle>
              <DialogDescription className="text-gray-400">Atualize os dados do produto selecionado</DialogDescription>
            </DialogHeader>
            <ProductForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleUpdateProduct}
              onCancel={() => {
                setIsEditModalOpen(false)
                setSelectedProduct(null)
                resetForm()
              }}
              submitText="Atualizar Produto"
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

// Product Form Component
function ProductForm({
  formData,
  setFormData,
  onSubmit,
  onCancel,
  submitText = "Guardar",
}: {
  formData: any
  setFormData: (data: any) => void
  onSubmit: () => void
  onCancel: () => void
  submitText?: string
}) {
  const [newFeature, setNewFeature] = useState("")
  const [newTag, setNewTag] = useState("")
  const [newImage, setNewImage] = useState("")

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData({
        ...formData,
        features: [...formData.features, newFeature.trim()],
      })
      setNewFeature("")
    }
  }

  const removeFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_: any, i: number) => i !== index),
    })
  }

  const addTag = () => {
    if (newTag.trim()) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag.trim()],
      })
      setNewTag("")
    }
  }

  const removeTag = (index: number) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((_: any, i: number) => i !== index),
    })
  }

  const addImage = () => {
    if (newImage.trim()) {
      setFormData({
        ...formData,
        images: [...formData.images, newImage.trim()],
      })
      setNewImage("")
    }
  }

  const removeImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_: any, i: number) => i !== index),
    })
  }

  return (
    <Tabs defaultValue="basic" className="w-full">
      <TabsList className="grid w-full grid-cols-4 bg-gray-800">
        <TabsTrigger value="basic" className="text-white">
          Básico
        </TabsTrigger>
        <TabsTrigger value="details" className="text-white">
          Detalhes
        </TabsTrigger>
        <TabsTrigger value="inventory" className="text-white">
          Inventário
        </TabsTrigger>
        <TabsTrigger value="media" className="text-white">
          Mídia
        </TabsTrigger>
      </TabsList>

      <TabsContent value="basic" className="space-y-6 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="name" className="text-white text-sm font-medium">
              Nome do Produto *
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-gray-800 border-gray-700 text-white mt-2"
              placeholder="Ex: Bootcamp MoreThanMoney"
            />
          </div>
          <div>
            <Label htmlFor="category" className="text-white text-sm font-medium">
              Categoria *
            </Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger className="bg-gray-800 border-gray-700 text-white mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="course">📚 Curso</SelectItem>
                <SelectItem value="scanner">🔍 Scanner</SelectItem>
                <SelectItem value="copytrading">📈 Copytrading</SelectItem>
                <SelectItem value="membership">👑 Membership</SelectItem>
                <SelectItem value="automation">🤖 Automação</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="description" className="text-white text-sm font-medium">
            Descrição *
          </Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="bg-gray-800 border-gray-700 text-white mt-2"
            rows={4}
            placeholder="Descreva o produto em detalhes..."
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="price" className="text-white text-sm font-medium">
              Preço (€) *
            </Label>
            <Input
              id="price"
              type="number"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
              className="bg-gray-800 border-gray-700 text-white mt-2"
              placeholder="0.00"
            />
          </div>
          <div>
            <Label htmlFor="originalPrice" className="text-white text-sm font-medium">
              Preço Original (€)
            </Label>
            <Input
              id="originalPrice"
              type="number"
              min="0"
              step="0.01"
              value={formData.originalPrice}
              onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
              className="bg-gray-800 border-gray-700 text-white mt-2"
              placeholder="0.00"
            />
            <p className="text-xs text-gray-500 mt-1">Para mostrar desconto</p>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="details" className="space-y-6 mt-6">
        <div>
          <Label className="text-white text-sm font-medium">Características do Produto</Label>
          <div className="space-y-3 mt-2">
            <div className="flex space-x-2">
              <Input
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                placeholder="Ex: Acesso vitalício ao curso"
                className="bg-gray-800 border-gray-700 text-white"
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
              />
              <Button onClick={addFeature} size="sm" className="bg-blue-600 hover:bg-blue-700 px-4">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {formData.features.map((feature: string, index: number) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-800 p-3 rounded border border-gray-700"
                >
                  <span className="text-white text-sm">{feature}</span>
                  <Button
                    onClick={() => removeFeature(index)}
                    size="sm"
                    variant="ghost"
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <Label className="text-white text-sm font-medium">Tags</Label>
          <div className="space-y-3 mt-2">
            <div className="flex space-x-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Ex: trading, premium, vip"
                className="bg-gray-800 border-gray-700 text-white"
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
              />
              <Button onClick={addTag} size="sm" className="bg-green-600 hover:bg-green-700 px-4">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag: string, index: number) => (
                <Badge key={index} variant="outline" className="border-blue-500 text-blue-400 bg-blue-500/10">
                  {tag}
                  <button onClick={() => removeTag(index)} className="ml-2 text-red-400 hover:text-red-300">
                    ×
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="inventory" className="space-y-6 mt-6">
        <div>
          <Label htmlFor="status" className="text-white text-sm font-medium">
            Status do Produto
          </Label>
          <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
            <SelectTrigger className="bg-gray-800 border-gray-700 text-white mt-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="active">✅ Ativo</SelectItem>
              <SelectItem value="inactive">❌ Inativo</SelectItem>
              <SelectItem value="draft">📝 Rascunho</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-3">
          <Switch
            checked={formData.unlimited}
            onCheckedChange={(checked) => setFormData({ ...formData, unlimited: checked })}
          />
          <div>
            <Label className="text-white text-sm font-medium">Stock Ilimitado</Label>
            <p className="text-xs text-gray-500">Produto digital sem limitação de quantidade</p>
          </div>
        </div>

        {!formData.unlimited && (
          <div>
            <Label htmlFor="stock" className="text-white text-sm font-medium">
              Quantidade em Stock
            </Label>
            <Input
              id="stock"
              type="number"
              min="0"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
              className="bg-gray-800 border-gray-700 text-white mt-2"
              placeholder="0"
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.stock < 10 && formData.stock > 0 && "⚠️ Stock baixo"}
              {formData.stock === 0 && "❌ Sem stock"}
            </p>
          </div>
        )}
      </TabsContent>

      <TabsContent value="media" className="space-y-6 mt-6">
        <div>
          <Label className="text-white text-sm font-medium">Imagens do Produto</Label>
          <div className="space-y-3 mt-2">
            <div className="flex space-x-2">
              <Input
                value={newImage}
                onChange={(e) => setNewImage(e.target.value)}
                placeholder="URL da imagem ou caminho (ex: /images/produto.jpg)"
                className="bg-gray-800 border-gray-700 text-white"
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addImage())}
              />
              <Button onClick={addImage} size="sm" className="bg-purple-600 hover:bg-purple-700 px-4">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {formData.images.map((image: string, index: number) => (
                <div key={index} className="relative bg-gray-800 p-3 rounded border border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-700 rounded flex items-center justify-center">
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`Produto ${index + 1}`}
                          className="w-full h-full object-cover rounded"
                          onError={(e) => {
                            e.currentTarget.style.display = "none"
                            e.currentTarget.nextElementSibling!.style.display = "flex"
                          }}
                        />
                        <FileText className="h-6 w-6 text-gray-400" style={{ display: "none" }} />
                      </div>
                      <span className="text-white text-sm truncate">{image}</span>
                    </div>
                    <Button
                      onClick={() => removeImage(index)}
                      size="sm"
                      variant="ghost"
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </TabsContent>

      <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-700">
        <Button onClick={onCancel} variant="outline" className="border-gray-600 text-gray-400 hover:bg-gray-800">
          Cancelar
        </Button>
        <Button
          onClick={onSubmit}
          className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-black font-semibold"
          disabled={!formData.name || !formData.description || !formData.price}
        >
          {submitText}
        </Button>
      </div>
    </Tabs>
  )
}
