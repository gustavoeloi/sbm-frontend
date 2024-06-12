import { DialogDescription } from '@radix-ui/react-dialog'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { editProduct } from '@/api/edit-product'
import { getProductById } from '@/api/get-product-by-id'
import { Button } from '@/components/ui/button'
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const editProductForm = z.object({
  productName: z.string(),
  description: z.string(),
  priceInCents: z.number(),
  quantityInStock: z.number(),
})

type editProductForm = z.infer<typeof editProductForm>

export interface EditProductDialogProps {
  productId: string
}

export function EditProductDialog({ productId }: EditProductDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
  } = useForm<editProductForm>()

  const queryClient = useQueryClient()

  const { data: product, isLoading: isLoadingProducts } = useQuery({
    queryKey: ['products', productId],
    queryFn: () => getProductById({ productId }),
  })

  const { mutateAsync: fnEditProduct } = useMutation({
    mutationFn: editProduct,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['products', productId] })
    },
    onMutate: () => {
      toast.loading('Editando Produto...')
    },
    onError: () => {
      toast.error('Erro ao editar Produto')
    },
    onSuccess: () => {
      toast.success('Produto Editado com sucesso!')
    },
  })

  if (product) {
    setValue('productName', product.productName)
    setValue('description', product.description)
    setValue('priceInCents', product.priceInCents)
    setValue('quantityInStock', product.quantityInStock)
  }

  async function handleCreateProduct(data: editProductForm) {
    try {
      const quantityInStock = Number(data.quantityInStock)
      const priceInCents = Number(data.priceInCents * 100)

      await fnEditProduct({
        productId,
        productName: data.productName,
        description: data.description,
        priceInCents,
        quantityInStock,
      })
    } catch (error) {
      console.log(error)
      toast.error('Erro ao cadastrar Produto')
    }
  }

  return (
    <DialogContent>
      <DialogHeader className="text-2xl font-bold">Editar Produto</DialogHeader>
      <DialogDescription className="text-muted-foreground">
        Altere os campos para editar o produto
      </DialogDescription>

      {!isLoadingProducts ? (
        <form
          className="space-y-4"
          onSubmit={handleSubmit(handleCreateProduct)}
        >
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
              Salvar Mudanças
            </Button>
          </DialogFooter>
        </form>
      ) : (
        <div className="mx-auto">
          <Loader2 className="h-32 w-24 animate-spin" />
        </div>
      )}
    </DialogContent>
  )
}
