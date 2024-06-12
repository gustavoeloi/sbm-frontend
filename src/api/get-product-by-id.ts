import { api } from '@/lib/axios'

export interface ProductByIdParams {
  productId: string
}

export interface ProductByIdResponse {
  id: string
  createdAt: string
  updatedAt: string
  description: string
  establishmentId: string
  productName: string
  priceInCents: number
  quantityInStock: number
}

export async function getProductById({ productId }: ProductByIdParams) {
  const response = await api.get<ProductByIdResponse>(`/products/${productId}`)

  return response.data
}
