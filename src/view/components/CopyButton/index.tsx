import { IconButton, SxProps } from '@mui/material'
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded'
import Tooltip from '@mui/material/Tooltip'

import { useCopyToClipboard } from '@/hooks'

interface Props {
  data: string
  sx?: SxProps
  id: string
}

export const CopyToClipboardButton = ({ data, sx }: Props) => {
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
      >
        <ContentCopyRoundedIcon fontSize="inherit" />
      </IconButton>
    </Tooltip>
  )
}
