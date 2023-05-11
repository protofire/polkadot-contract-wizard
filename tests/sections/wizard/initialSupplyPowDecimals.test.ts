import Big from 'big.js'
import { initialSupplyPowDecimal } from '@/view/wizardView/Step3Deploy/initialSupplyPowDecimal'

describe('initialSupplyPowDecimal()', () => {
  it('returns correct result when inputs are valid', () => {
    expect(initialSupplyPowDecimal(['1000000', 18])).toEqual(
      new Big('1000000000000000000000000')
    )

    expect(initialSupplyPowDecimal([0, 0])).toEqual(new Big(0))
  })

  it('returns -1 if the decimals input is over 64', () => {
    expect(initialSupplyPowDecimal(['100', 70])).toEqual(new Big(-1))
  })

  it('returns -1 if the result is gt than 2e64', () => {
    expect(initialSupplyPowDecimal(['200', 63])).toEqual(new Big(-1))
  })
})
