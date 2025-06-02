"use client"

import type React from "react"

export default function AffiliateManagerPage() {
  const handleMouseOver = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.backgroundColor = "rgba(217, 119, 6, 0.1)"
  }

  const handleMouseOut = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.backgroundColor = "transparent"
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "black", padding: "2rem" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", color: "white" }}>
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "0.5rem" }}>Gestão de Afiliados</h1>
          <p style={{ color: "#9CA3AF" }}>Gerencie os códigos de afiliado e comissões dos membros MoreThanMoney.</p>
        </div>

        <div style={{ display: "grid", gap: "1.5rem" }}>
          {/* Stats Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1rem" }}>
            {/* Card 1 */}
            <div
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                border: "1px solid rgba(34, 197, 94, 0.3)",
                borderRadius: "0.5rem",
                padding: "1.5rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <p style={{ fontSize: "0.875rem", fontWeight: "500", color: "#86EFAC" }}>Afiliados Ativos</p>
                  <p style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#4ADE80" }}>0</p>
                </div>
                <div style={{ width: "2rem", height: "2rem", color: "#22C55E" }}>👥</div>
              </div>
            </div>

            {/* Card 2 */}
            <div
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                border: "1px solid rgba(234, 179, 8, 0.3)",
                borderRadius: "0.5rem",
                padding: "1.5rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <p style={{ fontSize: "0.875rem", fontWeight: "500", color: "#FDE047" }}>Comissões Pendentes</p>
                  <p style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#FACC15" }}>€0.00</p>
                </div>
                <div style={{ width: "2rem", height: "2rem", color: "#EAB308" }}>💰</div>
              </div>
            </div>

            {/* Card 3 */}
            <div
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                border: "1px solid rgba(168, 85, 247, 0.3)",
                borderRadius: "0.5rem",
                padding: "1.5rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <p style={{ fontSize: "0.875rem", fontWeight: "500", color: "#C4B5FD" }}>Total Pago</p>
                  <p style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#A855F7" }}>€0.00</p>
                </div>
                <div style={{ width: "2rem", height: "2rem", color: "#A855F7" }}>📈</div>
              </div>
            </div>
          </div>

          {/* Sistema de Afiliados */}
          <div
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              border: "1px solid rgba(217, 119, 6, 0.3)",
              borderRadius: "0.5rem",
              padding: "1.5rem",
            }}
          >
            <div style={{ marginBottom: "1rem" }}>
              <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", color: "white", marginBottom: "0.5rem" }}>
                Sistema de Afiliados
              </h2>
              <p style={{ color: "#9CA3AF", fontSize: "0.875rem" }}>
                Gerencie códigos de afiliado e comissões dos membros.
              </p>
            </div>

            <div style={{ display: "grid", gap: "1rem" }}>
              <div
                style={{
                  padding: "1rem",
                  backgroundColor: "rgba(75, 85, 99, 0.5)",
                  borderRadius: "0.5rem",
                  border: "1px solid rgba(75, 85, 99, 1)",
                }}
              >
                <h3 style={{ fontWeight: "500", color: "white", marginBottom: "0.5rem" }}>
                  Funcionalidades Disponíveis:
                </h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, color: "#D1D5DB" }}>
                  <li style={{ marginBottom: "0.5rem" }}>
                    • Gerar códigos de afiliado para membros VIP, Premium, Gold e Platinum
                  </li>
                  <li style={{ marginBottom: "0.5rem" }}>• Visualizar comissões pendentes e pagas</li>
                  <li style={{ marginBottom: "0.5rem" }}>• Gerenciar status de pagamentos</li>
                  <li>• Relatórios de performance de afiliados</li>
                </ul>
              </div>

              <div
                style={{
                  padding: "1rem",
                  backgroundColor: "rgba(59, 130, 246, 0.1)",
                  border: "1px solid rgba(59, 130, 246, 0.3)",
                  borderRadius: "0.5rem",
                }}
              >
                <h4 style={{ fontWeight: "500", color: "#60A5FA", marginBottom: "0.5rem" }}>Status do Sistema</h4>
                <p style={{ color: "#93C5FD", fontSize: "0.875rem", margin: 0 }}>
                  Sistema de afiliados ativo e funcionando. Todas as funcionalidades estão disponíveis.
                </p>
              </div>
            </div>
          </div>

          {/* Instruções */}
          <div
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              border: "1px solid rgba(217, 119, 6, 0.3)",
              borderRadius: "0.5rem",
              padding: "1.5rem",
            }}
          >
            <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", color: "white", marginBottom: "1rem" }}>
              Como Funciona
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1rem" }}>
              <div>
                <h4 style={{ fontWeight: "500", color: "white", marginBottom: "0.75rem" }}>Para Administradores:</h4>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, color: "#D1D5DB", fontSize: "0.875rem" }}>
                  <li style={{ marginBottom: "0.25rem" }}>1. Identifique membros elegíveis (VIP+)</li>
                  <li style={{ marginBottom: "0.25rem" }}>2. Gere códigos de afiliado únicos</li>
                  <li style={{ marginBottom: "0.25rem" }}>3. Monitore performance e vendas</li>
                  <li>4. Processe pagamentos mensais</li>
                </ul>
              </div>
              <div>
                <h4 style={{ fontWeight: "500", color: "white", marginBottom: "0.75rem" }}>Para Afiliados:</h4>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, color: "#D1D5DB", fontSize: "0.875rem" }}>
                  <li style={{ marginBottom: "0.25rem" }}>1. Receba seu código único</li>
                  <li style={{ marginBottom: "0.25rem" }}>2. Compartilhe com sua rede</li>
                  <li style={{ marginBottom: "0.25rem" }}>3. Acompanhe suas vendas</li>
                  <li>4. Receba comissões mensais</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Botão Voltar */}
        <div style={{ marginTop: "2rem" }}>
          <a
            href="/admin-dashboard"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "0.5rem 1rem",
              border: "1px solid rgba(217, 119, 6, 1)",
              color: "#FBBF24",
              textDecoration: "none",
              borderRadius: "0.375rem",
              backgroundColor: "transparent",
              transition: "background-color 0.2s",
            }}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            ← Voltar para o Painel
          </a>
        </div>
      </div>
    </div>
  )
}
