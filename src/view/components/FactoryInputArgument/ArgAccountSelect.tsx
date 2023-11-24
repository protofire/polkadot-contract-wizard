import { AddressAccountSelect } from '@/components/AddressAccountSelect'
import { useNetworkAccountsContext } from '@/context/NetworkAccountsContext'
import { ArgumentComponentProps } from '@/domain/common/substrateInputTypes'
import { useMemo } from 'react'

type ArgAccountSelectProps = ArgumentComponentProps<string>

export function ArgAccountSelect({ ...props }: ArgAccountSelectProps) {
  const {
    state: { accounts }
  } = useNetworkAccountsContext()
  const options = useMemo(
    () => (accounts ? accounts.map(account => account.address) : []),
    [accounts]
  )

  return <AddressAccountSelect options={options} {...props} />
}
