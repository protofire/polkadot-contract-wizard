import React from 'react'
import { Box, Stack } from '@mui/material'
import { MySkeleton } from '@/view/components/MySkeleton'
import MainContainer from '@/view/layout/MainContainer'

export function ContractDetailSkeleton() {
  return (
    <MainContainer>
      <Stack direction="row" width={'100%'} justifyContent="space-between">
        <Stack spacing={3}>
          <MySkeleton variant="text" width={200} height={60} />
        </Stack>
        <Stack direction="row" width={'100%'} spacing={3} display="flex">
          <MySkeleton variant="rounded" width={'25%'} height={30} />
          <MySkeleton variant="rounded" width={'25%'} height={30} />
        </Stack>
      </Stack>
      <MySkeleton variant="text" width={400} height={30} />

      <Stack direction="row" spacing={2}></Stack>

      <Box mt={4}>
        <Stack direction="row" width={'100%'} spacing={2}>
          <MySkeleton variant="rectangular" width={'25%'} height={60} />
          <MySkeleton variant="rectangular" width={'25%'} height={60} />
          <MySkeleton variant="rectangular" width={'25%'} height={60} />
          <MySkeleton variant="rectangular" width={'25%'} height={60} />
        </Stack>
      </Box>
      <Box mt={8}>
        <Stack direction="row" width={'100%'} spacing={1}>
          <MySkeleton variant="rectangular" width={'10%'} height={50} />
          <MySkeleton variant="rectangular" width={'10%'} height={50} />
        </Stack>
        <MySkeleton variant="rectangular" height={350} />
      </Box>
    </MainContainer>
  )
}
