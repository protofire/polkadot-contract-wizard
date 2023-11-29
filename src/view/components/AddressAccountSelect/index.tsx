import { TextField, Autocomplete } from '@mui/material'
import { useCallback, useMemo, useState } from 'react'

import { AccountAvatar } from './AccountAvatar'
import { useForm } from '@/hooks/useForm'
import { isValidAddress, onlyAddress } from '@/utils/blockchain'
import { useStyleAutocomplete } from './useStyleAutocomplete'

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
  const [inputValue, setInputValue] = useState(value ?? '')
  const [recentAddresses, setRecentAddresses] = useState<string[]>([])
  const optionsAddress = useMemo(() => options.map(e => e.address), [options])
  const combinedOptions = useMemo(
    () => combineOptions(recentAddresses, options),
    [recentAddresses, options]
  )
  const {
    register,
    errors,
    setValue: setValueTexfield
  } = useForm<{ address: string }>({
    address: ''
  })
  const addressInput = register('address', [onlyAddress])
  const styles = useStyleAutocomplete()
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

  const handleAutoCompleteChange = useCallback(
    (event: any, newValue: string | OptionItemGroup | null) => {
      if (newValue === null) {
        onChange('')
        return
      }

      if (typeof newValue === 'string') {
        const validAddress = isValidAddress(newValue)
        validAddress && addNewAddress(newValue)
        setValueTexfield('address', newValue)
        validAddress && onChange(newValue)
      } else if ('address' in newValue) {
        const validAddress = isValidAddress(newValue.address)
        validAddress && onChange(newValue.address)
        validAddress && setValueTexfield('address', newValue.address)
      }
    },
    [addNewAddress, onChange, setValueTexfield]
  )

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

  const handlePaste = (event: React.ClipboardEvent) => {
    const pastedValue = event.clipboardData.getData('text')

    handleAutoCompleteChange(event, pastedValue)
  }

  return (
    <>
      <Autocomplete
        sx={styles}
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
          params.inputProps.onPaste = handlePaste

          return (
            <TextField
              {...params}
              {...addressInput}
              label={label}
              error={!!errors.address}
              helperText={errors.address}
            />
          )
        }}
      />
    </>
  )
}
