import { AddressAccountSelect } from '@/components/AddressAccountSelect'
import { useNetworkAccountsContext } from '@/context/NetworkAccountsContext'
import { ArgumentComponentProps } from '@/domain/common/substrateInputTypes'

type ArgAccountSelectProps = ArgumentComponentProps<string>

export function ArgAccountSelect({ ...props }: ArgAccountSelectProps) {
  const {
    state: { accounts }
  } = useNetworkAccountsContext()
  const options = accounts ? accounts.map(account => account.address) : []

  return <AddressAccountSelect options={options} {...props} />
}
