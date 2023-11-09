import { useEffect } from 'react'

interface Props<T> {
  value?: string
  setValue: (value: string) => void
  options: T[] | undefined
  getValue: (option: T) => string
  index?: number
}

const INDEX_FIRST = 0

function useSetDefaultItem<T>({
  value,
  setValue,
  options,
  getValue,
  index = INDEX_FIRST
}: Props<T>) {
  useEffect(() => {
    if (!value && options && options.length > 0) {
      const _index = options.length >= index ? index : INDEX_FIRST
      setValue(getValue(options[_index]))
    }
  }, [value, setValue, options, getValue, index])
}

export default useSetDefaultItem
