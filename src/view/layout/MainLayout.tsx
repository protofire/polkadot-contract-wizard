import React, { ReactNode, useEffect, useRef } from 'react';
import { Box, Toolbar } from '@mui/material';

import Header from './Header';
import MainDrawer from './MainDrawer';
import { useUserThemeSettings } from 'src/hooks/userThemeSettings';
import { useMatchDownSM } from '@hooks';

type Props = {
  children: ReactNode;
};

export const MainLayout = ({ children }: Props): JSX.Element => {
  const isMobile = useMatchDownSM()
  const { settings, saveSettings } = useUserThemeSettings();
  const isOpen = useRef<boolean>(settings.navOpen)
  
  useEffect(() => {
    if (isMobile) {
      if (settings.navOpen) {
        saveSettings({ ...settings, navOpen: false })
        isOpen.current = false 
      }     
    } 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile])


  const handleDrawerToggle = () => {
    saveSettings({ ...settings, navOpen: !isOpen.current });
    isOpen.current = !isOpen.current
  };

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <MainDrawer
        isMobile={isMobile}
        open={isOpen.current}
        handleDrawerToggle={handleDrawerToggle}
        drawerwidth={settings.drawerWidth}
      />
      {/* <Header
        open={isOpen.current}
        handleDrawerToggle={handleDrawerToggle}
        drawerWidth={settings.drawerWidth}
      /> */}
      <Box
        component="main"
        sx={{ width: '100%', flexGrow: 1, p: { xs: 2, sm: 3 } }}
      >
        {/* <Toolbar /> */}
        {/* <Breadcrumbs navigation={navigation} title titleBottom card={false} divider={false} />
                <Outlet /> */}
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;
