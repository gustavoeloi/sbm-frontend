import { api } from '@/lib/axios'

export interface MonthRevenueResponse {
  revenue: number
  diffFromLastMonth: number
}

export async function getMonthRevenue() {
  const response = await api.get<MonthRevenueResponse>('/metrics/month-revenue')

  return response.data
}
