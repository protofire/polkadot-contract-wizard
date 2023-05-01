import { TokenType } from '@/domain'
import { TOKEN_PATHS } from '@/constants/images'

export interface TitleMapProps {
  title: string
  subtitle: string
  imgPath: string
  imgProps: { width: number; height: number }
}

export const TITLE_MAP_TOKEN: Record<TokenType, TitleMapProps> = {
  psp22: {
    title: 'TOKEN | PSP22',
    subtitle: 'Standard smart contract for a fungible token',
    imgPath: TOKEN_PATHS.psp22,
    imgProps: { width: 45, height: 39 }
  },
  psp34: {
    title: 'NFT | PSP34',
    subtitle: 'Standard smart contract for a non-fungible token',
    imgPath: TOKEN_PATHS.psp34,
    imgProps: { width: 33, height: 40 }
  },
  psp37: {
    title: 'MULTITOKEN | PSP37',
    subtitle: 'Standard smart contract for a Multi Token',
    imgPath: TOKEN_PATHS.psp37,
    imgProps: { width: 45, height: 39 }
  }
}
