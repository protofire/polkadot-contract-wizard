import { getErrorMessage } from '@/utils/error'
import { useEffect, useMemo, useState } from 'react'

export interface ControlledFormInput<T> {
  value: T
  onChange: (e: React.BaseSyntheticEvent) => void
  error: string | null
}

export type ValidationFn<T> = (value: T) => string | void

export function useFormInput<T>(
  initialValue: T,
  validations: Array<ValidationFn<T>> = []
): ControlledFormInput<T> {
  const [value, setValue] = useState(initialValue)
  const [error, setError] = useState<string | null>(null)

  function handleChange(e: React.BaseSyntheticEvent) {
    setError(null)
    const newValue = e.target.value
    try {
      validations.forEach(validate => {
        const errorMessage = validate(newValue)
        if (errorMessage) throw new Error(errorMessage)
      })
    } catch (e) {
      setError(getErrorMessage(e))
    } finally {
      setValue(newValue)
    }
  }

  return {
    value,
    onChange: handleChange,
    error
  }
}

interface UseFormDependentOptions<T, R> {
  dependencies: Array<ControlledFormInput<T>['value']>
  validations?: Array<ValidationFn<R>>
  onCallback: (inputs: Array<ControlledFormInput<T>['value']>) => R
}

export function useFormDependentInput<T, R>({
  dependencies,
  validations = [],
  onCallback
}: UseFormDependentOptions<T, R>): ControlledFormInput<R> {
  const [value, setValue] = useState<R>(onCallback(dependencies))
  const [error, setError] = useState<string | null>(null)
  const dependenciesMemoized = useMemo(() => dependencies, [dependencies])

  function handleChange(e: React.BaseSyntheticEvent) {
    setError(null)
    const newValue = e.target.value
    try {
      validations.forEach(validate => {
        const errorMessage = validate(newValue)
        if (errorMessage) throw new Error(errorMessage)
      })
    } catch (e) {
      setError(getErrorMessage(e))
    } finally {
      setValue(newValue)
    }
  }

  useEffect(() => {
    console.log('__changeDependencies')
    setValue(onCallback(dependencies))
  }, [dependencies, onCallback])

  return {
    value,
    onChange: handleChange,
    error
  }
}
