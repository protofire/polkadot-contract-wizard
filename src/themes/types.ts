import { PaletteMode } from '@mui/material'

export type Skin = 'default' | 'bordered' | 'semi-dark'

export type Settings = {
    mode: PaletteMode
    skin: Skin
}