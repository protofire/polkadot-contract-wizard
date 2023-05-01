import { TokenType } from '@/domain/TokenType'

import { ChipLabel, ChipLabelProps } from './ChipLabel'

interface Props {
  label: TokenType
  size?: ChipLabelProps['size']
}

const mapColor: Record<TokenType, ChipLabelProps['color']> = {
  psp22: 'success',
  psp34: 'primary',
  psp37: 'info'
}

export function PspChipLabel({ label, size }: Props) {
  return <ChipLabel label={label} size={size} color={mapColor[label]} />
}
