import { IconButton, SxProps } from '@mui/material'
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded'
import { Tooltip } from 'react-tooltip'

import { useCopyToClipboard } from '@/hooks'

interface Props {
  data: string
  sx?: SxProps
  id: string
}

export const CopyToClipboardButton = ({ data, sx, id }: Props) => {
  const [recentlyCopied, copyToClipboard] = useCopyToClipboard()

  return (
    <>
      <IconButton
        data-tooltip-id={id}
        data-tooltip-content="Copied to clipboard"
        size="small"
        color="primary"
        onClick={() => copyToClipboard(data)}
        sx={sx}
      >
        <ContentCopyRoundedIcon fontSize="inherit" />
      </IconButton>
      <Tooltip id={id} place="top" isOpen={recentlyCopied} />
    </>
  )
}
