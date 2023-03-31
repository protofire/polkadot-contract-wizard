import {
  LocalLibrary,
  SvgIconComponent,
  HomeRounded
} from '@mui/icons-material'
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
  HomeRounded,
  LocalLibrary
}

export const MENU_ITEMS: NavLink[] = [
  {
    id: 'home',
    title: 'Home',
    type: 'item',
    url: ROUTES.HOME,
    icon: icons.HomeRounded,
    target: true
  },
  {
    id: 'docs',
    title: 'Docs',
    type: 'item',
    url: ROUTES.DOCS,
    icon: icons.LocalLibrary,
    target: true
  }
]
