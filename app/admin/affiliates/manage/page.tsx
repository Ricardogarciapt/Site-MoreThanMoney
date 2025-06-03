export default function ManageAffiliatesPage() {
  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Gerenciar Afiliados</h1>
          <p className="text-gray-400">Visualize e gerencie todos os afiliados ativos.</p>
        </div>

        {/* Filtros */}
        <div className="bg-black/50 border border-gray-700 rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
              <select className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-white">
                <option>Todos</option>
                <option>Ativo</option>
                <option>Inativo</option>
                <option>Pendente</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Nível</label>
              <select className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-white">
                <option>Todos</option>
                <option>VIP</option>
                <option>Premium</option>
                <option>Gold</option>
                <option>Platinum</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Período</label>
              <select className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-white">
                <option>Último mês</option>
                <option>Últimos 3 meses</option>
                <option>Último ano</option>
                <option>Todos</option>
              </select>
            </div>
            <div className="flex items-end">
              <button className="w-full bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors">
                Filtrar
              </button>
            </div>
          </div>
        </div>

        {/* Tabela de Afiliados */}
        <div className="bg-black/50 border border-gray-700 rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-700">
            <h3 className="text-lg font-medium text-white">Lista de Afiliados</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Afiliado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Código
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Nível
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Vendas
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Comissão
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-black/30 divide-y divide-gray-700">
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-400">
                    Nenhum afiliado encontrado. Comece criando o primeiro afiliado.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="/admin/affiliates"
            className="inline-flex items-center px-4 py-2 border border-orange-500 text-orange-400 rounded-md hover:bg-orange-500/10 transition-colors"
          >
            ← Voltar
          </a>
          <button className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            + Novo Afiliado
          </button>
          <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Exportar Lista
          </button>
        </div>
      </div>
    </div>
  )
}
