import { api } from '@/lib/axios'

export interface getProfileResponse {
  name: string
  id: string
  email: string
  phone: string | null
  role: 'manager' | 'customer'
  createdAt: Date
  updatedAt: Date
}

export async function getProfile() {
  const response = await api.get<getProfileResponse>('/me')

  return response.data
}
