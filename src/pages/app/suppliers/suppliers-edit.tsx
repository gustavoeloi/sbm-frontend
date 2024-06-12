import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { editSupplier } from '@/api/edit-supplier'
import { getSupplierById } from '@/api/get-supplier-by-id'
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

export interface SupplierEditsProps {
  supplierId: string
  modaIsOpen: boolean
}

export function SuppliersEdit({ supplierId, modaIsOpen }: SupplierEditsProps) {
  const [states, setStates] = useState<State[]>([])
  const queryClient = useQueryClient()

  const { data: supplier, isLoading: isLoadingSupplier } = useQuery({
    queryKey: ['supplier', supplierId],
    queryFn: () => getSupplierById({ supplierId }),
    enabled: modaIsOpen,
  })

  const { mutateAsync: editSupplierFn } = useMutation({
    mutationFn: editSupplier,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['supplier', supplierId] })
    },
  })

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    control,
    setValue,
  } = useForm<Supplier>({
    resolver: zodResolver(supplierSchema),
  })

  async function handleSubmitSupplier(data: Supplier) {
    try {
      await editSupplierFn({
        supplierId,
        supplierName: data.supplierName,
        email: data.email,
        address: data.address,
        identificationNumber: data.identificationNumber,
        phone: data.phone,
        uf: data.uf,
        description: data.description,
      })

      toast.success('Fornecedor cadastrado com sucesso!')
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

  if (supplier) {
    setValue('supplierName', supplier.supplierName)
    setValue('email', supplier.email)
    setValue('address', supplier.address)
    setValue('identificationNumber', supplier.identificationNumber)
    setValue('phone', supplier.phone)
    setValue('uf', supplier.uf)
    setValue('status', supplier.status)
    setValue('description', supplier.description)
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Fornecedor</DialogTitle>
        <DialogDescription>Edite um fornecedor</DialogDescription>
      </DialogHeader>

      {isLoadingSupplier ? (
        <>
          <Loader2 className="m-auto h-32 w-24 animate-spin" />
        </>
      ) : (
        <>
          <form
            className="space-y-4"
            onSubmit={handleSubmit(handleSubmitSupplier)}
          >
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
                defaultValue={supplier?.uf}
                render={({ field: { name, onChange, value, disabled } }) => {
                  return (
                    <Select
                      name={name}
                      onValueChange={onChange}
                      value={value}
                      disabled={disabled}
                    >
                      <SelectTrigger className="h-8 w-[180px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {states.map((state) => (
                          <SelectItem key={state.id} value={state.nome}>
                            {state.nome}
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
                Salvar Alterações
              </Button>
            </DialogFooter>
          </form>
        </>
      )}
    </DialogContent>
  )
}
