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

        return [...prevAddresses, value]
      })
    }
  }, [value])

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
        freeSolo
        filterOptions={(options, params) => {
          const filtered = options.filter(option => {
            return option
              .toLowerCase()
              .includes(params.inputValue.toLowerCase())
          })

          // Add new option if no in.
          if (
            params.inputValue !== '' &&
            !filtered.includes(params.inputValue)
          ) {
            filtered.push(params.inputValue)
          }

          return filtered
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
