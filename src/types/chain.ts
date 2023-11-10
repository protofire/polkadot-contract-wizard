import { Chain, ProductionChainId } from '@/services/useink/chains'
import { ChainId } from 'useink/dist/chains'

export type ChainExtended = Chain & {
  id: ChainId | 'custom'
  logo: {
    src: string
    alt: string
  }
}
