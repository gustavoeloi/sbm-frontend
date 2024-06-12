import { api } from '@/lib/axios'

export interface SupplierBody {
  description?: string
  supplierName: string
  uf: string
  identificationNumber: string
  address: string
  email: string
  phone: string
}

export async function addSuplier(data: SupplierBody) {
  await api.post('/suppliers', data)
}
