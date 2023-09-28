import {
  LocalLibrary,
  SvgIconComponent,
  SettingsSuggestRounded,
  DataArrayRounded
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
  DataArrayRounded
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
    id: 'contracts',
    title: 'Contracts',
    type: 'item',
    url: ROUTES.CONTRACTS,
    icon: icons.DataArrayRounded,
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
