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
        <MySkeleton variant="text" width={200} height={40} />
        <Stack direction="row" spacing={2}>
          <MySkeleton variant="rectangular" width={40} height={40} />
          <MySkeleton variant="rectangular" width={40} height={40} />
          <MySkeleton variant="rectangular" width={40} height={40} />
        </Stack>
        <MySkeleton variant="text" width={150} height={20} />
      </Stack>
      <Stack direction="row" spacing={2}>
        <MySkeleton variant="text" width={300} height={20} />
        <MySkeleton variant="rectangular" width={40} height={40} />
      </Stack>
      <Box mt={2}>
        <MySkeleton variant="rectangular" height={20} />
        <MySkeleton variant="rectangular" height={20} />
        <MySkeleton variant="rectangular" height={20} />
        <MySkeleton variant="rectangular" height={20} />
      </Box>
      <Box mt={2}>
        <MySkeleton variant="text" width={200} height={40} />
        <MySkeleton variant="text" width={300} height={20} />
        <MySkeleton variant="rectangular" height={100} />
        <MySkeleton variant="rectangular" height={100} />
      </Box>
    </Box>
  )
}
