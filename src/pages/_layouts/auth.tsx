import { Outlet } from 'react-router-dom'

import logoSBM from '@/assets/images/logo-sbm.png'

export function AuthLayout() {
  return (
    <div className="grid min-h-screen grid-cols-2 antialiased">
      <div className="flex h-full flex-col justify-between border-r border-foreground/5 bg-sbm-auth bg-cover bg-center bg-no-repeat p-10 text-muted-foreground">
        <div className="flex items-center gap-3 text-lg font-medium text-foreground">
          <img
            src={logoSBM}
            alt="Logo SBM"
            className="rounded-full border-2 border-foreground bg-orange-500 "
          />
          <span className="font-bold">SBM</span>
        </div>
        <footer className="text-sm">
          &copy; Small Business Management - {new Date().getFullYear()}
        </footer>
      </div>

      <div className="relative flex flex-col items-center justify-center">
        <Outlet />
      </div>
    </div>
  )
}
