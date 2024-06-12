import { api } from '@/lib/axios'

export interface ManagedEstablishmentResponse {
  name: string
  id: string
  createdAt: Date
  updatedAt: Date
  description: string | null
  managerId: string | null
}

export async function getManagedEstablishment() {
  const response =
    await api.get<ManagedEstablishmentResponse>('/get-establishment')

  return response.data
}
