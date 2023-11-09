import { AddressAccountSelect } from '@/components/AddressAccountSelect'
import { ArgumentComponentProps } from '@/domain/common/substrateInputTypes'

type ArgAccountSelectProps = ArgumentComponentProps<string>

export function ArgAccountSelect({ ...props }: ArgAccountSelectProps) {
  return <AddressAccountSelect {...props} />
}
