import Box from '@mui/material/Box'
import { ButtonProps } from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import * as React from 'react'
import { ReactNode } from 'react'
import { StyledButton } from './styled'

export interface LoadingButtonProps
  extends Pick<
    ButtonProps,
    | 'ref'
    | 'onClick'
    | 'variant'
    | 'size'
    | 'children'
    | 'sx'
    | 'disabled'
    | 'hidden'
  > {
  isLoading?: boolean
  startIcon?: ReactNode
  endIcon?: ReactNode
}

export const LoadingButton: React.FC<LoadingButtonProps> = React.forwardRef<
  HTMLButtonElement,
  LoadingButtonProps
>(function RefLoadingButton(
  { isLoading, children, startIcon, endIcon, disabled, ...props },
  ref
) {
  return (
    <StyledButton
      ref={ref}
      {...props}
      isLoading={!isLoading}
      disabled={isLoading || disabled}
      sx={{ position: 'relative' }}
      startIcon={startIcon}
      endIcon={endIcon}
    >
      <Box
        sx={{
          visibility: isLoading ? 'hidden' : 'visible'
        }}
      >
        {children}
      </Box>
      {isLoading && (
        <CircularProgress
          size={24}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: '-12px', // half of size
            marginLeft: '-12px' // half of size
          }}
        />
      )}
    </StyledButton>
  )
})
