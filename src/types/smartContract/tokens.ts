type SecurityOfToken =
  | 'Ownable'
  | 'Access Control'
  | 'Access Control Enumerable'

interface Security {
  security?: SecurityOfToken
}

export interface PSP22Fungible extends Security {
  metadata: {
    active: boolean
    name: string
    symbol?: string
    decimals?: number
  }
  mintable: boolean
  burnable: boolean
  wrapper: boolean
  flashMint: boolean
  pausable: boolean
  capped: boolean
}

export interface PSP34NonFungible extends Security {
  metadata: {
    name: string
    symbol?: string
  }
  mintable: boolean
  burnable: boolean
  enumerable: boolean
}

export interface PSP37MultiToken extends Security {
  metadata: {
    name: string
    uri?: string
  }
  batch: boolean
  mintable: boolean
  burnable: boolean
  enumerable: boolean
}

export type PSPTokens = PSP22Fungible | PSP34NonFungible | PSP37MultiToken
