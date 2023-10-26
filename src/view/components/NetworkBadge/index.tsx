import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { Avatar, Stack, Tooltip, Typography } from '@mui/material'
import * as React from 'react'

import { StyledStack } from './styled'

interface Props {
  name: string
  logo: string
  description?: string
  logoSize?: { width: number; height: number }
  showTooltip?: boolean
  textTooltip?: string
}

const TEXT_TOOLTIP =
  'This network is the one that has been selected in the top Network selector'

export default function NetworkBadge({
  name,
  logo,
  description,
  logoSize,
  showTooltip = true,
  textTooltip = TEXT_TOOLTIP
}: Props) {
  return (
    <StyledStack logosize={logoSize}>
      <Stack flexDirection="row" alignItems="center">
        <Avatar
          sx={{
            justifyContent: 'end',
            marginRight: '.5rem',
            width: 'auto',
            height: 'auto'
          }}
          src={logo}
          alt={description}
        />
        <Stack>
          <Typography fontWeight={700} variant="body1">
            {name}
          </Typography>
        </Stack>
      </Stack>
      <Stack>
        {showTooltip && (
          <Tooltip placement="right" title={textTooltip}>
            <HelpOutlineIcon fontSize="small" />
          </Tooltip>
        )}
      </Stack>
    </StyledStack>
  )
}
