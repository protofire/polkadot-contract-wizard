import {
  isSmallerVer,
  isGreaterVer,
  isSmallerOrEqual
} from 'src/utils/comparisonString'

test('first version should greater than second one', async () => {
  const v1 = 'v3.0.0'
  const v2 = 'v1.3.0'

  expect(isGreaterVer(v1, v2)).toBe(true)
})

test('first version must be smaller than the second one', async () => {
  const v1 = 'v3.0.0-beta'
  const v2 = 'v3.0.0'

  expect(isSmallerVer(v1, v2)).toBe(true)
})

test('first version must be smaller or equal to the second one', async () => {
  const v1 = 'v3.0.0-beta'
  const v1_2 = 'v3.0.0'
  const v2 = 'v3.0.0'

  expect(isSmallerOrEqual(v1, v2)).toBe(true)
  expect(isSmallerOrEqual(v1_2, v2)).toBe(true)
})
