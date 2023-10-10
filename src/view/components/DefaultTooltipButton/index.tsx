import { IconButton, SvgIcon, SvgIconTypeMap, SxProps } from '@mui/material'
import Tooltip from '@mui/material/Tooltip'
import { OverridableComponent } from '@mui/material/OverridableComponent'

interface Props {
  sx?: SxProps
  id: string
  title: string
  Icon: OverridableComponent<SvgIconTypeMap<object, 'svg'>> & {
    muiName: string
  }
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export const DefaultToolTipButton = ({ sx, title, Icon, onClick }: Props) => {
  return (
    <Tooltip placement="top" title={title}>
      <IconButton size="small" color="primary" onClick={onClick} sx={sx}>
        <SvgIcon component={Icon} fontSize="inherit" />
      </IconButton>
    </Tooltip>
  )
}
