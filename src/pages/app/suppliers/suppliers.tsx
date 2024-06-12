import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'

import { getSuppliers } from '@/api/get-suppliers'
// import { Pagination } from '@/components/pagination'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { SupplierTableSkeleton } from './supplier-table-skeleton'
import { SuppliersTableFilters } from './suppliers-table-filters'
import { SuppliersTableRow } from './suppliers-table-row'

export function Suppliers() {
  const { data: suppliers } = useQuery({
    queryKey: ['suppliers'],
    queryFn: getSuppliers,
  })

  return (
    <>
      <Helmet title="Fornecedores" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tighter">Fornecedores</h1>

        <div className="space-y-2.5">
          <SuppliersTableFilters />

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[64px]"></TableHead>
                  <TableHead className="w-[140px]">Identificador</TableHead>
                  <TableHead className="w-[320px]">Nome</TableHead>
                  <TableHead>CNPJ | CPF</TableHead>
                  <TableHead>E-mail</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {suppliers ? (
                  suppliers.map((supplier) => {
                    return (
                      <SuppliersTableRow
                        key={supplier.id}
                        supplier={supplier}
                      />
                    )
                  })
                ) : (
                  <SupplierTableSkeleton />
                )}
              </TableBody>
            </Table>
          </div>
          {/* <Pagination pageIndex={0} totalCount={105} perPage={10} /> */}
        </div>
      </div>
    </>
  )
}
