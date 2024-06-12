import { api } from '@/lib/axios'

export interface SupplierEditParams {
  supplierId: string
}

export interface SupplierEditBody {
  supplierName?: string
  email?: string
  address?: string
  identificationNumber?: string
  phone?: string
  uf?: string
  description?: string
}

export interface SupplierEditIput
  extends SupplierEditParams,
    SupplierEditBody {}

export async function editSupplier({
  supplierId,
  supplierName,
  email,
  address,
  identificationNumber,
  phone,
  uf,
  description,
}: SupplierEditIput) {
  await api.put(`/suppliers/${supplierId}`, {
    supplierName,
    email,
    address,
    identificationNumber,
    phone,
    uf,
    description,
  })
}
