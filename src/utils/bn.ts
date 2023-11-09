import BN from 'bn.js'

export const BN_ZERO = new BN(0)

export function isBn(value: unknown): value is typeof BN_ZERO {
  return BN.isBN(value)
}
