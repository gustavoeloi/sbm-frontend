import { Link } from 'react-router-dom'

import { LogoSBM } from '@/components/logoSBM'

export function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <LogoSBM heigth="24" width="24" />
      <h1 className="text-4xl font-bold">Página não encontrada</h1>
      <p className="text-accent-foreground">
        Voltar para o{' '}
        <Link to="/" className="text-orange-600 dark:text-sky-400">
          Dashboard
        </Link>
      </p>
    </div>
  )
}
