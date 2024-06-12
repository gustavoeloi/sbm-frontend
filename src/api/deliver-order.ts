import { api } from '@/lib/axios'

export interface DeliverOrderParams {
  orderId: string
}

export async function DeliverOrder({ orderId }: DeliverOrderParams) {
  await api.patch<DeliverOrderParams>(`/orders/${orderId}/deliver`)
}
