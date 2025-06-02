"use client"

import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function AuthDebug() {
  const { user, isAuthenticated, isAdmin, login, logout } = useAuth()
  const [loginStatus, setLoginStatus] = useState<string>("")

  const testAdminLogin = async () => {
    setLoginStatus("Testando login admin...")
    const success = await login("ricardogarciapt", "Superacao2022#")
    setLoginStatus(success ? "✅ Login admin funcionou!" : "❌ Login admin falhou")
  }

  const testDemoLogin = async () => {
    setLoginStatus("Testando login demo...")
    const success = await login("demo", "password")
    setLoginStatus(success ? "✅ Login demo funcionou!" : "❌ Login demo falhou")
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Debug Autenticação</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <strong>Status:</strong> {isAuthenticated ? "Autenticado" : "Não autenticado"}
        </div>

        {user && (
          <div className="space-y-2">
            <div>
              <strong>Username:</strong> {user.username}
            </div>
            <div>
              <strong>Nome:</strong> {user.name}
            </div>
            <div>
              <strong>Admin:</strong> {isAdmin ? "Sim" : "Não"}
            </div>
            <div>
              <strong>Role:</strong> {user.role}
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Button onClick={testAdminLogin} className="w-full" size="sm">
            Testar Login Admin
          </Button>
          <Button onClick={testDemoLogin} className="w-full" size="sm" variant="outline">
            Testar Login Demo
          </Button>
          {isAuthenticated && (
            <Button onClick={logout} className="w-full" size="sm" variant="destructive">
              Logout
            </Button>
          )}
        </div>

        {loginStatus && <div className="text-sm p-2 bg-gray-100 rounded">{loginStatus}</div>}
      </CardContent>
    </Card>
  )
}
