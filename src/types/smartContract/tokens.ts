import { TokenType } from '.'

export interface ContractConfig extends Security {
  extensions: OptionInitState
  constructor: OptionInitState
  currentAccount?: string
}

export type OptionInitState = Record<string, string | boolean>
export type DefaultStates = Record<TokenType, Array<OptionInitState>>

export type SecurityOfToken =
  | 'ownable'
  | 'access_control'
  | 'access_control_enumerable'

export interface Security {
  security?: SecurityOfToken
}
