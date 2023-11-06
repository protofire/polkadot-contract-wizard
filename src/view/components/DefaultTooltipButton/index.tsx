import { Ref, forwardRef } from 'react'
import {
  ButtonProps,
  IconButton,
  SvgIcon,
  SvgIconTypeMap,
  SxProps
} from '@mui/material'
import Tooltip from '@mui/material/Tooltip'
import { OverridableComponent } from '@mui/material/OverridableComponent'

interface Props extends ButtonProps {
  sx?: SxProps
  id: string
  title: string
  Icon: OverridableComponent<SvgIconTypeMap<object, 'svg'>> & {
    muiName: string
  }
}

export const DefaultToolTipButton = forwardRef(function DefaultToolTipButtonRef(
  { sx, title, Icon, onClick, ...other }: Props,
  ref: Ref<HTMLButtonElement>
) {
  return (
    <Tooltip ref={ref} placement="top" title={title}>
      <IconButton
        size="small"
        color="primary"
        onClick={onClick}
        sx={{ cursor: 'context-menu', ...sx }}
        {...other}
      >
        <SvgIcon component={Icon} fontSize="inherit" />
      </IconButton>
    </Tooltip>
  )
})
