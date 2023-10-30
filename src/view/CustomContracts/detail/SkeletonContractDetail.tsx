import React from 'react'
import { Box, Stack } from '@mui/material'
import { MySkeleton } from '@/view/components/MySkeleton'

export function ContractDetailSkeleton() {
  return (
    <Box
      sx={{
        width: { sm: '90%', md: '75%', lg: '80%', xl: '60%' },
        margin: '0 auto 2rem auto'
      }}
    >
      <Stack direction="row" justifyContent="space-between">
        <MySkeleton variant="text" width={200} height={50} />
        <MySkeleton variant="text" width={150} height={30} />
      </Stack>
      <Stack direction="row" spacing={2}>
        <MySkeleton variant="text" width={300} height={30} />
      </Stack>

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
          <MySkeleton variant="rectangular" width={'25%'} height={60} />
          <MySkeleton variant="rectangular" width={'25%'} height={60} />
        </Stack>
        <MySkeleton variant="rectangular" height={350} />
      </Box>
    </Box>
  )
}
