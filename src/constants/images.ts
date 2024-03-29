import { ContractType } from '@/domain/repositories/DeploymentRepository'

export const LOGO_POLKADOT = '/assets/polka_logo_horizontal.svg'
export const CW_POLKADOT = '/assets/CW_logo.svg'
export const LOGO_PROTOFIRE = '/assets/protofire.svg'
export const GIF_COMPILING = '/assets/compiling.gif'
export const SVG_SUCCESSFULLY = '/assets/successfully.svg'
export const SVG_AWESOME = '/assets/auto_awesome.svg'
export const CHAINS_IMG_PATH = `/assets/chains/`
export const CUSTOM_CONTRACT = '/assets/custom-contract.png'

export const TOKEN_PATHS: Record<ContractType, string> = {
  psp22: '/assets/token.png',
  psp34: '/assets/nft.png',
  psp37: '/assets/multitoken.png',
  custom: '/assets/multitoken.png' // TODO: Add missing img
}
