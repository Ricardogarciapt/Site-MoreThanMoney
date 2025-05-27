// Sistema de afiliados para a plataforma MoreThanMoney

export interface AffiliateCommission {
  productId: string
  productName: string
  rate: number // Porcentagem de comissão (0-100)
  basePrice: number // Preço base do produto
  minimumRoleRequired: string // Role mínimo necessário para afiliar este produto
  excludedRoles: string[] // Roles que não podem afiliar este produto
}

// Tabela de comissões por produto
export const commissionTable: AffiliateCommission[] = [
  {
    productId: "scanner-mtm",
    productName: "Scanner MTM V3.4",
    rate: 80, // 80% de comissão
    basePrice: 150, // 150€
    minimumRoleRequired: "Distribuidor",
    excludedRoles: ["Membro", "Membro VIP"],
  },
  {
    productId: "membership-mtm",
    productName: "Acesso MoreThanMoney",
    rate: 20, // 20% de comissão
    basePrice: 50, // 50€
    minimumRoleRequired: "Distribuidor",
    excludedRoles: ["Membro", "Membro VIP"],
  },
  {
    productId: "copytrading-mtm",
    productName: "Copytrading MTM",
    rate: 30, // 30% de comissão
    basePrice: 350, // 350€ (atualizado)
    minimumRoleRequired: "Distribuidor",
    excludedRoles: ["Membro", "Membro VIP"],
  },
  {
    productId: "bootcamp-mtm",
    productName: "Bootcamp MoreThanMoney",
    rate: 20, // 20% de comissão
    basePrice: 200, // 200€
    minimumRoleRequired: "Distribuidor",
    excludedRoles: ["Membro", "Membro VIP"],
  },
]

// Lista de roles que podem ter cupons de afiliado
export const affiliateEligibleRoles = [
  "Distribuidor",
  "Educador",
  "Liderança",
  "Rising Star",
  "Silver Manager",
  "Gold Manager",
  "Platinum Manager",
  "Elite",
  "Director",
  "Diamond",
  "Presidential",
]

// Verifica se um usuário pode ser afiliado
export function canBeAffiliate(userRole: string): boolean {
  return affiliateEligibleRoles.includes(userRole)
}

// Gera um código de afiliado
export function generateAffiliateCode(username: string): string {
  // Cria um código baseado no nome de usuário e num número aleatório
  const randomPart = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0")
  return `${username.slice(0, 5).toUpperCase()}${randomPart}`
}

// Calcula a comissão para um produto
export function calculateCommission(productId: string, price: number): number {
  const product = commissionTable.find((p) => p.productId === productId)
  if (!product) return 0

  return (price * product.rate) / 100
}

// Interface para o histórico de comissões
export interface CommissionHistory {
  id: string
  affiliateUsername: string
  productId: string
  productName: string
  customerUsername: string
  amount: number
  date: string
  status: "pending" | "paid" | "cancelled"
}

// Função para salvar o histórico de comissões (simulado)
export function saveCommissionHistory(
  commissionData: Omit<CommissionHistory, "id" | "date" | "status">,
): CommissionHistory {
  const id = `comm_${Date.now()}`
  const newCommission: CommissionHistory = {
    ...commissionData,
    id,
    date: new Date().toISOString(),
    status: "pending",
  }

  // Em produção, isso seria armazenado no banco de dados
  // Para este exemplo, salvamos no localStorage
  if (typeof window !== "undefined") {
    const history: CommissionHistory[] = JSON.parse(localStorage.getItem("commissionHistory") || "[]")
    history.push(newCommission)
    localStorage.setItem("commissionHistory", JSON.stringify(history))
  }

  return newCommission
}

// Obtém o histórico de comissões para um afiliado
export function getAffiliateCommissions(username: string): CommissionHistory[] {
  if (typeof window === "undefined") return []

  const history: CommissionHistory[] = JSON.parse(localStorage.getItem("commissionHistory") || "[]")
  return history.filter((c) => c.affiliateUsername === username)
}

// Atualiza o status de uma comissão
export function updateCommissionStatus(commissionId: string, newStatus: "pending" | "paid" | "cancelled"): boolean {
  if (typeof window === "undefined") return false

  const history: CommissionHistory[] = JSON.parse(localStorage.getItem("commissionHistory") || "[]")
  const updatedHistory = history.map((commission) => {
    if (commission.id === commissionId) {
      return { ...commission, status: newStatus }
    }
    return commission
  })

  localStorage.setItem("commissionHistory", JSON.stringify(updatedHistory))
  return true
}
