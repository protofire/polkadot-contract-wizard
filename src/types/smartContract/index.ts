import { PSP22Fungible, PSP37MultiToken, PSPTokens } from './tokens'

export const tokenTypes = ['psp22', 'psp34', 'psp37'] as const
export type TokenType = (typeof tokenTypes)[number]

export function isOfTypeTokens(value: string | null): value is TokenType {
  if (!value) return false

  return (tokenTypes as readonly string[]).includes(value)
}

export function isPSP22(token: PSPTokens): token is PSP22Fungible {
  return (token as PSP22Fungible).capped !== undefined
}

export function isPSP37(token: PSPTokens): token is PSP37MultiToken {
  return (token as PSP37MultiToken).batch !== undefined
}
