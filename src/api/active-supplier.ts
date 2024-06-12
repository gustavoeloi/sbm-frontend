import { api } from '@/lib/axios'

export interface ActiveSupplierParams {
  supplierId: string
}

export async function setActiveSupplier({ supplierId }: ActiveSupplierParams) {
  await api.patch(`/suppliers/${supplierId}/active`)
}
