import { Plus, Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

import { CreateProductDialog } from './create-product-dialog'

export function ProductsHeader() {
  return (
    <div className="flex items-center">
      <form className="flex items-center gap-2">
        <span className="text-sm font-semibold">Filtros</span>
        <Input placeholder="Nome do Produto" className="h-8 w-auto" />
        <Input placeholder="ID do Produto" className="h-8 w-[320px]" />

        <Button type="submit" size="xs">
          <Search className="mr-2 h-4 w-4" />
          Filtrar Resultados
        </Button>
      </form>

      <Dialog>
        <DialogTrigger asChild>
          <Button size="xs" variant="secondary" className="ml-auto">
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Produto
          </Button>
        </DialogTrigger>
        <CreateProductDialog />
      </Dialog>
    </div>
  )
}
