import { api } from '@/lib/axios'

export interface registerEstablishmentBody {
  establishmentName: string
  managerName: string
  email: string
  phone: string
}

export async function registerEstablishment({
  establishmentName,
  managerName,
  email,
  phone,
}: registerEstablishmentBody) {
  await api.post('/establishments', {
    establishmentName,
    managerName,
    email,
    phone,
  })
}
