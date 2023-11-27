import { Autocomplete, TextField } from '@mui/material'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { AccountAvatar } from './AccountAvatar'

interface OptionItemGroup {
  address: string
  type: string
}

type Props = {
  label?: string
  value: string
  onChange: (value: string) => void
  options?: OptionItemGroup[]
}

function combineOptions(recentAddresses: string[], options: OptionItemGroup[]) {
  return recentAddresses
    .map(a => ({ address: a, type: 'Recents' }))
    .concat(options)
}

export function AddressAccountSelect({
  label = 'My Accounts',
  value,
  onChange,
  options = []
}: Props) {
  const [inputValue, setInputValue] = useState(value ?? options[0])
  const [recentAddresses, setRecentAddresses] = useState<string[]>([])
  const optionsAddress = useMemo(() => options.map(e => e.address), [options])

  const addNewAddress = useCallback(
    (value: string) => {
      if (optionsAddress.includes(value)) {
        return
      }

      setRecentAddresses(prevAddresses => {
        if (prevAddresses.includes(value)) return prevAddresses

        return [...recentAddresses, value]
      })
    },
    [optionsAddress, recentAddresses]
  )

  useEffect(() => {
    if (value) {
      addNewAddress(value)
    }
  }, [addNewAddress, recentAddresses, value])

  const combinedOptions = combineOptions(recentAddresses, options)

  const handleAutoCompleteChange = (
    event: any,
    newValue: string | OptionItemGroup | null
  ) => {
    if (newValue === null) {
      onChange('')
      return
    }

    if (typeof newValue === 'string') {
      addNewAddress(newValue)
      onChange(newValue)
    } else {
      onChange(newValue.address)
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'Tab': {
        if (inputValue.length > 0) {
          handleAutoCompleteChange(event, inputValue)
        }
        break
      }
      default:
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
        groupBy={option => option.type}
        getOptionLabel={o => (typeof o === 'string' ? o : o.address)}
        renderOption={(props, option) => (
          <li {...props}>
            <AccountAvatar address={option.address} />
          </li>
        )}
        renderInput={params => {
          params.inputProps.onKeyDown = handleKeyDown
          return <TextField {...params} label={label} />
        }}
      />
    </>
  )
}
