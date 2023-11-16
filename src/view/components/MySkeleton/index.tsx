import { Skeleton, SkeletonProps } from '@mui/material'

export function MySkeleton(props: SkeletonProps) {
  return <Skeleton sx={{ bgcolor: 'grey.700' }} {...props} />
}
