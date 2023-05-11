import Big from 'big.js'

export function initialSupplyPowDecimal(inputs: (number | string)[]): Big {
  const [supply, decimals] = inputs
  const supplyBN = new Big(supply || 0)
  const decimalsBig = new Big(decimals || 0)
  if (decimalsBig.gt(new Big(64))) return new Big(-1)

  const multiplier = new Big(10).pow(decimalsBig.toNumber())
  const result = supplyBN.mul(multiplier)

  if (result.gt(new Big('2e64'))) return new Big(-1)
  return result
}
