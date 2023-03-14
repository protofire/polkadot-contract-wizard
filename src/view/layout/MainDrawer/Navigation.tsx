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
import { MENU_ITEMS, NavLink } from '@constants'
import NextLink from 'next/link'

export const MenuItem = styled(MuiMenuItem)<ButtonProps>(({ theme }) => ({
  '& p': {
    color: theme.palette.common.white,
    padding: '1rem',
    fontSize: '1.1rem'
  },
  '& .Mui-selected': {
    color: theme.palette.primary.main
  },
  '& .MuiPaper-root': {
    color: theme.palette.common.white
  }
}))

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
      <Paper sx={{ width: '100%' }}>
        {MENU_ITEMS.map((item, index) => (
          <NavItem key={index} {...item} />
        ))}
      </Paper>
    </Stack>
  )
}

export default Navigation
