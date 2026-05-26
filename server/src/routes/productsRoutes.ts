import { Router } from 'express'

import { products } from '../data/mockDatabase.js'

export const productsRoutes = Router()

productsRoutes.get('/produtos', (_request, response) => {
  return response.json({
    sucesso: true,
    dados: products,
  })
})