export type Product = {
  id: number
  nome: string
  categoria: string
  preco: number
  sku: string
}

export type Customer = {
  id: number
  nome: string
  email: string
  cidade: string
  estado: string
}

export type Order = {
  id: number
  cliente_id: number
  status: 'pendente' | 'confirmado' | 'enviado' | 'cancelado'
  subtotal: number
  imposto: number
  total: number
  data_entrega: string
  numero_rastreamento?: string
}

export type OrderItem = {
  id: number
  pedido_id: number
  produto_id: number
  quantidade: number
  preco_unitario: number
}

export type Stock = {
  produto_id: number
  quantidade_disponivel: number
  quantidade_reservada: number
}

export type CreateOrderRequest = {
  cliente_id: number
  itens: {
    produto_id: number
    quantidade: number
  }[]
  data_entrega: string
}

export type UpdateOrderStatusRequest = {
  status: Order['status']
  numero_rastreamento?: string
}