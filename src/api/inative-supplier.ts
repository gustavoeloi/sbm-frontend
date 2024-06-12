import { api } from '@/lib/axios'

export interface InativeSupplierParams {
  supplierId: string
}

export async function setInativeSupplier({
  supplierId,
}: InativeSupplierParams) {
  await api.patch(`/suppliers/${supplierId}/inative`)
}
