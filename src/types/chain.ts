import { Chain, ChainId } from '@/services/useink/chains'

export type ChainExtended = Chain & {
  id: ChainId
  logo: {
    src: string
    alt: string
  }
}
