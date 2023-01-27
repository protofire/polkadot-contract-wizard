import {GridView, LocalLibrary, SvgIconComponent } from '@mui/icons-material'

export type NavLink = {
    id: string
    title: string
    type: string
    url: string
    icon: SvgIconComponent
    target: boolean 
}

const icons = {
    GridView, LocalLibrary
}

export const MENU_ITEMS: NavLink[] = [
    {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        url: '/',
        icon: icons.GridView,
        target: true
    },
    {
        id: 'learn',
        title: 'Learn',
        type: 'item',
        url: '/learn',
        icon: icons.LocalLibrary,
        target: true
    }
]