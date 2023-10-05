import { IconButton, SvgIcon, SvgIconTypeMap, SxProps } from '@mui/material'
import Tooltip from '@mui/material/Tooltip'
import { OverridableComponent } from '@mui/material/OverridableComponent'

interface Props {
  data: string
  sx?: SxProps
  id: string
  title: string
  Icon: OverridableComponent<SvgIconTypeMap<object, 'svg'>> & {
    muiName: string
  }
}

export const DefaultToolTipButton = ({ data, sx, title, Icon }: Props) => {
  return (
    <Tooltip placement="top" title={title}>
      <IconButton
        size="small"
        color="primary"
        onClick={() => undefined}
        sx={sx}
      >
        <SvgIcon component={Icon} fontSize="inherit" />
      </IconButton>
    </Tooltip>
  )
}
