"use client"

import { AuthDebug } from "@/components/auth-debug"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { logEnvironmentStatus } from "@/lib/env-check"
import { useEffect, useState } from "react"

export default function DebugPage() {
  const [envStatus, setEnvStatus] = useState<any>(null)

  useEffect(() => {
    const status = logEnvironmentStatus()
    setEnvStatus(status)
  }, [])

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Debug MoreThanMoney</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Environment Status */}
        <Card>
          <CardHeader>
            <CardTitle>Variáveis de Ambiente</CardTitle>
          </CardHeader>
          <CardContent>
            {envStatus && (
              <div className="space-y-2">
                <div className={`p-2 rounded ${envStatus.allPresent ? "bg-green-100" : "bg-red-100"}`}>
                  {envStatus.allPresent ? "✅ Todas configuradas" : "❌ Algumas em falta"}
                </div>

                {envStatus.present.length > 0 && (
                  <div>
                    <strong>Presentes:</strong>
                    <ul className="list-disc list-inside text-sm">
                      {envStatus.present.map((env: string) => (
                        <li key={env} className="text-green-600">
                          {env}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {envStatus.missing.length > 0 && (
                  <div>
                    <strong>Em falta:</strong>
                    <ul className="list-disc list-inside text-sm">
                      {envStatus.missing.map((env: string) => (
                        <li key={env} className="text-red-600">
                          {env}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Auth Debug */}
        <AuthDebug />
      </div>

      {/* Quick Links */}
      <Card>
        <CardHeader>
          <CardTitle>Links de Teste</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Link href="/test-supabase">
              <Button className="w-full">🗄️ Testar Supabase</Button>
            </Link>
            <Link href="/admin-dashboard">
              <Button className="w-full" variant="outline">
                👨‍💼 Dashboard Admin
              </Button>
            </Link>
            <Link href="/member-area">
              <Button className="w-full" variant="outline">
                👤 Área de Membro
              </Button>
            </Link>
            <Link href="/">
              <Button className="w-full" variant="outline">
                🏠 Página Principal
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
