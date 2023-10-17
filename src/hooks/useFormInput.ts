import { getErrorMessage } from '@/utils/error'
import { useEffect, useState } from 'react'

export interface ControlledFormInput<I> {
  value: I
  onChange: (e: React.BaseSyntheticEvent) => void
  error: string | null
  loading: boolean
  required: boolean
  touched: boolean
  setValue: (value: I) => void
}

export type ValidationFn<I> = (
  value: I
) => string | void | Promise<string | void>

interface UseFormInput<I> {
  initialValue: I
  validations?: Array<ValidationFn<I>>
  required?: boolean
}

export function useFormInput<I>(
  initialValue: UseFormInput<I>['initialValue'],
  validations: UseFormInput<I>['validations'] = [],
  required: UseFormInput<I>['required'] = true
): ControlledFormInput<I> {
  const [value, setValue] = useState(initialValue)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [touched, setTouched] = useState(false)

  async function handleChange(e: React.BaseSyntheticEvent) {
    setTouched(true)
    const newValue = e.target.value
    await _setvalue(newValue)
  }

  const _setvalue = async (newValue: I) => {
    setLoading(true)
    setError(null)
    try {
      const errorMessages = await Promise.all(
        validations.map(validate => validate(newValue))
      )
      const firstError = errorMessages.find(message => !!message)
      if (firstError) throw new Error(firstError)
    } catch (e) {
      setError(getErrorMessage(e))
    } finally {
      setValue(newValue)
      setLoading(false)
    }
  }

  return {
    value,
    onChange: handleChange,
    error,
    loading,
    required,
    touched,
    setValue
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
