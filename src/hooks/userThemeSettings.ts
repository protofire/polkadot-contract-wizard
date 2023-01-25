import { useContext } from 'react'
import { SettingsThemeContext, SettingsContextValue } from 'src/context/settingsTheme'

export const useUserThemeSettings = (): SettingsContextValue => useContext(SettingsThemeContext)

