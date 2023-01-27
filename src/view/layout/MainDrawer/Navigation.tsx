import { ListItem, ListItemButton, ListItemIcon, MenuItem as MuiMenuItem, MenuItemProps, styled, Stack, Paper, Typography, ButtonProps, Link as MuiLink } from '@mui/material';
import {MENU_ITEMS, NavLink} from '@constants';
import NextLink from 'next/link';

export const MenuItem = styled(MuiMenuItem)<ButtonProps>({
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
    const { title, icon: IconTag, url } = props

    return (
        <NextLink href={url}>
            <MenuItem LinkComponent={MuiLink}>
                <ListItemIcon>
                    <IconTag />
                </ListItemIcon>
                <Typography>{title}</Typography>
            </MenuItem>
        </NextLink>
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

