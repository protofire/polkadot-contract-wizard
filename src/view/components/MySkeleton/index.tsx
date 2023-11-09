import { Skeleton, SkeletonProps } from '@mui/material'

export function MySkeleton(props: SkeletonProps) {
  return <Skeleton {...props} sx={{ bgcolor: 'grey.700' }} />
}
