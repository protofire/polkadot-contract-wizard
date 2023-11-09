import { useMemo } from 'react'
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded'
import { IconButton, Link, Tooltip } from '@mui/material'

import { getChain } from '@/constants/chains'
import { ChainId } from '@/services/useink/chains'
import React from 'react'

interface ExplorerLinkProps {
  blockchain: ChainId
  txHash?: string
}

export function ExplorerLink({
  blockchain,
  txHash
}: ExplorerLinkProps): JSX.Element | null {
  const explorerUrl = useMemo(
    () => getChain(blockchain).subscanUrl,
    [blockchain]
  )
  const linkDisabled = txHash ? false : true

  if (!explorerUrl) return null

  const iconWithStyles = linkDisabled ? (
    <Tooltip title="Transaction hash is not available.">
      <OpenInNewRoundedIcon fontSize="small" />
    </Tooltip>
  ) : (
    <OpenInNewRoundedIcon fontSize="small" />
  )

  return (
    <Link href={`${explorerUrl}extrinsic/${txHash}`} target="_blank">
      <IconButton
        component="a"
        disabled={linkDisabled}
        size="small"
        color="primary"
      >
        {iconWithStyles}
      </IconButton>
    </Link>
  )
}
