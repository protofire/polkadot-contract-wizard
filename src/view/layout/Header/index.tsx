import { MouseEventHandler } from 'react';
import { AppBar, IconButton, Toolbar } from '@mui/material';
import { Menu, MenuOpen } from '@mui/icons-material';

import HeaderContent from './HeaderContent';

import { styled } from '@mui/material/styles';
import { AppBarProps } from '@mui/material/AppBar';

type CustomAppBarProps = AppBarProps & {
  open: boolean;
  ismobile: boolean;
};

const AppBarStyled = styled(AppBar, {
  shouldForwardProp: prop => prop !== 'open',
})<CustomAppBarProps>(({ theme, open, ismobile }) => ({
  padding: 0,
  flexDirection: "row-reverse",
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  // ...(ismobile && {
  //   flexDirection: 'row-reverse',
  // })
}))


const Header = ({
  open,
  isMobile,
  handleDrawerToggle,
}: {
  isMobile: boolean;
  open: boolean;
  handleDrawerToggle: MouseEventHandler<HTMLButtonElement>;
  drawerWidth?: number;
}) => {
  // common header
  const mainHeader = (
    <Toolbar>
      <IconButton
        onClick={handleDrawerToggle}
        disableRipple
        aria-label="open drawer"
        edge="start"
        sx={{
          ml: { xs: 0, lg: -2 },
        }}
      >
        {!open ? <Menu /> : <MenuOpen />}
      </IconButton>
      <HeaderContent />
    </Toolbar>
  );

  return (
    <AppBarStyled elevation={0} position='sticky' open={open} ismobile={isMobile.toString()}>
      {mainHeader}
    </AppBarStyled>
  )
}

export default Header;
