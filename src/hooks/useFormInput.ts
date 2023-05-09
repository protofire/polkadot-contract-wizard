import { useEffect, useState } from 'react'

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

interface UseFormDependentOptions<T, R> {
  dependencies: Array<ControlledFormInput<T>['value']>
  onCallback: (inputs: Array<ControlledFormInput<T>['value']>) => R
}

export function useFormDependentInput<T, R>({
  dependencies,
  onCallback
}: UseFormDependentOptions<T, R>): ControlledFormInput<R> {
  const [value, setValue] = useState<R>(onCallback(dependencies))

  function handleChange(e: React.BaseSyntheticEvent) {
    const newValue = e.target.value
    setValue(newValue)
  }

  useEffect(() => {
    setValue(onCallback(dependencies))
  }, [dependencies, onCallback])

  return {
    value,
    onChange: handleChange
  }
}
