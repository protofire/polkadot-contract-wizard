import { Theme } from '@mui/material'

import Badge from './Badge'
import Button from './Button'
import CardContent from './CardContent'
import IconButton from './IconButton'
import Typography from './Typography'
import ListItemIcon from './ListItemIcon'

// ==============================|| OVERRIDES ||============================== //

function ComponentsOverrides(theme: Theme) {
  const badge = Badge(theme)
  const button = Button(theme)
  const cardContent = CardContent()
  const iconButton = IconButton(theme)

  return Object.assign(
    badge,
    button,
    cardContent,
    iconButton,
    ListItemIcon,
    Typography
  )
}

export default ComponentsOverrides
