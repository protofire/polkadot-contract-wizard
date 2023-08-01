import { Chain } from '@/constants/chains'

export type ChainExtended = Chain & {
  logo: {
    src: string
    alt: string
  }
}
