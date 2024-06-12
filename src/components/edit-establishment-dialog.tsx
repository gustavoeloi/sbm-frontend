import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import {
  getManagedEstablishment,
  ManagedEstablishmentResponse,
} from '@/api/get-managed-establishment'
import { updateEstablishment } from '@/api/update-establishment'
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from '@/components/ui/dialog'

import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'

const establishmentSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
})

type establishmentType = z.infer<typeof establishmentSchema>

export function EditEstablishmentDialog() {
  const queryClient = useQueryClient()

  const { data: managedEstablishment } = useQuery({
    queryKey: ['managed-establishment'],
    queryFn: getManagedEstablishment,
  })

  const {
    mutateAsync: updateEstablishmentFn,
    isPending: isPendingUpdateEstablishment,
  } = useMutation({
    mutationFn: updateEstablishment,
    onSuccess(_, { name, description }) {
      const cached = queryClient.getQueryData<ManagedEstablishmentResponse>([
        'managed-establishment',
      ])

      if (cached) {
        queryClient.setQueryData(['managed-establishment'], {
          ...cached,
          name,
          description,
        })
      }
    },
  })

  const { register, handleSubmit } = useForm<establishmentType>({
    resolver: zodResolver(establishmentSchema),
    values: {
      name: managedEstablishment?.name ?? '',
      description: managedEstablishment?.description ?? '',
    },
  })

  async function submitUpdateEstablishment(data: establishmentType) {
    try {
      await updateEstablishmentFn({
        name: data.name,
        description: data.description,
      })

      toast.success('Estabelecimento atualizado com sucesso!')
    } catch (error) {
      toast.error(
        'Não foi possível atualizar o estabelecimento, tente novamente!',
      )
    }
  }

  return (
    <DialogContent>
      <DialogHeader>Perfil da Loja</DialogHeader>
      <DialogDescription>Mude as informações da loja</DialogDescription>

      <form onSubmit={handleSubmit(submitUpdateEstablishment)}>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="name">
              Nome
            </Label>
            <Input className="col-span-3" id="name" {...register('name')} />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="description">
              Descrição
            </Label>
            <Textarea
              className="col-span-3"
              id="description"
              {...register('description')}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost">Cancelar</Button>
          <Button
            type="submit"
            variant="sucess"
            disabled={isPendingUpdateEstablishment}
          >
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
