import { Router } from 'express'

import { orderItems, orders, products } from '../data/mockDatabase.js'
import type { CreateOrderRequest, UpdateOrderStatusRequest } from '../types/domain.js'

export const ordersRoutes = Router()

ordersRoutes.post('/pedidos', (request, response) => {
  const body = request.body as CreateOrderRequest

  if (!body.cliente_id || !body.data_entrega || !Array.isArray(body.itens)) {
    return response.status(400).json({
      sucesso: false,
      erro: 'Payload inválido. Informe cliente_id, data_entrega e itens.',
    })
  }

  if (body.itens.length === 0) {
    return response.status(400).json({
      sucesso: false,
      erro: 'O pedido deve conter pelo menos um item.',
    })
  }

  const invalidItem = body.itens.find((item) => item.quantidade <= 0)

  if (invalidItem) {
    return response.status(400).json({
      sucesso: false,
      erro: 'Todos os itens devem ter quantidade maior que zero.',
    })
  }

  const subtotal = body.itens.reduce((total, item) => {
    const product = products.find((currentProduct) => currentProduct.id === item.produto_id)
    return total + (product?.preco ?? 0) * item.quantidade
  }, 0)

  const imposto = Number((subtotal * 0.1).toFixed(2))
  const total = Number((subtotal + imposto).toFixed(2))
  const pedidoId = 5000 + orders.length + 1

  const newOrder = {
    id: pedidoId,
    cliente_id: body.cliente_id,
    status: 'pendente' as const,
    subtotal: Number(subtotal.toFixed(2)),
    imposto,
    total,
    data_entrega: body.data_entrega,
  }

  orders.push(newOrder)

  return response.status(201).json({
    sucesso: true,
    dados: {
      pedido_id: newOrder.id,
      cliente_id: newOrder.cliente_id,
      status: newOrder.status,
      total: newOrder.total,
      criado_em: new Date().toISOString(),
    },
  })
})

ordersRoutes.get('/pedidos/:pedido_id', (request, response) => {
  const orderId = Number(request.params.pedido_id)
  const order = orders.find((currentOrder) => currentOrder.id === orderId)

  if (!order) {
    return response.status(404).json({
      sucesso: false,
      erro: 'Pedido não encontrado.',
    })
  }

  const items = orderItems
    .filter((item) => item.pedido_id === order.id)
    .map((item) => ({
      produto_id: item.produto_id,
      quantidade: item.quantidade,
      preco_unitario: item.preco_unitario,
      total: Number((item.quantidade * item.preco_unitario).toFixed(2)),
    }))

  return response.json({
    sucesso: true,
    dados: {
      pedido_id: order.id,
      cliente_id: order.cliente_id,
      status: order.status,
      itens: items,
      total: order.total,
    },
  })
})

ordersRoutes.patch('/pedidos/:pedido_id', (request, response) => {
  const orderId = Number(request.params.pedido_id)
  const body = request.body as UpdateOrderStatusRequest

  const order = orders.find((currentOrder) => currentOrder.id === orderId)

  if (!order) {
    return response.status(404).json({
      sucesso: false,
      erro: 'Pedido não encontrado.',
    })
  }

  if (!body.status) {
    return response.status(400).json({
      sucesso: false,
      erro: 'Informe o novo status do pedido.',
    })
  }

  order.status = body.status
  order.numero_rastreamento = body.numero_rastreamento

  return response.json({
    sucesso: true,
    dados: {
      pedido_id: order.id,
      status: order.status,
      atualizado_em: new Date().toISOString(),
    },
  })
})