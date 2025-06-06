// Serviço compartilhado para gerenciar testemunhos

export interface Testimonial {
  id: string
  name: string
  role: string
  company?: string
  image: string
  content: string
  rating: number
  profit?: string
  profitPercentage?: number
  monthlyReturn?: number
  investmentAmount?: number
  timeframe?: string
  tradingPeriod?: string
  location?: string
  avatar?: string
  verified: boolean
  featured: boolean
  createdAt: Date
  updatedAt?: Date
}

// Dados iniciais para testemunhos
const initialTestimonials: Testimonial[] = [
  {
    id: "1",
    name: "Rafael Bastos",
    location: "Leiria, Portugal",
    role: "Pai Profissional",
    content:
      "Rising Star foi uma conquista 100%! Com dedicação ao máximo consegui resultados incríveis usando os scanners MTM.",
    rating: 5,
    profit: "+450 pips",
    profitPercentage: 45,
    timeframe: "3 meses",
    tradingPeriod: "3 meses",
    image: "/testimonials/rafael-bastos.jpg",
    avatar: "/testimonials/rafael-bastos.jpg",
    verified: true,
    featured: true,
    createdAt: new Date(),
  },
  {
    id: "2",
    name: "Sandra Oliveira",
    location: "Leiria, Portugal",
    role: "Contabilista",
    content:
      "Focada em criptomoedas, uso o método MoreThanMoney em dinâmica de cripto. Juntar-me à JIFU trouxe-me confiança e clareza sobre os meus objetivos financeiros.",
    rating: 5,
    profit: "+1,820 pips",
    profitPercentage: 182,
    timeframe: "18 meses",
    tradingPeriod: "18 meses",
    image: "/testimonials/sandra-oliveira.jpg",
    avatar: "/testimonials/sandra-oliveira.jpg",
    verified: true,
    featured: true,
    createdAt: new Date(),
  },
  {
    id: "3",
    name: "Liliana Faria",
    location: "Alpiarça, Portugal",
    role: "Gold Manager JIFU",
    content:
      "A tua fundação para director foi criada! Estás a um passo de distância! Trabalhar contigo tem sido uma inspiração diária.",
    rating: 5,
    profit: "+3,200 pips",
    profitPercentage: 320,
    timeframe: "18 meses",
    tradingPeriod: "18 meses",
    image: "/testimonials/liliana-faria.jpg",
    avatar: "/testimonials/liliana-faria.jpg",
    verified: true,
    featured: true,
    createdAt: new Date(),
  },
  {
    id: "4",
    name: "Gonçalo & Vânia",
    location: "Braga, Portugal",
    role: "Casal Empreendedor",
    content:
      "Mais uma recompensa pelo bom trabalho para este casal incrível da minha equipa. Parabéns, feliz por vocês! Withdraw Club conquistado!",
    rating: 5,
    profit: "+4,100 pips",
    profitPercentage: 410,
    timeframe: "5 meses",
    tradingPeriod: "5 meses",
    image: "/testimonials/goncalo-vania.jpg",
    avatar: "/testimonials/goncalo-vania.jpg",
    verified: true,
    featured: true,
    createdAt: new Date(),
  },
  {
    id: "5",
    name: "Rui & Carla",
    location: "Coimbra, Portugal",
    role: "Casal Investidor",
    content:
      "Somos um casal lindo. Estes quatro meses de JIFU têm sido intensos, loucos, mas muito prazerosos. Ser ensinável e grato por tudo predomina nos nossos dias.",
    rating: 5,
    profit: "+2,850 pips",
    profitPercentage: 285,
    timeframe: "18 meses",
    tradingPeriod: "18 meses",
    image: "/testimonials/rui-carla.jpg",
    avatar: "/testimonials/rui-carla.jpg",
    verified: true,
    featured: false,
    createdAt: new Date(),
  },
  {
    id: "6",
    name: "André Dias",
    location: "Suíça",
    role: "Chefe de Equipa de Construção",
    content:
      "Muito obrigado pelo vosso apoio, maltinha, principalmente ao Ricardo e Liliana que não me deixaram desistir nos momentos mais difíceis. Withdraw Club alcançado!",
    rating: 5,
    profit: "+3,650 pips",
    profitPercentage: 365,
    timeframe: "6 meses",
    tradingPeriod: "6 meses",
    image: "/testimonials/andre-dias.jpg",
    avatar: "/testimonials/andre-dias.jpg",
    verified: true,
    featured: false,
    createdAt: new Date(),
  },
  {
    id: "7",
    name: "Sandra Oliveira",
    location: "Leiria, Portugal",
    role: "Investidora",
    content:
      "Depois de 2 anos a usar os scanners MTM, consegui resultados consistentes e uma nova perspectiva sobre investimentos. A comunidade é incrível!",
    rating: 5,
    profit: "+2,500 pips",
    profitPercentage: 250,
    timeframe: "24 meses",
    tradingPeriod: "24 meses",
    image: "/testimonials/sandra-oliveira-2.jpg",
    avatar: "/testimonials/sandra-oliveira-2.jpg",
    verified: true,
    featured: false,
    createdAt: new Date(),
  },
]

