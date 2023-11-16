import { IconButton, SxProps } from '@mui/material'
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded'
import Tooltip from '@mui/material/Tooltip'

import { useCopyToClipboard } from '@/hooks'

interface Props {
  data: string
  sx?: SxProps
  id: string
  disabled?: boolean
}

export const CopyToClipboardButton = ({ data, sx, disabled }: Props) => {
  const [recentlyCopied, copyToClipboard] = useCopyToClipboard()

  return (
    <Tooltip placement="top" title="Copied to clipboard" open={recentlyCopied}>
      <IconButton
        size="small"
        color="primary"
        onClick={event => {
          event.stopPropagation()
          copyToClipboard(data)
        }}
        sx={sx}
        disabled={disabled}
      >
        <ContentCopyRoundedIcon fontSize="inherit" />
      </IconButton>
    </Tooltip>
  )
}
