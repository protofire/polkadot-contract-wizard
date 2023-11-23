import { Autocomplete, InputLabel, TextField } from '@mui/material'
import { useEffect, useState } from 'react'

import { AccountAvatar } from './AccountAvatar'
import { useNetworkAccountsContext } from '@/context/NetworkAccountsContext'

type Props = {
  label?: string
  value: string
  onChange: (value: string) => void
}

export function AddressAccountSelect({
  label = 'My Accounts',
  value,
  onChange
}: Props) {
  const {
    state: { accounts }
  } = useNetworkAccountsContext()
  const [inputValue, setInputValue] = useState('')
  const [recentAddresses, setRecentAddresses] = useState<string[]>([])

  useEffect(() => {
    if (value && !recentAddresses.includes(value)) {
      setRecentAddresses([...recentAddresses, value])
    }
  }, [value, recentAddresses])

  const options = accounts ? accounts.map(account => account.address) : []
  const combinedOptions = Array.from(new Set([...recentAddresses, ...options]))

  return (
    <>
      <InputLabel>{label}</InputLabel>
      <Autocomplete
        value={value}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue)
        }}
        onChange={(event, newValue) => {
          if (newValue === null) {
            onChange('')
            return
          }

          onChange(newValue)
          if (newValue && !recentAddresses.includes(newValue)) {
            setRecentAddresses([...recentAddresses, newValue])
          }
        }}
        options={combinedOptions}
        getOptionLabel={option => {
          const account = accounts?.find(acc => acc.address === option)
          return account ? account.address : option
        }}
        renderOption={(props, option) => (
          <li {...props}>
            <AccountAvatar address={option} />
          </li>
        )}
        renderInput={params => <TextField {...params} label={label} />}
      />
    </>
  )
}
