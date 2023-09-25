import { isoToReadableDate } from '@/utils/formatString'

describe('isoToReadableDate', () => {
  it('should return "today" when lastUpdate is today', () => {
    const currentDate = new Date()
    const result = isoToReadableDate(currentDate)
    expect(result).toBe('today')
  })

  it('should return "more than a month ago" when lastUpdate is more than 30 days ago', () => {
    const lastUpdate = new Date('2023-08-15T08:45:00Z')
    const result = isoToReadableDate(lastUpdate)
    expect(result).toBe('more than a month ago')
  })

  it('should return the correct number of days ago when lastUpdate is within 30 days', () => {
    const currentDate = new Date()
    const lastUpdate = new Date(currentDate.getTime() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
    const result = isoToReadableDate(lastUpdate)
    expect(result).toBe('2 days ago')
  })

  it('should throw an error if lastUpdate is not a valid Date object or ISO date string', () => {
    expect(() => isoToReadableDate('invalid date')).toThrow()
  })

  it('should accept a valid ISO date string and return the correct result', () => {
    const currentDate = new Date()
    const result = isoToReadableDate(currentDate.toISOString())
    expect(result).toBe('today')
  })
})
