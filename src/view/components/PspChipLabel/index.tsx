import { ChipLabel, ChipLabelProps } from './ChipLabel'
import { ContractType } from '@/domain/repositories/DeploymentRepository'

interface Props {
  label: ContractType
  size?: ChipLabelProps['size']
}

const mapColor: Record<ContractType, ChipLabelProps['color']> = {
  psp22: 'success',
  psp34: 'primary',
  psp37: 'info',
  custom: 'error'
}

export function PspChipLabel({ label, size }: Props) {
  return <ChipLabel label={label} size={size} color={mapColor[label]} />
}
