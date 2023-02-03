import React, { ReactNode, useEffect, useState } from 'react';
import { Box, styled } from '@mui/material';

import MainDrawer from './MainDrawer';
import { useUserThemeSettings } from 'src/hooks/userThemeSettings';
import { useMatchDownSM } from '@hooks';
import { BoxProps } from '@mui/system';
import Header from './Header';

type Props = {
  children: ReactNode;
};

const ContentWrapper = styled(Box)<BoxProps>(() => ({
  flexGrow: 1,
  minWidth: 0,
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
}));

export const MainLayout = ({ children, }: Props): JSX.Element => {
  const isMobile = useMatchDownSM();
  const { settings, saveSettings, } = useUserThemeSettings();
  const [isOpen, setIsOpen,] = useState(settings.navOpen);

  useEffect(() => {
    if (isMobile) {
      if (settings.navOpen) {
        saveSettings({ ...settings, navOpen: false, });
        setIsOpen(false);
      }
    } else {
      if (!isOpen) {
        saveSettings({ ...settings, navOpen: true, });
        setIsOpen(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile,]);

  const handleDrawerToggle = () => {
    saveSettings({ ...settings, navOpen: !isOpen, });
    setIsOpen(!isOpen);
  };

  return (
    <Box sx={{ display: 'flex', width: '100%', color: 'white', }}>
      <MainDrawer
        isMobile={isMobile}
        open={isOpen}
        handleDrawerToggle={handleDrawerToggle}
        drawerwidth={settings.drawerWidth}
      />
      <ContentWrapper
        component="main"
        sx={{ width: '100%', flexGrow: 1, border: '0', }}
      >
        <Header
          isMobile={isMobile}
          open={isOpen}
          handleDrawerToggle={handleDrawerToggle}
          drawerWidth={settings.drawerWidth}
        />
        {children}
      </ContentWrapper>
    </Box>
  );
};

export default MainLayout;
