import { sanitizeNumber } from '@/utils/sanitize'

describe('sanitizeNotationNumber function', () => {
  it('should convert a valid notation number to a regular number', () => {
    expect(sanitizeNumber(5.23e10)).toBe(52300000000)
    expect(sanitizeNumber(1.2345e-6)).toBe(0.0000012345)
    expect(sanitizeNumber('7.89e+3')).toBe(7890)
    expect(sanitizeNumber('2e-5')).toBe(0.00002)
  })

  it('should return 0 for invalid numbers', () => {
    expect(sanitizeNumber('invalid number')).toBe(0)
    expect(sanitizeNumber('5.23e+10a')).toBe(0)
    expect(sanitizeNumber('1.2345e--6')).toBe(0)
    expect(sanitizeNumber('')).toBe(0)
  })
})