// Função para carregar testemunhos
export const getTestimonials = (): Testimonial[] => {
  if (typeof window === "undefined") {
    return initialTestimonials
  }

  try {
    const saved = localStorage.getItem("testimonials")
    if (saved) {
      const parsed = JSON.parse(saved).map((t: any) => ({
        ...t,
        createdAt: new Date(t.createdAt),
        updatedAt: t.updatedAt ? new Date(t.updatedAt) : undefined,
      }))
      return parsed
    }

    // Se não existir, salva os dados iniciais
    localStorage.setItem("testimonials", JSON.stringify(initialTestimonials))
    return initialTestimonials
  } catch (error) {
    console.error("Erro ao carregar testemunhos:", error)
    return initialTestimonials
  }
}

// Função para salvar testemunhos
export const saveTestimonials = (testimonials: Testimonial[]): boolean => {
  try {
    localStorage.setItem("testimonials", JSON.stringify(testimonials))
    return true
  } catch (error) {
    console.error("Erro ao salvar testemunhos:", error)
    return false
  }
}

// Função para obter testemunhos em destaque
export const getFeaturedTestimonials = (): Testimonial[] => {
  const all = getTestimonials()
  return all.filter((t) => t.featured)
}

// Função para obter testemunhos verificados
export const getVerifiedTestimonials = (): Testimonial[] => {
  const all = getTestimonials()
  return all.filter((t) => t.verified)
}

// Função para obter testemunhos aleatórios
export const getRandomTestimonials = (count: number): Testimonial[] => {
  const all = getTestimonials()
  const verified = all.filter((t) => t.verified)
  const shuffled = [...verified].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

// Função para adicionar um testemunho
export const addTestimonial = (testimonial: Omit<Testimonial, "id" | "createdAt">): Testimonial => {
  const all = getTestimonials()
  const newTestimonial: Testimonial = {
    ...testimonial,
    id: Date.now().toString(),
    createdAt: new Date(),
  }

  const updated = [...all, newTestimonial]
  saveTestimonials(updated)
  return newTestimonial
}

// Função para atualizar um testemunho
export const updateTestimonial = (id: string, data: Partial<Testimonial>): Testimonial | null => {
  const all = getTestimonials()
  const index = all.findIndex((t) => t.id === id)

  if (index === -1) return null

  const updated = [...all]
  updated[index] = {
    ...updated[index],
    ...data,
    updatedAt: new Date(),
  }

  saveTestimonials(updated)
  return updated[index]
}

// Função para excluir um testemunho
export const deleteTestimonial = (id: string): boolean => {
  const all = getTestimonials()
  const updated = all.filter((t) => t.id !== id)

  if (updated.length === all.length) return false

  saveTestimonials(updated)
  return true
}

// Função para alternar o status de destaque
export const toggleFeatured = (id: string): Testimonial | null => {
  const all = getTestimonials()
  const testimonial = all.find((t) => t.id === id)

  if (!testimonial) return null

  return updateTestimonial(id, { featured: !testimonial.featured })
}

// Função para alternar o status de verificado
export const toggleVerified = (id: string): Testimonial | null => {
  const all = getTestimonials()
  const testimonial = all.find((t) => t.id === id)

  if (!testimonial) return null

  return updateTestimonial(id, { verified: !testimonial.verified })
}
