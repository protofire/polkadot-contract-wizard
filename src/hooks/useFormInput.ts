import { useState } from 'react'

export interface ControlledFormInput<T> {
  value: T
  onChange: (e: React.BaseSyntheticEvent) => void
}

export function useFormInput<T>(initialValue: T): ControlledFormInput<T> {
  const [value, setValue] = useState(initialValue)

  function handleChange(e: React.BaseSyntheticEvent) {
    const newValue = e.target.value
    setValue(newValue)
  }

  return {
    value,
    onChange: handleChange
  }
}
