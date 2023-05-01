import { Chip, ChipProps } from '@mui/material'

export interface ChipLabelProps extends ChipProps {
  label: string
}

export function ChipLabel({ label, color, size = 'small' }: ChipLabelProps) {
  return <Chip label={label} variant="outlined" color={color} size={size} />
}
