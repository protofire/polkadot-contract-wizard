import { styled, Theme } from '@mui/material/styles';
import Drawer, { DrawerProps } from '@mui/material/Drawer';

// project import
// import { drawerWidth } from 'config';

const openedMixin = (theme: Theme) => ({
    borderRight: `1px solid ${theme.palette.divider}`,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
    }),
    overflowX: 'hidden',
    boxShadow: 'none'
});

const closedMixin = (theme: Theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: 0,
    borderRight: 'none',
    // boxShadow: theme.customShadows.z1
});

type CustomDrawerProps = DrawerProps & {
    open: boolean
    drawerWidth: number
}

const MiniDrawerStyled = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })<CustomDrawerProps>(({open, drawerWidth, theme}) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
        '& .MuiDrawer-paper': openedMixin(theme)
    }),
    ...(!open && {
        '& .MuiDrawer-paper': closedMixin(theme)
    })
    // ...(open && {
    //     ...openedMixin(theme),
    //     '& .MuiDrawer-paper': openedMixin(theme)
    // }),
    // ...(!open && {
    //     ...closedMixin(theme),
    //     '& .MuiDrawer-paper': closedMixin(theme)
    // })
}));

export default MiniDrawerStyled;

