"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import LoginForm from "@/components/login-form"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LogOut, User, BookOpen, BarChart2, UserPlus, CreditCard, Copy } from "lucide-react"
import MoreThanMoneyCourses from "@/components/morethanmoney-courses"
import MemberRegistration from "@/components/member-registration"
import MembershipPackages from "@/components/membership-packages"
import { MemberScannersIdeas } from "@/components/member-scanners-ideas"
import { CopytradingConfig } from "@/components/copytrading-config"

export default function MemberArea() {
  const { user, isAuthenticated, logout } = useAuth()
  const [activeTab, setActiveTab] = useState("courses")
  const [showRegistration, setShowRegistration] = useState(false)

  if (!isAuthenticated && !showRegistration) {
    return (
      <section id="member-area" className="py-20 bg-black relative">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gold-400 to-gold-600">
              Área de Membros
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Faça login para acessar conteúdos exclusivos, suporte e ferramentas avançadas.
            </p>
          </div>

          <div className="flex justify-center mb-12">
            <Button
              onClick={() => setShowRegistration(true)}
              className="bg-gold-600 hover:bg-gold-700 text-black px-8 py-3"
            >
              <UserPlus className="mr-2 h-4 w-4" /> Registrar
            </Button>
          </div>

          <LoginForm />
        </div>
      </section>
    )
  }

  if (!isAuthenticated && showRegistration) {
    return <MemberRegistration />
  }

  return (
    <section id="member-area" className="py-20 bg-black relative">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gold-400 to-gold-600">
              Bem-vindo, {user.name}
            </h2>
            <p className="text-gray-300 mt-2">Acesse os recursos exclusivos para membros.</p>
          </div>

          <Button
            onClick={logout}
            variant="outline"
            className="border-gold-500 text-gold-400 hover:bg-gold-500/10 flex items-center gap-2"
          >
            <LogOut size={16} />
            Sair
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-5 mb-8 bg-black/50 border border-gold-500/30">
            <TabsTrigger value="courses" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black">
              <BookOpen size={16} className="mr-2" />
              Cursos MoreThanMoney
            </TabsTrigger>
            <TabsTrigger value="scanners" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black">
              <BarChart2 size={16} className="mr-2" />
              Scanners e Ideias
            </TabsTrigger>
            <TabsTrigger value="copytrading" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black">
              <Copy size={16} className="mr-2" />
              Copytrading
            </TabsTrigger>
            <TabsTrigger
              value="subscription"
              className="data-[state=active]:bg-gold-500 data-[state=active]:text-black"
            >
              <CreditCard size={16} className="mr-2" />
              Assinatura
            </TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black">
              <User size={16} className="mr-2" />
              Perfil
            </TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="mt-0">
            <MoreThanMoneyCourses />
          </TabsContent>

          <TabsContent value="scanners" className="mt-0">
            <MemberScannersIdeas />
          </TabsContent>

          <TabsContent value="copytrading" className="mt-0">
            <CopytradingConfig />
          </TabsContent>

          <TabsContent value="subscription" className="mt-0">
            <MembershipPackages />
          </TabsContent>

          <TabsContent value="profile" className="mt-0">
            <div className="bg-black/50 border border-gold-500/30 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Informações do Perfil</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-400">Nome de Usuário:</p>
                  <p className="text-white font-medium">{user.username}</p>
                </div>
                <div>
                  <p className="text-gray-400">Nome Completo:</p>
                  <p className="text-white font-medium">{user.name}</p>
                </div>
                <div>
                  <p className="text-gray-400">Status da Assinatura:</p>
                  <p className="text-gold-400 font-medium">Ativo</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
