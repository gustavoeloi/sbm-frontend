import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Pen, Trash, TruckIcon } from 'lucide-react'
import { useState } from 'react'

import { setActiveSupplier } from '@/api/active-supplier'
import { deleteSupplier } from '@/api/delete-supplier'
import { setInativeSupplier } from '@/api/inative-supplier'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'
import { SupplierDetails } from '@/pages/app/suppliers/suppliers-details'

import { SuppliersEdit } from './suppliers-edit'

export interface SupplierTableProps {
  supplier: {
    status: 'ativo' | 'inativo'
    id: string
    createdAt: string
    updatedAt: string
    description: string
    supplierName: string
    uf: string
    identificationNumber: string
    identificationType: 'cpf' | 'cnpj'
    address: string
    email: string
    phone: string
  }
}

export function SuppliersTableRow({ supplier }: SupplierTableProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)

  const queryClient = useQueryClient()

  const { mutateAsync: deleteSupplierFn } = useMutation({
    mutationFn: () => deleteSupplier({ supplierId: supplier.id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['suppliers'] })
    },
  })

  const {
    mutateAsync: setInativeSupplierFn,
    isPending: isInativeSupplierLoading,
  } = useMutation({
    mutationFn: () => setInativeSupplier({ supplierId: supplier.id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['suppliers'] })
    },
  })

  const {
    mutateAsync: setActiveSupplierFn,
    isPending: isActiveSupplierLoading,
  } = useMutation({
    mutationFn: () => setActiveSupplier({ supplierId: supplier.id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['suppliers'] })
    },
  })

  return (
    <TableRow>
      <TableCell>
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogTrigger asChild>
            <Button variant={'outline'} className="xs">
              <TruckIcon className="h-3 w-3" />
              <span className="sr-only">Detalhes do Pedidos</span>
            </Button>
          </DialogTrigger>
          <SupplierDetails
            supplierId={supplier.id}
            modaIsOpen={isDetailsOpen}
          />
        </Dialog>
      </TableCell>
      <TableCell className="font-mono text-sm font-medium">
        {supplier.id}
      </TableCell>
      <TableCell className="font-medium">{supplier.supplierName}</TableCell>
      <TableCell className="text-muted-foreground">
        {supplier.identificationNumber}
      </TableCell>
      <TableCell className="text-muted-foreground">{supplier.email}</TableCell>
      <TableCell className="text-muted-foreground">{supplier.phone}</TableCell>
      <TableCell>
        {supplier.status === 'ativo' && (
          <Button
            className="flex items-center gap-2"
            variant={'ghost'}
            onClick={() => setInativeSupplierFn()}
            disabled={isInativeSupplierLoading}
          >
            <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
            <span className="text-muted-foreground">Ativo</span>
          </Button>
        )}

        {supplier.status === 'inativo' && (
          <Button
            variant={'ghost'}
            className="flex items-center gap-2"
            onClick={() => setActiveSupplierFn()}
            disabled={isActiveSupplierLoading}
          >
            <span className="h-2 w-2 rounded-full bg-rose-400"></span>
            <span className="text-muted-foreground">Inativo</span>
          </Button>
        )}
      </TableCell>
      <TableCell>
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="xs">
              <Pen className="mr-2 h-3 w-3" />
              Editar
            </Button>
          </DialogTrigger>
          <SuppliersEdit supplierId={supplier.id} modaIsOpen={isEditOpen} />
        </Dialog>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Trash className="mr-2 h-3 w-3" />
              Excluir
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Excluir Fornecedor - {supplier.supplierName}
              </AlertDialogTitle>
              <AlertDialogDescription>
                Você tem certeza que deseja excluir esse fornecedor? Ao fazer
                isso, não será possível recuperar os dados cadastrador do
                Fornecedor
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={() => deleteSupplierFn()}>
                Excluir
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </TableCell>
    </TableRow>
  )
}
