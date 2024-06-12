import { api } from '@/lib/axios'

export type ProductResponse = {
  id: string
  createdAt: Date
  updatedAt: Date
  description: string | null
  establishmentId: string
  productName: string
  priceInCents: number
  quantityInStock: number
}[]

export async function getProducts() {
  const response = await api.get<ProductResponse>('/products')

  return response.data
}
