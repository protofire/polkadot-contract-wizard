import { TextField } from '@mui/material'

import { SimpleSpread } from '@/domain/common/utilityTsTypes'

type Props = SimpleSpread<
  React.InputHTMLAttributes<HTMLInputElement>,
  {
    isDisabled?: boolean
    isError?: boolean
    onChange: (_: string) => void
    value?: string | null
    label?: string
  }
>

export function ArgTextField({
  children,
  className,
  isDisabled = false,
  isError = false,
  onChange: _onChange,
  placeholder,
  value,
  onFocus,
  type = 'text',
  label
}: Props) {
  function onChange(e: React.ChangeEvent<HTMLInputElement>): void {
    _onChange(e.target.value)
  }

  return (
    <div className={`w-full ${isError ? 'isError' : ''}`}>
      <TextField
        className={`w-full rounded text-sm ${
          isDisabled ? 'dark:text-gray-500' : ''
        } ${className}`}
        onChange={onChange}
        onFocus={onFocus}
        placeholder={placeholder}
        type={type}
        value={value || ''}
        disabled={isDisabled}
        variant="outlined"
        error={isError}
        label={label}
        fullWidth
      />
      {children}
    </div>
  )
}
