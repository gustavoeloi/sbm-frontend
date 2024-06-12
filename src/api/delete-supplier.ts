import { api } from '@/lib/axios'

export interface DeleteSupplierParams {
  supplierId: string
}

export async function deleteSupplier({ supplierId }: DeleteSupplierParams) {
  await api.delete(`/suppliers/${supplierId}`)
}
