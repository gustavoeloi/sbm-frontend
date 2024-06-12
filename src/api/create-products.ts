import { api } from '@/lib/axios'

export interface CreateProductBody {
  productName: string
  description: string
  priceInCents: number
  quantityInStock: number
}

export async function createProduct({
  productName,
  description,
  priceInCents,
  quantityInStock,
}: CreateProductBody) {
  await api.post('/products', {
    productName,
    description,
    priceInCents,
    quantityInStock,
  })
}
