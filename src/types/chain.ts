import { Chain } from 'useink/chains'

export type ChainExtended = Chain & {
  logo: {
    src: string
    alt: string
  }
}
