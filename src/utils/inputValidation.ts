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

export function maxAllowed(value: unknown, max = 64): string | void {
  let _value = value
  if (typeof value === 'string') {
    _value = parseInt(value, 10)
  }

  if (typeof _value !== 'number' || isNaN(_value) || _value > max)
    return `The number can not be greater than ${max}`
}
