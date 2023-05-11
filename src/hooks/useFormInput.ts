import { getErrorMessage } from '@/utils/error'
import { useEffect, useState } from 'react'

export interface ControlledFormInput<I> {
  value: I
  onChange: (e: React.BaseSyntheticEvent) => void
  error: string | null
}

export type ValidationFn<I> = (value: I) => string | void

interface UseFormInput<I> {
  initialValue: I
  validations?: Array<ValidationFn<I>>
}

export function useFormInput<I>(
  initialValue: UseFormInput<I>['initialValue'],
  validations: UseFormInput<I>['validations'] = []
): ControlledFormInput<I> {
  const [value, setValue] = useState(initialValue)
  const [error, setError] = useState<string | null>(null)

  function handleChange(e: React.BaseSyntheticEvent) {
    const newValue = e.target.value
    _setvalue(newValue)
  }

  const _setvalue = (newValue: I) => {
    setError(null)
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

interface UseFormDependentInput<I, D>
  extends Omit<UseFormInput<I>, 'initialSupply'> {
  dependencies: Array<D>
  onCallback: (inputs: Array<D>) => I
}

export function useFormDependentInput<I, D>({
  validations,
  dependencies,
  onCallback
}: UseFormDependentInput<I, D>): ControlledFormInput<I> {
  const input = useFormInput<I>(onCallback(dependencies), validations)

  useEffect(() => {
    const event = {
      target: { value: onCallback(dependencies) }
    } as unknown as React.ChangeEvent<HTMLInputElement>
    input.onChange(event)
  }, [input, dependencies, onCallback])

  return input
}
