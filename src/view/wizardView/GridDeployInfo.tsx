import React from 'react'
import { Box, BoxProps, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

import { ContractDeployed } from '@/domain'
import { emptyAsDash, truncateAddress } from '@/utils/formatString'
import { MonoTypography } from '@/components'

const BoxGridStyled = styled(Box)<BoxProps>(() => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridTemplateRows: 'repeat(3, 1fr)',
  gap: '1rem',
  paddingTop: '2rem'
}))

const BoxRow = styled(Box)<BoxProps>(() => ({
  display: 'inherit'
}))

export function GridDeployInfo({
  deployedContract
}: {
  deployedContract: ContractDeployed | undefined
}) {
  return (
    <BoxGridStyled>
      <BoxRow>
        <Typography variant="caption" fontWeight="500">
          Chain Name
        </Typography>
        <Typography variant="body1">
          {emptyAsDash(deployedContract?.blockchain)}
        </Typography>
      </BoxRow>
      <BoxRow>
        <Typography variant="caption" fontWeight="500">
          Address
        </Typography>
        <MonoTypography variant="body1">
          {truncateAddress(deployedContract?.address)}
        </MonoTypography>
      </BoxRow>
      <BoxRow>
        <Typography variant="caption" fontWeight="500">
          Tx hash
        </Typography>
        <MonoTypography variant="body1">
          {truncateAddress(deployedContract?.txHash, 8)}
        </MonoTypography>
      </BoxRow>
    </BoxGridStyled>
  )
}
