import { Chain } from 'useink/dist/chains'

export type ChainExtended = Chain & {
  logo: {
    src: string
    alt: string
  }
}
