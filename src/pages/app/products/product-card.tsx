import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'

import { EditProductDialog } from './edit-product-dialog'

export interface ProductCardProps {
  product: {
    id: string
    createdAt: Date
    updatedAt: Date
    description: string | null
    establishmentId: string
    productName: string
    priceInCents: number
    quantityInStock: number
  }
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="m-4 max-w-sm overflow-hidden rounded shadow-lg">
      <Card>
        <CardHeader>
          <CardTitle>{product.productName}</CardTitle>
          <CardDescription>{product.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <img
            alt="Imagem de uma bebida"
            src="https://conteudo.imguol.com.br/c/entretenimento/74/2022/09/13/drinques-bebida-alcoolica-tequila-cerveja-chopp-gim-martini-alcool-copos-tacas-1663094165597_v2_3x4.jpg"
            className="h-40 w-full object-cover"
          />

          <p className="font-bold">
            Preço do produto:{' '}
            <span className="text-base">
              {(product.priceInCents / 100).toLocaleString('pt-BR', {
                currency: 'BRL',
                style: 'currency',
              })}
            </span>
          </p>
          <Badge className="text-base" variant={'secondary'}>
            Quantidade em Estoque: {product.quantityInStock}
          </Badge>
        </CardContent>
        <CardFooter className="">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="ml-auto">Editar</Button>
            </DialogTrigger>
            <EditProductDialog productId={product.id} />
          </Dialog>
        </CardFooter>
      </Card>
    </div>
  )
}
