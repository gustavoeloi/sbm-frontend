import { Beer, Home, ShoppingBasket, Truck } from 'lucide-react'

import { AccountMenu } from './account-menu'
import { LogoSBM } from './logoSBM'
import { NavLink } from './nav-link'
import { ModeToggle } from './theme/theme-toggle'
import { Separator } from './ui/separator'

export function Header() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <LogoSBM width="12" heigth="12" haveText={true} />
        <Separator orientation="vertical" className="h-6" />

        <nav className="flex items-center space-x-4 lg:space-x-6">
          <NavLink to="/">
            <Home className="h-4 w-4" />
            Início
          </NavLink>
          <NavLink to="/orders">
            <ShoppingBasket className="h-4 w-4" />
            Pedidos
          </NavLink>
          <NavLink to="/suppliers">
            <Truck className="h-4 w-4" />
            Fornecedores
          </NavLink>
          <NavLink to="/products">
            <Beer className="h-4 w-4" />
            Produtos
          </NavLink>
        </nav>

        <div className="ga-2 ml-auto flex items-center gap-2">
          <ModeToggle />
          <AccountMenu />
        </div>
      </div>
    </div>
  )
}
