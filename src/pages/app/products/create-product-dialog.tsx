import { DialogDescription } from '@radix-ui/react-dialog'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { createProduct } from '@/api/create-products'
import { Button } from '@/components/ui/button'
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const createProductForm = z.object({
  productName: z.string(),
  description: z.string(),
  priceInCents: z.number(),
  quantityInStock: z.number(),
})

type CreateProductForm = z.infer<typeof createProductForm>

export function CreateProductDialog() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<CreateProductForm>()

  const { mutateAsync: fnCreateProduct } = useMutation({
    mutationFn: createProduct,
  })

  async function handleCreateProduct(data: CreateProductForm) {
    try {
      const quantityInStock = Number(data.quantityInStock)
      const priceInCents = Number(data.priceInCents * 100)

      await fnCreateProduct({
        productName: data.productName,
        description: data.description,
        priceInCents,
        quantityInStock,
      })

      toast.success('Produto cadastrado com sucesso!')
    } catch (error) {
      console.log(error)
      toast.error('Erro ao cadastrar Produto')
    }
  }

  return (
    <DialogContent>
      <DialogHeader className="text-2xl font-bold">
        Adicionar Produto
      </DialogHeader>
      <DialogDescription className="text-muted-foreground">
        Preencha os dados para adicionar um produto a sua base de dados
      </DialogDescription>

      <form className="space-y-4" onSubmit={handleSubmit(handleCreateProduct)}>
        <div className="space-y-2">
          <Label htmlFor="productName">Nome do Produto</Label>
          <Input id="producdtName" type="text" {...register('productName')} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Descrição do Produto</Label>
          <Textarea id="description" {...register('description')} />
        </div>

        <div className="flex items-center  justify-between space-y-2">
          <div className="space-y-2">
            <Label htmlFor="priceInCents">Preço do Produto (em reais)</Label>
            <Input
              id="priceInCents"
              type="number"
              {...register('priceInCents')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantityInStock">Quantidade Estoque</Label>
            <Input
              id="quantityInStock"
              type="number"
              {...register('quantityInStock')}
            />
          </div>
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
