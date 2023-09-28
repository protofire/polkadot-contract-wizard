import { styled } from '@mui/material/styles'
import Button, { ButtonProps } from '@mui/material/Button'

export const WrapperButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: 'white',
  fontSize: '1.4rem',
  borderRadius: '1rem',
  width: '100%',
  backgroundColor: 'transparent',
  display: 'flex',
  alignItems: 'center',
  margin: '0',
  position: 'relative',
  padding: '1.5rem',
  border: 'solid 1px transparent',
  backgroundImage:
    'linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0)), linear-gradient(90deg, #B214AC, #2EB5FD)',
  backgroundOrigin: 'border-box',
  backgroundClip: 'content-box, border-box',
  boxShadow: '2px 1000px 1px #0D0E13 inset',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    margin: '0.5rem !important',
    padding: '1.3rem'
  },

  '&:hover': {
    backgroundImage:
      'linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0)), linear-gradient(90deg, #ffffff, #ffb7ff)',
    backgroundOrigin: 'border-box',
    backgroundClip: 'content-box, border-box',
    boxShadow:
      '2px 1000px 1px #11121a inset, 0 4px 20px 2px rgba(241, 83, 255, 0.25)'
  }
}))
