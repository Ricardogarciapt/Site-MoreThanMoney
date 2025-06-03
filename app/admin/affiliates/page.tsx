export default function AffiliatesPage() {
  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Sistema de Afiliados</h1>
          <p className="text-gray-400">Gerencie códigos de afiliado e comissões dos membros MoreThanMoney.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-black/50 border border-green-500/30 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-300">Afiliados Ativos</p>
                <p className="text-2xl font-bold text-green-400">0</p>
              </div>
              <div className="text-green-500 text-2xl">👥</div>
            </div>
          </div>

          <div className="bg-black/50 border border-yellow-500/30 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-300">Comissões Pendentes</p>
                <p className="text-2xl font-bold text-yellow-400">€0.00</p>
              </div>
              <div className="text-yellow-500 text-2xl">💰</div>
            </div>
          </div>

          <div className="bg-black/50 border border-purple-500/30 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-300">Total Pago</p>
                <p className="text-2xl font-bold text-purple-400">€0.00</p>
              </div>
              <div className="text-purple-500 text-2xl">📈</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sistema de Afiliados */}
          <div className="bg-black/50 border border-orange-500/30 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">Sistema de Afiliados</h2>
            <div className="space-y-4">
              <div className="p-4 bg-gray-700/50 rounded-lg border border-gray-600">
                <h3 className="font-medium text-white mb-2">Funcionalidades Disponíveis:</h3>
                <ul className="text-gray-300 space-y-1 text-sm">
                  <li>• Gerar códigos de afiliado para membros VIP, Premium, Gold e Platinum</li>
                  <li>• Visualizar comissões pendentes e pagas</li>
                  <li>• Gerenciar status de pagamentos</li>
                  <li>• Relatórios de performance de afiliados</li>
                </ul>
              </div>

              <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <h4 className="font-medium text-blue-400 mb-2">Status do Sistema</h4>
                <p className="text-blue-300 text-sm">
                  Sistema de afiliados ativo e funcionando. Todas as funcionalidades estão disponíveis.
                </p>
              </div>
            </div>
          </div>

          {/* Como Funciona */}
          <div className="bg-black/50 border border-orange-500/30 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">Como Funciona</h2>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-white mb-3">Para Administradores:</h4>
                <ul className="text-gray-300 space-y-1 text-sm">
                  <li>1. Identifique membros elegíveis (VIP+)</li>
                  <li>2. Gere códigos de afiliado únicos</li>
                  <li>3. Monitore performance e vendas</li>
                  <li>4. Processe pagamentos mensais</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-white mb-3">Para Afiliados:</h4>
                <ul className="text-gray-300 space-y-1 text-sm">
                  <li>1. Receba seu código único</li>
                  <li>2. Compartilhe com sua rede</li>
                  <li>3. Acompanhe suas vendas</li>
                  <li>4. Receba comissões mensais</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="/admin-dashboard"
            className="inline-flex items-center px-4 py-2 border border-orange-500 text-orange-400 rounded-md hover:bg-orange-500/10 transition-colors"
          >
            ← Voltar para o Painel
          </a>
          <a
            href="/admin/affiliates/create"
            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            Criar Novo Afiliado
          </a>
          <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Gerar Relatório
          </button>
        </div>
      </div>
    </div>
  )
}
