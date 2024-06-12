import { api } from '@/lib/axios'

export interface MonthCanceledOrdersResponse {
  amount: number
  diffFromLastMonth: number
}

export async function getMonthCanceledOrders() {
  const response = await api.get<MonthCanceledOrdersResponse>(
    '/metrics/month-canceled-orders-amount',
  )

  return response.data
}
