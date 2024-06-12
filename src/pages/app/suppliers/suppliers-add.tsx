import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { addSuplier } from '@/api/add-supplier'
import { Button } from '@/components/ui/button'
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

interface State {
  id: number
  sigla: string
  nome: string
}

const supplierSchema = z.object({
  supplierName: z.string(),
  email: z.string().email(),
  description: z.string(),
  identificationNumber: z.string(),
  status: z.enum(['ativo', 'inativo']),
  address: z.string(),
  uf: z.string(),
  phone: z.string(),
})

type Supplier = z.infer<typeof supplierSchema>

export function SuppliersAdd() {
  const [states, setStates] = useState<State[]>([])
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
    control,
  } = useForm<Supplier>()

  const { mutateAsync: addSupplierFn } = useMutation({
    mutationFn: addSuplier,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['suppliers'] })
      toast.success('Fornecedor cadastrado com sucesso!')
    },
  })

  async function handleSubmitSupplier(data: Supplier) {
    try {
      await addSupplierFn(data)

      // console.log(data)
      reset()
    } catch (error) {
      toast.error('Error ao cadastrar fornecedor')
    }
  }

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const res = await axios.get(
          'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
        )
        setStates(res.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchStates()
  }, [])

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Fornecedor</DialogTitle>
        <DialogDescription>Cadastre um fornecedor</DialogDescription>
      </DialogHeader>

      <form className="space-y-4" onSubmit={handleSubmit(handleSubmitSupplier)}>
        <div>
          <Label>Nome</Label>
          <Input
            placeholder="Nome do fornecedor"
            {...register('supplierName')}
          />
        </div>

        <div>
          <Label>E-mail</Label>
          <Input placeholder="user@email.com" {...register('email')} />
        </div>

        <div>
          <Label>Telefone</Label>
          <Input {...register('phone')} />
        </div>

        <div>
          <Label>Identificador (CPF | CNPJ)</Label>
          <div className="flex items-center justify-between gap-4">
            <Input
              placeholder="Identificador"
              {...register('identificationNumber')}
            />
          </div>
        </div>

        <div>
          <Label>Estado</Label>
          <Controller
            name="uf"
            control={control}
            render={({ field: { name, onChange, value, disabled } }) => {
              return (
                <Select
                  defaultValue={states[0].sigla}
                  name={name}
                  onValueChange={onChange}
                  value={value}
                  disabled={disabled}
                >
                  <SelectTrigger className="h-8 w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((uf) => (
                      <SelectItem key={uf.id} value={uf.sigla}>
                        {uf.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )
            }}
          />
        </div>

        <div>
          <Label>Endereço</Label>
          <Input {...register('address')} />
        </div>

        <div>
          <Textarea
            placeholder="Detalhe mais sobre os produtos desse fornecedor"
            className="resize-y"
            {...register('description')}
          />
        </div>

        <DialogFooter>
          <Button type="submit" disabled={isSubmitting}>
            Cadastrar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
