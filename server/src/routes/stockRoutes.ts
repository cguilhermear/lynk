import { Router } from 'express'

import { stock } from '../data/mockDatabase.js'

export const stockRoutes = Router()

stockRoutes.get('/estoque/:produto_id', (request, response) => {
  const productId = Number(request.params.produto_id)
  const stockItem = stock.find((item) => item.produto_id === productId)

  if (!stockItem) {
    return response.status(404).json({
      sucesso: false,
      erro: 'Estoque não encontrado para o produto informado.',
    })
  }

  return response.json({
    sucesso: true,
    dados: stockItem,
  })
})