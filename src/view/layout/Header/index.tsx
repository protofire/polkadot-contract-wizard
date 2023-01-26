import { MouseEventHandler } from 'react';
import { AppBar, IconButton, Toolbar, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Menu, MenuOpen } from '@mui/icons-material';

import AppBarStyled from './AppBarStyled';
import HeaderContent from './HeaderContent';

const Header = ({
  open,
  handleDrawerToggle,
  drawerWidth = 260,
}: {
  open: boolean;
  handleDrawerToggle: MouseEventHandler<HTMLButtonElement>;
  drawerWidth?: number;
}) => {
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));

  const iconBackColor = 'grey.100';
  const iconBackColorOpen = 'grey.200';

  // common header
  const mainHeader = (
    <Toolbar>
      <IconButton
        onClick={handleDrawerToggle}
        disableRipple
        aria-label="open drawer"
        edge="start"
        color="secondary"
        sx={{
          color: 'text.primary',
          bgcolor: open ? iconBackColorOpen : iconBackColor,
          ml: { xs: 0, lg: -2 },
        }}
      >
        {!open ? <Menu /> : <MenuOpen />}
      </IconButton>
      <HeaderContent />
    </Toolbar>
  );

  // app-bar params
  const appBar = {
    // position: 'fixed',
    // color: 'inherit',
    elevation: 0,
    sx: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      // boxShadow: theme.customShadows.z1
    },
  };

  return (
    <>
      {!matchDownMD ? (
        <AppBarStyled open={open} drawerwidth={drawerWidth} {...appBar}>
          {mainHeader}
        </AppBarStyled>
      ) : (
        <AppBar {...appBar}>{mainHeader}</AppBar>
      )}
    </>
  );
};

export default Header;
