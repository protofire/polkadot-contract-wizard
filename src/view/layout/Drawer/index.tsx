import { Dispatch, SetStateAction, useMemo } from "react";
import { Box, Drawer, useMediaQuery, useTheme } from "@mui/material";

import DrawerContent from './DrawerContent';
import MiniDrawerStyled from './MiniDrawerStyled';

interface Props {
    open: boolean
    handleDrawerToggle: Dispatch<SetStateAction<boolean>>
    drawerWidth?: number 
}

const MainDrawer = ({ open, handleDrawerToggle, drawerWidth = 260 }: Props) => {
    const theme = useTheme();
    const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));

    // responsive drawer container
    const container = typeof window !== "undefined" ? () => window.document.body : undefined;

    // // header content
    const drawerContent = useMemo(() => <DrawerContent />, []);
    // const drawerHeader = useMemo(() => <DrawerHeader open={open} />, [open]);

    return (
        <Box component="nav" sx={{ flexShrink: { md: 0 }, zIndex: 1300 }} aria-label="mailbox folders">
            {!matchDownMD ? (
                <MiniDrawerStyled variant="permanent" open={open} drawerWidth={drawerWidth}>
                    {/* {drawerHeader} */}
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
                            // width: drawerWidth,
                            borderRight: `1px solid ${theme.palette.divider}`,
                            backgroundImage: 'none',
                            boxShadow: 'inherit'
                        }
                    }}
                >
                    {/* {open && drawerHeader}
                    {open && drawerContent} */}
                </Drawer>
            )}
        </Box>
    );
};

export default MainDrawer;
