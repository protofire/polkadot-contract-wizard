import { GridView, LocalLibrary, SvgIconComponent } from '@mui/icons-material'
import { ROUTES } from './routes'

export type NavLink = {
  id: string
  title: string
  type: string
  url: string
  icon: SvgIconComponent
  target: boolean
}

const icons = {
  GridView,
  LocalLibrary
}

export const MENU_ITEMS: NavLink[] = [
  {
    id: 'home',
    title: 'Home',
    type: 'item',
    url: ROUTES.HOME,
    icon: icons.GridView,
    target: true
  },
  {
    id: 'learn',
    title: 'Learn',
    type: 'item',
    url: ROUTES.LEARN,
    icon: icons.LocalLibrary,
    target: true
  }
]
