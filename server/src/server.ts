import cors from 'cors'
import express from 'express'

import { ordersRoutes } from './routes/ordersRoutes.js'
import { productsRoutes } from './routes/productsRoutes.js'
import { stockRoutes } from './routes/stockRoutes.js'

const app = express()
const PORT = 3333

app.use(cors())
app.use(express.json())

app.get('/health', (_request, response) => {
  return response.json({
    success: true,
    status: 'online',
    service: 'LYNK API',
    message: 'Servidor Node.js em execução.',
  })
})

app.use(productsRoutes)
app.use(stockRoutes)
app.use(ordersRoutes)

app.listen(PORT, () => {
  console.log(`LYNK API running on http://localhost:${PORT}`)
})