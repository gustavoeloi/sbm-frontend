import { api } from '@/lib/axios'

export interface EditProductParams {
  productId: string
}

export interface EditProductBody {
  productName: string
  description: string
  priceInCents: number
  quantityInStock: number
}

export interface EditProductInput extends EditProductBody, EditProductParams {}

export async function editProduct({
  productName,
  description,
  priceInCents,
  quantityInStock,
  productId,
}: EditProductInput) {
  await api.put(`/products/${productId}`, {
    productName,
    description,
    priceInCents,
    quantityInStock,
  })
}
