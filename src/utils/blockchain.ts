import { decodeAddress, encodeAddress } from '@polkadot/keyring'
import { hexToU8a, isHex } from '@polkadot/util'

export const isValidAddress = (address: string | undefined) => {
  try {
    encodeAddress(isHex(address) ? hexToU8a(address) : decodeAddress(address))

    return true
  } catch (error) {
    return false
  }
}

export const genRanHex: (size?: number) => `0x${string}` = (size = 32) =>
  `0x${[...Array<string>(size)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join('')}`

export const onlyAddress = (address: string | undefined) => {
  if (!isValidAddress(address)) return 'Enter a valid address.'
}
