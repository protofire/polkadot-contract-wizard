import { Dispatch, SetStateAction, useMemo } from 'react';
import { Box, Drawer, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import DrawerContent from './DrawerContent';
import DrawerHeader from './DrawerHeader';
import MiniDrawerStyled from './MiniDrawerStyled';

interface Props {
  open: boolean;
  handleDrawerToggle: Dispatch<SetStateAction<boolean>>;
  drawerwidth?: number;
  isMobile?: boolean;
}

const MainDrawer = ({
  open,
  isMobile,
  handleDrawerToggle,
  drawerwidth = 260,
}: Props) => {
  const theme = useTheme();

  const drawerContent = useMemo(() => <DrawerContent />, []);
  const drawerHeader = useMemo(() => <DrawerHeader open={open} />, [open]);

  const mobileProps = {
    open,
    ModalProps: {
      keepMounted: true,
    },
    onClose: () => handleDrawerToggle,
  }
  
  const desktopProps = {
    open: true,
    onClose: () => handleDrawerToggle,
  }

  return (
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        {...(isMobile ? { open } : { open: true })}
        {...(isMobile ? { ...mobileProps } : { ...desktopProps })}
        sx={{
          width: open ? drawerwidth : 0,
        }}
        PaperProps={{
          sx: {
          ...(!isMobile && !open ? { boxShadow: 10 } : {}),
            backgroundColor: theme.palette.primary.dark,
            width: open  ? drawerwidth : 0,
          },
        }}
      >
        {open && drawerHeader}
        {open && drawerContent}
      </Drawer>
  );
};

export default MainDrawer;
