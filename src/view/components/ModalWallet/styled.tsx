import {
  styled,
  ListItemButton,
  ListItemButtonProps,
  Box,
  BoxProps,
  Typography,
  TypographyProps,
  Divider,
  List,
  ListProps
} from '@mui/material'

export const ModalStyledList = styled(List)<ListProps>(() => ({
  margin: '0 auto',
  width: '16rem',
  '&:hover': {
    borderRadius: '1.8rem'
  }
}))

export const ModalStyledListItem = styled(ListItemButton)<ListItemButtonProps>(
  () => ({
    '&:hover': {
      borderRadius: '1.8rem',
      backgroundColor: 'rgba(98, 98, 98, 0.26)'
    }
  })
)

export const ModalTypography = styled(Typography)<TypographyProps>(() => ({
  textAlign: 'center',
  fontWeight: 'normal',
  marginTop: '2rem',
  marginBottom: '1.5rem'
}))

export const ModalStyledDivider = styled(Divider)(() => ({
  margin: '2rem'
}))

export const ModalStyled = styled(Box)<BoxProps>(({}) => ({
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 680,
  height: 600,
  textAlign: 'justify',
  backgroundColor: 'rgba(0, 0, 0, 1)',
  border: '2px solid #000',
  borderRadius: '3.75rem',
  padding: '3rem 3rem 2.5rem 3rem',
  boxShadow: '0px 4px 50px 0px rgba(255, 255, 255, 0.1);',
  color: 'white',
  display: 'flex',
  flexDirection: 'column'
}))
