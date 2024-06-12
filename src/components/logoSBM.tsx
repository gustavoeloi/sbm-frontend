import iconSBM from '@/assets/images/logo-sbm.png'

interface logoSBMProps {
  haveText?: boolean
  width: string
  heigth: string
}

export function LogoSBM({ haveText = false, width, heigth }: logoSBMProps) {
  return (
    <div className={`flex items-center gap-4`}>
      <img
        src={iconSBM}
        alt="ícone SBM"
        className={`h-${width} w-${heigth} rounded-full border-2 border-foreground bg-orange-400`}
      />
      {haveText && (
        <h1 className="text-o text-4xl font-bold text-orange-400">SBM</h1>
      )}
    </div>
  )
}
