import { MouseEventHandler } from 'react';
import { AppBar, IconButton, Toolbar } from '@mui/material';
import { Menu, MenuOpen } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

import HeaderContent from './HeaderContent';
import { shouldForwardProp } from '@types';

import { AppBarProps } from '@mui/material/AppBar';

type CustomAppBarProps = {
  open: boolean;
};

const AppBarStyled = styled(AppBar, {
  shouldForwardProp: prop =>
    shouldForwardProp<CustomAppBarProps>(['open'], prop),
})<CustomAppBarProps & AppBarProps>(({ theme, open }) => ({
  padding: 0,
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
}));

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
    <Toolbar
      sx={{
        ...(isMobile && {
          flexDirection: 'row-reverse',
          width: 'inherit',
        }),
      }}
    >
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
      <HeaderContent isMobile={isMobile} />
    </Toolbar>
  );

  return (
    <AppBarStyled elevation={0} position="sticky" open={open}>
      {mainHeader}
    </AppBarStyled>
  );
};

export default Header;
