import { TextField, TextFieldProps, CircularProgress } from '@mui/material'

interface LoadingProp {
  loading?: boolean
}

export type TextFieldWithLoadingProps = LoadingProp & TextFieldProps

export const TextFieldWithLoading: React.FC<
  TextFieldWithLoadingProps
> = props => {
  // eslint-disable-next-line react/prop-types
  const { loading, ...otherProps } = props

  return (
    <TextField
      {...otherProps}
      InputProps={{
        endAdornment: loading ? (
          <CircularProgress size={20} color="primary" />
        ) : null
      }}
    />
  )
}
