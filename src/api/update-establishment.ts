import { api } from '@/lib/axios'

export interface UpdateEstablishmentBody {
  name: string
  description: string
}

export async function updateEstablishment({
  name,
  description,
}: UpdateEstablishmentBody) {
  await api.put('/update-establishment', {
    name,
    description,
  })
}
