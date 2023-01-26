import React, { ReactNode, useState } from 'react';
import Link from 'next/link';
import { Box, Toolbar, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import Header from './Header';
import Drawer from './Drawer';
import { useUserThemeSettings } from 'src/hooks/userThemeSettings';

type Props = {
  children: ReactNode;
};

export const MainLayout = ({ children }: Props): JSX.Element => {
  const theme = useTheme();
  const matchDownLG = useMediaQuery(theme.breakpoints.down('xl'));
  const { settings, saveSettings } = useUserThemeSettings();
  // const [open, setOpen] = useState(!settings.navCollapsed);
  const open = !settings.navCollapsed

  const handleDrawerToggle = () => {
    // setOpen(!open);
    saveSettings({ ...settings, navCollapsed: !open });
  };

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <Header
        open={open}
        handleDrawerToggle={handleDrawerToggle}
        drawerWidth={settings.drawerWidth}
      />
      <Drawer
        open={open}
        handleDrawerToggle={handleDrawerToggle}
        drawerwidth={settings.drawerWidth}
      />
      <Box
        component="main"
        sx={{ width: '100%', flexGrow: 1, p: { xs: 2, sm: 3 } }}
      >
        <Toolbar />
        {/* <Breadcrumbs navigation={navigation} title titleBottom card={false} divider={false} />
                <Outlet /> */}
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;
