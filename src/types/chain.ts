import { IChain } from '@/services/useink/chains/data/types'
import { ChainId } from 'useink/dist/chains'

export type ChainExtended = IChain<string> & {
  id: unknown
  logo: {
    src: string
    alt: string
  }
}
