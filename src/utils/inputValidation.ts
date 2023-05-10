export function positiveNumber(value: number): string | void {
  if (!/^\d+(\.\d+)?([eE][+\-]?\d+)?$/.test(value.toString()) || value <= 0) {
    return 'Enter a positive number'
  }
}

export function positiveNumberOrZero(value: number): string | void {
  if (value < 0) return 'Enter a positive number or Zero'
}

export function notEmpty(value: unknown): string | void {
  if (typeof value === 'string' && value.trim() === '')
    return 'This field cannot be empty'

  if (value === '') return 'This field cannot be empty'
}
