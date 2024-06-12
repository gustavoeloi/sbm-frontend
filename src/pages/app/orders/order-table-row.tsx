import { useMutation, useQueryClient } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ArrowRight, LoaderCircle, Search, X } from 'lucide-react'
import { useState } from 'react'

import { approveOrder } from '@/api/approve-order'
import { cancelOrder } from '@/api/cancel-order'
import { DeliverOrder } from '@/api/deliver-order'
import { dispatchOrder } from '@/api/dispatch-order'
import { OrdersResponse } from '@/api/get-orders'
import { OrderStatus, OrderStatusType } from '@/components/order-status'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'

import { OrderDetails } from './order-details'

export interface OrderTableRowProps {
  order: {
    status: 'pending' | 'processing' | 'delivering' | 'delivered' | 'canceled'
    customerName: string
    orderId: string
    createdAt: string
    totalInCents: number
  }
}

export function OrderTableRow({ order }: OrderTableRowProps) {
  const queryClient = useQueryClient()

  function changeOrderStatusCache(orderId: string, status: OrderStatusType) {
    const ordersListCache = queryClient.getQueriesData<OrdersResponse>({
      queryKey: ['orders'],
    })

    ordersListCache.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) {
        return
      }

      queryClient.setQueryData<OrdersResponse>(cacheKey, {
        ...cacheData,
        orders: cacheData.orders.map((order) => {
          if (order.orderId === orderId) {
            return { ...order, status }
          }

          return order
        }),
      })
    })
  }

  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  const { mutateAsync: cancelOrderFn, isPending: isCancelingOrder } =
    useMutation({
      mutationFn: cancelOrder,
      async onSuccess(_, { orderId }) {
        changeOrderStatusCache(orderId, 'canceled')
      },
    })

  const { mutateAsync: approveOrderFn, isPending: isApprovingOrder } =
    useMutation({
      mutationFn: approveOrder,
      async onSuccess(_, { orderId }) {
        changeOrderStatusCache(orderId, 'processing')
      },
    })

  const { mutateAsync: dispatchOrderFn, isPending: isDispatchingOrder } =
    useMutation({
      mutationFn: dispatchOrder,
      async onSuccess(_, { orderId }) {
        changeOrderStatusCache(orderId, 'delivering')
      },
    })

  const { mutateAsync: deliverOrderFn, isPending: isDeliveringOrder } =
    useMutation({
      mutationFn: DeliverOrder,
      async onSuccess(_, { orderId }) {
        changeOrderStatusCache(orderId, 'delivered')
      },
    })

  return (
    <TableRow>
      <TableCell>
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogTrigger asChild>
            <Button variant={'outline'} className="xs">
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes do Pedidos</span>
            </Button>
          </DialogTrigger>
          <OrderDetails orderId={order.orderId} modalIsOpen={isDetailsOpen} />
        </Dialog>
      </TableCell>
      <TableCell className="font-mono text-sm font-medium">
        {order.orderId}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {formatDistanceToNow(order.createdAt, {
          locale: ptBR,
          addSuffix: true,
        })}
      </TableCell>
      <TableCell>
        <OrderStatus status={order.status} />
      </TableCell>
      <TableCell className="font-medium">{order?.customerName}</TableCell>
      <TableCell className="font-medium">
        {(order?.totalInCents / 100).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      </TableCell>
      <TableCell>
        {order.status === 'pending' && (
          <Button
            variant={'outline'}
            onClick={() => approveOrderFn({ orderId: order.orderId })}
            disabled={isApprovingOrder}
          >
            <ArrowRight className="mr-2 h-3 w-3" />
            {isApprovingOrder ? (
              <>
                <LoaderCircle className="animate-spin" color="#f97316" />
              </>
            ) : (
              'Aprovar'
            )}
          </Button>
        )}

        {order.status === 'processing' && (
          <Button
            variant={'outline'}
            onClick={() => dispatchOrderFn({ orderId: order.orderId })}
            disabled={isDispatchingOrder}
          >
            <ArrowRight className="mr-2 h-3 w-3" />
            {isDispatchingOrder ? (
              <>
                <LoaderCircle className="animate-spin" color="#f97316" />
              </>
            ) : (
              'Em entrega'
            )}
          </Button>
        )}

        {order.status === 'delivering' && (
          <Button
            variant={'outline'}
            onClick={() => deliverOrderFn({ orderId: order.orderId })}
            disabled={isDeliveringOrder}
          >
            <ArrowRight className="mr-2 h-3 w-3" />
            {isDispatchingOrder ? (
              <>
                <LoaderCircle className="animate-spin" color="#f97316" />
              </>
            ) : (
              'Entregue'
            )}
          </Button>
        )}
      </TableCell>
      <TableCell>
        <Button
          disabled={
            !['pending', 'processing'].includes(order.status) ||
            isCancelingOrder
          }
          variant={'ghost'}
          size="xs"
          onClick={() => cancelOrderFn({ orderId: order.orderId })}
          className="flex items-center justify-center"
        >
          {isCancelingOrder ? (
            <LoaderCircle className="animate-spin" color="#f97316" />
          ) : (
            <>
              <X className="mr-2 h-3 w-3" />
              Cancelar
            </>
          )}
        </Button>
      </TableCell>
    </TableRow>
  )
}
