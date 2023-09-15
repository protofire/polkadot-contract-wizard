import {
  MenuItem,
  MenuItemProps,
  Select,
  SelectProps,
  Typography,
  TypographyProps,
  styled
} from '@mui/material'

export const StyledSelect = styled(Select)<SelectProps>(() => ({
  color: 'white',
  display: 'flex',
  margin: '0.5rem 0',
  padding: '0',
  height: '2.88em',
  borderRadius: '0.5rem',

  '& fieldset': {
    top: '0'
  },

  '& span': {
    fontSize: '0.8rem',
    marginLeft: '1rem'
  },

  '& p': {
    fontSize: '0.8rem',
    marginLeft: '1rem',
    fontWeight: '600',
    lineHeight: '12px'
  },

  '& legend': {
    display: 'none'
  }
}))

export const StyledMenuItem = styled(MenuItem)<MenuItemProps>(() => ({
  color: 'white',

  '& span': {
    fontSize: '0.8rem',
    marginLeft: '1rem'
  },

  '& p': {
    fontSize: '0.8rem',
    marginLeft: '1rem',
    fontWeight: '600',
    lineHeight: '12px'
  }
}))

export const StyledTypography = styled(Typography)<TypographyProps>(() => ({
  marginLeft: '0',
  height: '10px',
  fontSize: '1rem'
}))
