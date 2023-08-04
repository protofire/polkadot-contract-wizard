import { Chain } from '@/infrastructure/useink/chains'

export type ChainExtended = Chain & {
  logo: {
    src: string
    alt: string
  }
}
