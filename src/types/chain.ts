import { Chain } from '@/services/useink/chains'

export type ChainExtended = Chain & {
  logo: {
    src: string
    alt: string
  }
}
