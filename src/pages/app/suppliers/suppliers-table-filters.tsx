import { Search, UserRoundPlus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { SuppliersAdd } from './suppliers-add'

export function SuppliersTableFilters() {
  return (
    <form className="flex items-center gap-2">
      <span className="text-sm font-semibold">Filtros</span>
      <Input placeholder="Nome do fornecedor" className="h-8 w-auto" />
      <Input placeholder="CNPJ ou CPF" className="h-8 w-[320px]" />

      <Select defaultValue="all">
        <SelectTrigger className="h-8 w-[180px]">
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">Todos status</SelectItem>
          <SelectItem value="active">Ativo</SelectItem>
          <SelectItem value="inactive">Inativo</SelectItem>
        </SelectContent>
      </Select>

      <Button type="submit" size="xs">
        <Search className="mr-2 h-4 w-4" />
        Filtrar Resultados
      </Button>

      <Dialog>
        <DialogTrigger asChild>
          <Button type="button" size="xs" variant="outline" className="ml-auto">
            <UserRoundPlus className="mr-2 h-4 w-4" />
            Cadastrar fornecedor
          </Button>
        </DialogTrigger>
        <SuppliersAdd />
      </Dialog>
    </form>
  )
}
