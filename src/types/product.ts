export type ProductCategory =
  | 'ERP'
  | 'CRM'
  | 'Automação'
  | 'Análise'
  | 'Operações'

export type Product = {
  id: number
  name: string
  category: ProductCategory
  description: string
  price: number
  sku: string
  features: string[]
  highlight: string
}