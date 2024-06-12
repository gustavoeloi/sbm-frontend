import { api } from '@/lib/axios'

export interface SupplierParams {
  supplierId: string
}

export interface SupplierResponse {
  status: 'ativo' | 'inativo'
  id: string
  updatedAt: string
  createdAt: string
  description: string
  supplierName: string
  uf: string
  identificationNumber: string
  identificationType: 'cpf' | 'cnpj'
  address: string
  email: string
  phone: string
}

export async function getSupplierById({ supplierId }: SupplierParams) {
  const response = await api.get<SupplierResponse>(`/suppliers/${supplierId}`)

  return response.data
}
