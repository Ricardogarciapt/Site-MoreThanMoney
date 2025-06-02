"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { supabase, testConnection } from "@/lib/supabase"
import { db } from "@/lib/database-service"

export default function TestSupabasePage() {
  const [connectionStatus, setConnectionStatus] = useState<string>("Testando...")
  const [tables, setTables] = useState<any[]>([])
  const [users, setUsers] = useState<any[]>([])
  const [testResults, setTestResults] = useState<string[]>([])

  useEffect(() => {
    testSupabaseConnection()
  }, [])

  const testSupabaseConnection = async () => {
    const results: string[] = []

    try {
      // Test 1: Basic connection
      results.push("🔄 Testando conexão básica...")
      const isConnected = await testConnection()
      if (isConnected) {
        results.push("✅ Conexão básica: OK")
        setConnectionStatus("Conectado")
      } else {
        results.push("❌ Conexão básica: FALHOU")
        setConnectionStatus("Erro de conexão")
        setTestResults(results)
        return
      }

      // Test 2: List tables
      results.push("🔄 Verificando tabelas...")
      const { data: tablesData, error: tablesError } = await supabase
        .from("information_schema.tables")
        .select("table_name")
        .eq("table_schema", "public")

      if (tablesError) {
        results.push(`❌ Erro ao listar tabelas: ${tablesError.message}`)
      } else {
        const tableNames = tablesData?.map((t) => t.table_name) || []
        setTables(tableNames)
        results.push(`✅ Tabelas encontradas: ${tableNames.length}`)
        tableNames.forEach((name) => results.push(`   - ${name}`))
      }

      // Test 3: Test users table
      results.push("🔄 Testando tabela users...")
      try {
        const allUsers = await db.getAllUsers()
        setUsers(allUsers)
        results.push(`✅ Tabela users: ${allUsers.length} utilizadores encontrados`)
      } catch (error) {
        results.push(`❌ Erro na tabela users: ${error}`)
      }

      // Test 4: Test demo user
      results.push("🔄 Verificando utilizador demo...")
      try {
        const demoUser = await db.getUserByUsername("demo")
        if (demoUser) {
          results.push("✅ Utilizador demo encontrado")
        } else {
          results.push("⚠️ Utilizador demo não encontrado")
        }
      } catch (error) {
        results.push(`❌ Erro ao verificar demo user: ${error}`)
      }
    } catch (error) {
      results.push(`❌ Erro geral: ${error}`)
      setConnectionStatus("Erro")
    }

    setTestResults(results)
  }

  const createDemoUser = async () => {
    try {
      const result = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "demo",
          password: "password",
          name: "Demo User",
          email: "demo@morethanmoney.pt",
          role: "Membro",
        }),
      })

      if (result.ok) {
        setTestResults((prev) => [...prev, "✅ Utilizador demo criado com sucesso"])
        testSupabaseConnection() // Re-test
      } else {
        const error = await result.text()
        setTestResults((prev) => [...prev, `❌ Erro ao criar demo user: ${error}`])
      }
    } catch (error) {
      setTestResults((prev) => [...prev, `❌ Erro ao criar demo user: ${error}`])
    }
  }

  const testLogin = async () => {
    try {
      const result = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "demo",
          password: "password",
        }),
      })

      if (result.ok) {
        const userData = await result.json()
        setTestResults((prev) => [...prev, `✅ Login demo funcionou: ${userData.name}`])
      } else {
        const error = await result.text()
        setTestResults((prev) => [...prev, `❌ Login demo falhou: ${error}`])
      }
    } catch (error) {
      setTestResults((prev) => [...prev, `❌ Erro no login: ${error}`])
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Teste de Conexão Supabase</h1>

      {/* Status da Conexão */}
      <Card>
        <CardHeader>
          <CardTitle>Status da Conexão</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertDescription>
              Status: <strong>{connectionStatus}</strong>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Variáveis de Ambiente */}
      <Card>
        <CardHeader>
          <CardTitle>Variáveis de Ambiente</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div>
            <strong>NEXT_PUBLIC_SUPABASE_URL:</strong>
            <span className="ml-2 font-mono text-sm">
              {process.env.NEXT_PUBLIC_SUPABASE_URL ? "✅ Configurada" : "❌ Não configurada"}
            </span>
          </div>
          <div>
            <strong>NEXT_PUBLIC_SUPABASE_ANON_KEY:</strong>
            <span className="ml-2 font-mono text-sm">
              {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "✅ Configurada" : "❌ Não configurada"}
            </span>
          </div>
          <div className="text-sm text-gray-600">URL: {process.env.NEXT_PUBLIC_SUPABASE_URL}</div>
        </CardContent>
      </Card>

      {/* Tabelas */}
      <Card>
        <CardHeader>
          <CardTitle>Tabelas na Base de Dados</CardTitle>
        </CardHeader>
        <CardContent>
          {tables.length > 0 ? (
            <ul className="list-disc list-inside space-y-1">
              {tables.map((table, index) => (
                <li key={index} className="font-mono text-sm">
                  {table}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Nenhuma tabela encontrada ou erro na conexão</p>
          )}
        </CardContent>
      </Card>

      {/* Utilizadores */}
      <Card>
        <CardHeader>
          <CardTitle>Utilizadores na Base de Dados</CardTitle>
        </CardHeader>
        <CardContent>
          {users.length > 0 ? (
            <div className="space-y-2">
              {users.map((user, index) => (
                <div key={index} className="p-2 bg-gray-50 rounded">
                  <div>
                    <strong>Username:</strong> {user.username}
                  </div>
                  <div>
                    <strong>Nome:</strong> {user.name}
                  </div>
                  <div>
                    <strong>Admin:</strong> {user.is_admin ? "Sim" : "Não"}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Nenhum utilizador encontrado</p>
          )}
        </CardContent>
      </Card>

      {/* Ações de Teste */}
      <Card>
        <CardHeader>
          <CardTitle>Ações de Teste</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Button onClick={testSupabaseConnection}>🔄 Testar Conexão Novamente</Button>
            <Button onClick={createDemoUser} variant="outline">
              👤 Criar Utilizador Demo
            </Button>
            <Button onClick={testLogin} variant="outline">
              🔐 Testar Login Demo
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Resultados dos Testes */}
      <Card>
        <CardHeader>
          <CardTitle>Resultados dos Testes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-black text-green-400 p-4 rounded font-mono text-sm max-h-96 overflow-y-auto">
            {testResults.map((result, index) => (
              <div key={index}>{result}</div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
