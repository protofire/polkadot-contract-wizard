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
  isMobile?: boolean
}

const MainDrawer = ({ open, isMobile, handleDrawerToggle, drawerwidth = 260 }: Props) => {
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));

  // responsive drawer container
  const container =
    typeof window !== 'undefined' ? () => window.document.body : undefined;

  // header content
  const drawerContent = useMemo(() => <DrawerContent />, []);
  const drawerHeader = useMemo(() => <DrawerHeader open={open} />, [open]);

  return (
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        {...(isMobile ? {open} : {open: true})}
        sx={{
          width: open ? drawerwidth : 150 
        }} 
        PaperProps={{
          sx: {
            backgroundColor: theme.palette.primary.dark,
          }
        }}
      >
        {drawerHeader}
      </Drawer>
  );
};
      {/* {!matchDownMD ? (
        <MiniDrawerStyled
          variant="permanent"
          open={open}
          drawerwidth={drawerwidth}
        >
          {drawerHeader}
          {drawerContent}
        </MiniDrawerStyled>
      ) : (
        <Drawer
          container={container}
          variant="temporary"
          open={open}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', lg: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerwidth,
              borderRight: `1px solid ${theme.palette.divider}`,
              backgroundImage: 'none',
              boxShadow: 'inherit',
            },
          }}
        >
          {open && drawerHeader}
          {open && drawerContent}
        </Drawer>
      )} */}

export default MainDrawer;
