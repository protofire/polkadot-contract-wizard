import { Autocomplete, InputLabel, TextField } from '@mui/material'
import { useEffect, useState } from 'react'

import { AccountAvatar } from './AccountAvatar'

type Props = {
  label?: string
  value: string
  onChange: (value: string) => void
  options?: string[]
}

export function AddressAccountSelect({
  label = 'My Accounts',
  value,
  onChange,
  options = []
}: Props) {
  const [inputValue, setInputValue] = useState(value ?? options[0])
  const [recentAddresses, setRecentAddresses] = useState<string[]>([])

  useEffect(() => {
    if (value) {
      setRecentAddresses(prevAddresses => {
        if (prevAddresses.includes(value)) return prevAddresses

        return [...recentAddresses, value]
      })
    }
  }, [recentAddresses, value])

  const combinedOptions = Array.from(new Set([...recentAddresses, ...options]))

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        options={options}
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
