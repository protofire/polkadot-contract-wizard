import { useState } from 'react'

export function useToggle(initialState = false) {
  const [value, setValue] = useState(initialState)

  const toggleValue = () => {
    setValue(!value)
  }

  return [value, toggleValue] as const
}
