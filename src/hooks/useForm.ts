import { useMemo, useState } from 'react'

export type ValidationFn<I, K extends keyof I> = (
  value: I[K]
) => string | void | Promise<string | void>

type ValidationMap<T> = {
  [K in keyof T]?: Array<ValidationFn<T, K>>
}

interface FormState<I> {
  values: I
  errors: Record<keyof I, string | null>
  touched: Record<keyof I, boolean>
}

export function useForm<T extends Record<string, unknown>>(initialValues: T) {
  const [formState, setFormState] = useState<FormState<T>>({
    values: initialValues,
    errors: {} as Record<keyof T, string | null>,
    touched: {} as Record<keyof T, boolean>
  })

  const fieldValidations: ValidationMap<T> = {}

  const validateField = async <K extends keyof T>(name: K, value: T[K]) => {
    const validations = fieldValidations[name]
    if (!validations) return null

    for (const validate of validations) {
      const validationResult = await validate(value)
      if (validationResult) {
        return validationResult
      }
    }
    return null
  }

  const isValid = useMemo(() => {
    const hasErrors = Object.values(formState.errors).some(
      error => error !== null
    )

    const allFieldsTouched = Object.values(formState.touched).every(
      touched => touched
    )

    return !hasErrors && allFieldsTouched
  }, [formState.errors, formState.touched])

  const register = <K extends keyof T>(
    name: K,
    validations: Array<ValidationFn<T, K>>
  ) => {
    fieldValidations[name] = validations

    return {
      value: formState.values[name],
      onChange: async (e: React.BaseSyntheticEvent) => {
        const newValue = e.target.value
        const error = await validateField(name, newValue)

        setFormState(prevState => ({
          ...prevState,
          values: {
            ...prevState.values,
            [name]: newValue
          },
          errors: {
            ...prevState.errors,
            [name]: error
          },
          touched: {
            ...prevState.touched,
            [name]: true
          }
        }))
      }
    }
  }

  const setValue = async <K extends keyof T>(name: K, value: T[K]) => {
    const error = await validateField(name, value)

    setFormState(prevState => ({
      ...prevState,
      values: {
        ...prevState.values,
        [name]: value
      },
      errors: {
        ...prevState.errors,
        [name]: error
      }
    }))
  }

  const handleSubmit = (callback: (values: T) => void) => {
    return (e: React.FormEvent) => {
      e.preventDefault()
      if (!Object.values(formState.errors).some(error => error !== null)) {
        callback(formState.values)
      }
    }
  }

  return {
    register,
    handleSubmit,
    errors: formState.errors,
    values: formState.values,
    setValue,
    isValid
  }
}
