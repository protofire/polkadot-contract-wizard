import { TextField, TextFieldProps } from '@mui/material'
import { Ref, forwardRef, useImperativeHandle, useRef } from 'react'

export const MuiTextField = forwardRef(function MuiTextFieldRef(
  props: TextFieldProps,
  ref: Ref<{ focus: () => void }>
) {
  const inputRef = useRef<HTMLInputElement>(null)

  useImperativeHandle(ref, () => ({
    focus: () => {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }
  }))

  return (
    <TextField
      {...props}
      inputRef={inputRef}
      onClick={event => {
        event.stopPropagation()
        if (inputRef.current) {
          inputRef.current.focus()
        }
      }}
    />
  )
})
