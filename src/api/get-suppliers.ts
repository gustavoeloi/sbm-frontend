import { api } from '@/lib/axios'

export type supplierResponse = {
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
}[]

export async function getSuppliers() {
  const response = await api.get<supplierResponse>('/suppliers')

  return response.data
}
