import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  MenuItem as MuiMenuItem,
  MenuItemProps,
  styled,
  Stack,
  Paper,
  Typography,
  ButtonProps,
  Link as MuiLink,
} from '@mui/material';
import { MENU_ITEMS, NavLink } from '@constants';
import NextLink from 'next/link';

export const MenuItem = styled(MuiMenuItem)<ButtonProps>(({ theme }) => ({
  '&.MuiMenuItem-root': {
    color: theme.palette.common.white,
    padding: '1rem',
    '&.Mui-selected': {
      color: theme.palette.common.white,
    },
    '&:hover': {
      color: theme.palette.common.white,
    },
  },
}));

const NavItem = (props: NavLink) => {
  const { title, icon: IconTag, url } = props;

  return (
    <NextLink href={url}>
      <MenuItem LinkComponent={MuiLink}>
        <ListItemIcon>
          <IconTag />
        </ListItemIcon>
        <Typography>{title}</Typography>
      </MenuItem>
    </NextLink>
  );
};

const Navigation = () => {
  return (
    <Stack direction="row" spacing={2}>
      <Paper sx={{ backgroundColor: 'transparent', width: '100%' }}>
        {MENU_ITEMS.map((item, index) => (
          <NavItem key={index} {...item} />
        ))}
      </Paper>
    </Stack>
  );
};

export default Navigation;
