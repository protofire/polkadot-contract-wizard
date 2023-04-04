import {
  ListItemIcon,
  MenuItem as MuiMenuItem,
  styled,
  Stack,
  Paper,
  Typography,
  ButtonProps,
  Link as MuiLink
} from '@mui/material'
import NextLink from 'next/link'

import { MENU_ITEMS, NavLink } from '@/constants'

export const MenuItemStyled = styled(MuiMenuItem)<ButtonProps>(({ theme }) => ({
  '& p': {
    color: theme.palette.common.white,
    padding: '1rem 0.3rem',
    fontSize: '1.37rem'
  },
  '&.Mui-selected': {
    backgroundColor: 'transparent',
    p: {
      color: theme.palette.primary.main
    },
    svg: {
      color: theme.palette.primary.main
    }
  },
  '&.Mui-selected:hover': {
    backgroundColor: 'transparent',
    color: theme.palette.common.white
  }
}))

const NavItem = (props: NavLink & { currentPath: string }) => {
  const { title, icon: IconTag, url, currentPath } = props

  return (
    <NextLink href={url}>
      <MenuItemStyled LinkComponent={MuiLink} selected={currentPath === url}>
        <ListItemIcon>
          <IconTag />
        </ListItemIcon>
        <Typography>{title}</Typography>
      </MenuItemStyled>
    </NextLink>
  )
}

const Navigation = ({ currentPath }: { currentPath: string }) => {
  return (
    <Stack direction="row" spacing={2}>
      <Paper sx={{ width: '100%', background: 'transparent' }}>
        {MENU_ITEMS.map((item, index) => (
          <NavItem key={index} currentPath={currentPath} {...item} />
        ))}
      </Paper>
    </Stack>
  )
}

export default Navigation
