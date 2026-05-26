import type { Product } from '../types/product'

export const products: Product[] = [
  {
    id: 1,
    name: 'Conector ERP',
    category: 'ERP',
    description:
      'Conecte pedidos, produtos e clientes do seu ERP com fluxos automatizados de integração.',
    price: 249,
    sku: 'LYNK-ERP-001',
    highlight: 'Integração operacional',
    features: ['Pedidos sincronizados', 'Produtos centralizados', 'Clientes atualizados'],
  },
  {
    id: 2,
    name: 'Sincronização CRM',
    category: 'CRM',
    description:
      'Mantenha dados comerciais sincronizados entre sistemas de vendas, atendimento e relacionamento.',
    price: 199,
    sku: 'LYNK-CRM-002',
    highlight: 'Dados comerciais conectados',
    features: ['Leads organizados', 'Contatos sincronizados', 'Histórico unificado'],
  },
  {
    id: 3,
    name: 'Fluxo de Estoque',
    category: 'Operações',
    description:
      'Automatize consultas de estoque e valide disponibilidade antes de processar pedidos.',
    price: 179,
    sku: 'LYNK-INV-003',
    highlight: 'Controle de estoque',
    features: ['Consulta de estoque', 'Reserva de itens', 'Validação operacional'],
  },
  {
    id: 4,
    name: 'Relatórios Inteligentes',
    category: 'Análise',
    description:
      'Transforme dados operacionais em relatórios claros para acompanhamento de performance.',
    price: 229,
    sku: 'LYNK-REP-004',
    highlight: 'Inteligência de dados',
    features: ['Indicadores em tempo real', 'Relatórios automáticos', 'Análise de pedidos'],
  },
  {
    id: 5,
    name: 'Automação de Processos',
    category: 'Automação',
    description:
      'Crie automações para reduzir tarefas manuais e padronizar processos entre sistemas.',
    price: 299,
    sku: 'LYNK-AUT-005',
    highlight: 'Processos automatizados',
    features: ['Fluxos customizados', 'Logs de execução', 'Redução de retrabalho'],
  },
]