import { useContext } from 'react'
import {
  SettingsThemeContext,
  SettingsContextValue
} from '@/context/settingsTheme'

export const useUserThemeSettings = (): SettingsContextValue =>
  useContext(SettingsThemeContext)
