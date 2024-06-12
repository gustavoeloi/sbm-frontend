import { api } from '@/lib/axios'

export interface dailyRevenueInPeriodQuery {
  from?: Date
  to?: Date
}

export type DailyRevenueInPeriodResponse = {
  date: string
  revenue: number
}[]

export async function getDailyRevenueInPeriod({
  from,
  to,
}: dailyRevenueInPeriodQuery) {
  const response = await api.get('/metrics/daily-revenue-in-period', {
    params: {
      from,
      to,
    },
  })

  return response.data
}
