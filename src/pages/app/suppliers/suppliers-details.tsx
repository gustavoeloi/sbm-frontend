import { DialogTitle } from '@radix-ui/react-dialog'
import { useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'

import { getSupplierById } from '@/api/get-supplier-by-id'
import { DialogContent, DialogHeader } from '@/components/ui/dialog'
import { Table, TableCaption, TableCell, TableRow } from '@/components/ui/table'

export interface SupplierDetailsProps {
  supplierId: string
  modaIsOpen: boolean
}

export function SupplierDetails({
  supplierId,
  modaIsOpen,
}: SupplierDetailsProps) {
  const { data: supplier } = useQuery({
    queryKey: ['supplier', supplierId],
    queryFn: () => getSupplierById({ supplierId }),
    enabled: modaIsOpen,
  })

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-center text-xl font-bold text-foreground">
          Detalhes do Fornecedor
        </DialogTitle>
      </DialogHeader>
      {supplier ? (
        <Table className="space-y-6">
          <TableCaption>Detalhes do Fornecedor</TableCaption>

          <TableRow>
            <TableCell className="text-muted-foreground">
              Nome do Fornecedor
            </TableCell>
            <TableCell className="flex justify-end">
              {supplier.supplierName}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="text-muted-foreground">
              CNPJ/CPF do Fornecedor
            </TableCell>
            <TableCell className="flex justify-end">
              {supplier.identificationNumber}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="text-muted-foreground">
              E-mail do Fornecedor
            </TableCell>
            <TableCell className="flex justify-end">{supplier.email}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="text-muted-foreground">
              Telefone do Fornecedor
            </TableCell>
            <TableCell className="flex justify-end">{supplier.phone}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="text-muted-foreground">
              Endereço do Fornecedor
            </TableCell>
            <TableCell className="flex justify-end">
              {supplier.address} - {supplier.uf}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="text-muted-foreground">Status</TableCell>
            <TableCell className="flex justify-end">
              <div className="flex items-center gap-2">
                {supplier.status === 'ativo' && (
                  <>
                    <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                    <span className="text-muted-foreground">Ativo</span>
                  </>
                )}

                {supplier.status === 'inativo' && (
                  <>
                    <span className="h-2 w-2 rounded-full bg-rose-400"></span>
                    <span className="text-muted-foreground">Inativo</span>
                  </>
                )}
              </div>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="text-muted-foreground">
              Descrição do Fornecedor
            </TableCell>
            <TableCell className="flex justify-end">
              {supplier.description}
            </TableCell>
          </TableRow>
        </Table>
      ) : (
        <div className="flex items-center justify-center">
          <Loader2 className="h-52 w-24 animate-spin" />
        </div>
      )}
    </DialogContent>
  )
}
