export function sanitizeNumber(num: string | number): number {
  const str = num.toString()

  // Returns 0 if str is not a valid number
  if (!str.match(/^[+-]?\d+(\.\d+)?(e[+-]?\d+)?$/)) {
    return 0
  }

  const convertedNum = Number(str)

  return convertedNum
}
