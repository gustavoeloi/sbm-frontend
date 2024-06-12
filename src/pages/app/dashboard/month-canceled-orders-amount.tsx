import { useQuery } from '@tanstack/react-query'
import { DollarSign } from 'lucide-react'

import { getMonthCanceledOrders } from '@/api/get-month-canceled-orders'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { MetricsCardSkeleton } from './metric-card-skeleton'

export function MonthCanceledOrdersAmount() {
  const { data: monthCanceledOrders } = useQuery({
    queryKey: ['metrics', 'month-canceled-orders'],
    queryFn: getMonthCanceledOrders,
  })

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Cancelamentos (mês)
        </CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        {monthCanceledOrders ? (
          <>
            <span className="text-2xl font-bold tracking-tighter">
              {monthCanceledOrders.amount}
            </span>
            <p className="text-xs text-muted-foreground">
              {monthCanceledOrders.diffFromLastMonth >= 0 ? (
                <>
                  <span className="text-rose-600 dark:text-rose-600">
                    +{monthCanceledOrders.diffFromLastMonth}%
                  </span>{' '}
                  em relação ao mês anterior
                </>
              ) : (
                <>
                  <span className="text-emerald-600 dark:text-emerald-600">
                    {monthCanceledOrders.diffFromLastMonth}%
                  </span>{' '}
                  em relação ao mês anterior
                </>
              )}
            </p>
          </>
        ) : (
          <MetricsCardSkeleton />
        )}
      </CardContent>
    </Card>
  )
}
