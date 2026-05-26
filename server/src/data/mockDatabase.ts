import type { Customer, Order, OrderItem, Product, Stock } from '../types/domain.js'

export const products: Product[] = [
  {
    id: 1,
    nome: 'Conector ERP',
    categoria: 'ERP',
    preco: 249.9,
    sku: 'LYNK-ERP-001',
  },
  {
    id: 2,
    nome: 'Sincronização CRM',
    categoria: 'CRM',
    preco: 199.9,
    sku: 'LYNK-CRM-002',
  },
  {
    id: 3,
    nome: 'Fluxo de Estoque',
    categoria: 'Operações',
    preco: 179.9,
    sku: 'LYNK-INV-003',
  },
]

export const customers: Customer[] = [
  {
    id: 101,
    nome: 'Marina Costa',
    email: 'marina.costa@empresa.com',
    cidade: 'Niterói',
    estado: 'RJ',
  },
  {
    id: 102,
    nome: 'Rafael Almeida',
    email: 'rafael.almeida@empresa.com',
    cidade: 'São Paulo',
    estado: 'SP',
  },
]

export const orders: Order[] = [
  {
    id: 5001,
    cliente_id: 101,
    status: 'confirmado',
    subtotal: 449.8,
    imposto: 44.98,
    total: 494.78,
    data_entrega: '2026-06-03',
  },
  {
    id: 5002,
    cliente_id: 102,
    status: 'pendente',
    subtotal: 179.9,
    imposto: 17.99,
    total: 197.89,
    data_entrega: '2026-06-05',
  },
]

export const orderItems: OrderItem[] = [
  {
    id: 1,
    pedido_id: 5001,
    produto_id: 1,
    quantidade: 1,
    preco_unitario: 249.9,
  },
  {
    id: 2,
    pedido_id: 5001,
    produto_id: 2,
    quantidade: 1,
    preco_unitario: 199.9,
  },
  {
    id: 3,
    pedido_id: 5002,
    produto_id: 3,
    quantidade: 1,
    preco_unitario: 179.9,
  },
]

export const stock: Stock[] = [
  {
    produto_id: 1,
    quantidade_disponivel: 150,
    quantidade_reservada: 10,
  },
  {
    produto_id: 2,
    quantidade_disponivel: 80,
    quantidade_reservada: 5,
  },
  {
    produto_id: 3,
    quantidade_disponivel: 40,
    quantidade_reservada: 12,
  },
]