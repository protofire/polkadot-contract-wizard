import { ListItem, ListItemButton, ListItemIcon, MenuItem as MuiMenuItem, MenuItemProps, styled, Stack, Paper, Typography } from '@mui/material';
import {MENU_ITEMS, NavLink} from '@constants';

export const MenuItem = styled(MuiMenuItem)<MenuItemProps>({
    "&.MuiMenuItem-root": {
        color: "blue",
        padding: "10px",
        "&.Mui-selected": {
          backgroundColor: "red"
        },
        "&:hover": {
          backgroundColor: "green"
        }
      }
})

const NavItem = (props: NavLink) => {
    const { title, icon: IconTag } = props
    return (
        <MenuItem>
            <ListItemIcon>
                <IconTag />
            </ListItemIcon>
            <Typography>{title}</Typography>
        </MenuItem>
    )
}


const Navigation = () => {
    return (
        <Stack direction="row" spacing={2}>
           <Paper>
            {MENU_ITEMS.map((item, index) => (
                <NavItem key={index} {...item}/>
            ))}
            </Paper> 
        </Stack>
    )
}

export default Navigation;

