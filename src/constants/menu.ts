import {
  LocalLibrary,
  SvgIconComponent,
  SettingsSuggestRounded,
  DashboardCustomizeRounded
} from '@mui/icons-material'
import { ROUTES } from '@/constants/routes'

export type NavLink = {
  id: string
  title: string
  type: string
  url: string
  icon: SvgIconComponent
  target: boolean
}

const icons = {
  SettingsSuggestRounded,
  LocalLibrary,
  DashboardCustomizeRounded
}

export const MENU_ITEMS: NavLink[] = [
  {
    id: 'home',
    title: 'Contract Builder',
    type: 'item',
    url: ROUTES.HOME,
    icon: icons.SettingsSuggestRounded,
    target: true
  },
  {
    id: 'home',
    title: 'Dashboard',
    type: 'item',
    url: ROUTES.DASHBOARD,
    icon: icons.DashboardCustomizeRounded,
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
