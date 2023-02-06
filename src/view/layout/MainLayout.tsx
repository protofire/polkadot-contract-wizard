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

const MainWrapper = styled(Box)<BoxProps>(() => ({
  flexGrow: 1,
  minWidth: 0,
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
}));

const ContentWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(3, 4),
  [theme.breakpoints.down('sm')]: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  [theme.breakpoints.down('xs')]: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
}));

export const MainLayout = ({ children }: Props): JSX.Element => {
  const isMobile = useMatchDownSM();
  const { settings, saveSettings } = useUserThemeSettings();
  const [isOpen, setIsOpen] = useState(settings.navOpen);

  useEffect(() => {
    if (isMobile) {
      if (settings.navOpen) {
        saveSettings({ ...settings, navOpen: false });
        setIsOpen(false);
      }
    } else {
      if (!isOpen) {
        saveSettings({ ...settings, navOpen: true });
        setIsOpen(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  const handleDrawerToggle = () => {
    saveSettings({ ...settings, navOpen: !isOpen });
    setIsOpen(!isOpen);
  };

  return (
    <Box sx={{ display: 'flex', width: '100%', color: 'white' }}>
      <MainDrawer
        isMobile={isMobile}
        open={isOpen}
        handleDrawerToggle={handleDrawerToggle}
        drawerwidth={settings.drawerWidth}
      />
      <MainWrapper
        component="main"
        sx={{ width: '100%', flexGrow: 1, border: '0' }}
      >
        <Header
          isMobile={isMobile}
          open={isOpen}
          handleDrawerToggle={handleDrawerToggle}
          drawerWidth={settings.drawerWidth}
        />
        <ContentWrapper>{children}</ContentWrapper>
      </MainWrapper>
    </Box>
  );
};

export default MainLayout;
