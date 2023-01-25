import { styled } from '@mui/material/styles';
import AppBar, {AppBarProps} from '@mui/material/AppBar';


type CustomAppBarProps = AppBarProps & {
    open: boolean
    drawerWidth: number
}

const AppBarStyled = styled(AppBar, { shouldForwardProp: (prop) => prop !== 'open' })<CustomAppBarProps>(({ theme, open, drawerWidth }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    })
}));

export default AppBarStyled;

