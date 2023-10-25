import React from 'react'
import { styled } from '@mui/material/styles'
import { Button, ButtonProps } from '@mui/material'

interface StyledButtonProps extends ButtonProps {
  isLoading?: boolean
}

export const StyledButtonWrapper = React.forwardRef<
  HTMLButtonElement,
  StyledButtonProps
>(function RefStyledButton({ isLoading, ...rest }, ref) {
  return <Button ref={ref} {...rest} />
})

export const StyledButton = styled(StyledButtonWrapper, {
  shouldForwardProp: prop => prop !== 'isLoading'
})<StyledButtonProps>(({ theme, isLoading }) => ({
  textTransform: 'uppercase',
  color: theme.palette.primary.main,
  fontSize: '1.4rem',
  borderRadius: '5rem',
  padding: '8px 16px',
  minWidth: '11rem',
  border: '1px solid',
  backgroundColor: '#e6007b2f',

  '&:hover': {
    backgroundColor: '#e6007b83',
    color: 'white',
    border: '1px solid #c00569'
  },

  '&:disabled': {
    color: theme.palette.grey[600],
    opacity: '0.5',
    '&:hover': {
      cursor: 'not-allowed'
    }
  },

  ...(!isLoading && {
    '&:disabled': {
      color: theme.palette.grey[600]
    }
  }),

  '&.MuiButton-outlined': {
    color: 'white',
    borderColor: theme.palette.primary.main,
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      border: '1px solid'
    }
  }
}))
