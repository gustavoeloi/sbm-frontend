import { useQuery } from '@tanstack/react-query'
import { Loader2, Search } from 'lucide-react'
import { Helmet } from 'react-helmet-async'

import { getProducts } from '@/api/get-products'
import { Button } from '@/components/ui/button'
import { ProductCard } from '@/pages/app/products/product-card'

import { ProductsHeader } from './products-header'

export function Products() {
  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  })

  return (
    <>
      <Helmet title="Produtos" />
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tighter">Produtos</h1>

        <ProductsHeader />

        <div className="grid w-full grid-cols-1 gap-4 space-y-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products ? (
            products.map((product) => {
              return <ProductCard key={product.id} product={product} />
            })
          ) : (
            <div>Carregando...</div>
          )}
        </div>
      </div>
    </>
  )
}
