import { useQuery } from '@tanstack/react-query'
import { Beer } from 'lucide-react'

import { getMonthOrdersAmount } from '@/api/get-month-orders-amount'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { MetricsCardSkeleton } from './metric-card-skeleton'

export function MonthOrderAmountCard() {
  const { data: monthOrdersAmount } = useQuery({
    queryKey: ['metrics', 'month-orders-amount'],
    queryFn: getMonthOrdersAmount,
  })

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">Pedidos (mês)</CardTitle>
        <Beer className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        {monthOrdersAmount ? (
          <>
            <span className="text-2xl font-bold tracking-tighter">
              {monthOrdersAmount.amount} pedido(s)
            </span>
            <p className="text-xs text-muted-foreground">
              {monthOrdersAmount.diffFromLastMonth >= 0 ? (
                <>
                  <span className="text-emerald-600  dark:text-emerald-700">
                    +{monthOrdersAmount.diffFromLastMonth}%
                  </span>{' '}
                  em relação ao mês passado
                </>
              ) : (
                <>
                  <span className="text-rose-600  dark:text-rose-700">
                    {monthOrdersAmount.diffFromLastMonth}%
                  </span>{' '}
                  em relação ao mês passado
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
