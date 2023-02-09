import { styled } from '@mui/material/styles'
import AppBar, { AppBarProps } from '@mui/material/AppBar'

type CustomAppBarProps = AppBarProps & {
  open: boolean
  drawerwidth: number
}

const AppBarStyled = styled(AppBar, {
  shouldForwardProp: prop => prop !== 'open',
})<CustomAppBarProps>(({ theme, open, drawerwidth }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerwidth,
    width: `calc(100% - ${drawerwidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

export default AppBarStyled
