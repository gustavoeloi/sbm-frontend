import { useQuery } from '@tanstack/react-query'
import { Beer } from 'lucide-react'

import { getDayOrdersAmount } from '@/api/get-day-orders-amount'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { MetricsCardSkeleton } from './metric-card-skeleton'

export function DayOrdersAmountCard() {
  const { data: dayOrdersAmount } = useQuery({
    queryKey: ['metrics', 'day-orders-amount'],
    queryFn: getDayOrdersAmount,
  })

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">Pedidos (dia)</CardTitle>
        <Beer className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        {dayOrdersAmount ? (
          <>
            <span className="text-2xl font-bold tracking-tighter">
              {dayOrdersAmount.amount}
            </span>
            <p className="text-xs text-muted-foreground">
              {dayOrdersAmount.diffFromLastDay >= 0 ? (
                <>
                  <span className="text-emerald-600 dark:text-rose-600">
                    -{dayOrdersAmount.diffFromLastDay}%
                  </span>{' '}
                  em relação ao dia anterior
                </>
              ) : (
                <>
                  <span className="text-rose-600 dark:text-rose-600">
                    {dayOrdersAmount.diffFromLastDay}%
                  </span>{' '}
                  em relação ao dia anterior
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
