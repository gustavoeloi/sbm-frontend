import { api } from '@/lib/axios'

export interface OrderDetailsParams {
  orderId: string
}

export interface OrderDetailsResponse {
  id: string
  createdAt: string
  status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
  totalInCents: number
  customer: {
    name: string
    email: string
    phone: string | null
  }
  orderItems: {
    id: string
    totalInCents: number
    quantity: number
    product: {
      productName: string
    }
  }[]
}

export async function getOrderDetails({ orderId }: OrderDetailsParams) {
  const response = await api.get<OrderDetailsResponse>(`/orders/${orderId}`)

  return response.data
}
