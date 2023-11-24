import { Autocomplete, TextField } from '@mui/material'
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
  value = '',
  onChange
}: Props) {
  const {
    state: { accounts }
  } = useNetworkAccountsContext()
  const [inputValue, setInputValue] = useState(value)
  const [recentAddresses, setRecentAddresses] = useState<string[]>([])

  useEffect(() => {
    if (value) {
      setRecentAddresses(prevAddresses => {
        if (prevAddresses.includes(value)) return prevAddresses

        return [...recentAddresses, value]
      })
    }
  }, [recentAddresses, value])

  const options = accounts ? accounts.map(account => account.address) : []
  const combinedOptions = Array.from(new Set([...recentAddresses, ...options]))

  const handleAutoCompleteChange = (event: any, newValue: string | null) => {
    if (newValue !== null) {
      onChange(newValue)
      setRecentAddresses(prevAddresses => {
        if (!prevAddresses.includes(newValue)) {
          return [...prevAddresses, newValue]
        }
        return prevAddresses
      })
    } else {
      onChange('')
    }
  }

  return (
    <>
      <Autocomplete
        value={value ?? ''}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue)
        }}
        onChange={handleAutoCompleteChange}
        options={combinedOptions}
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
