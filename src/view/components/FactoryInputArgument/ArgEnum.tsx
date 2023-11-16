import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { useCallback, useState } from 'react'

import { useNetworkAccountsContext } from '@/context/NetworkAccountsContext'
import { ArgumentComponentProps } from '@/domain/common/substrateInputTypes'
import { OrFalsy } from '@/domain/common/utilityTsTypes'
import { getInitValue } from '@/services/substrate/getInitValue'
import { TypeDef } from '@/services/substrate/types'
import { isNumber } from '@/utils/dataTypeGuard'

import { ArgumentSignature } from './FunctionSignatureName'
import { StyledSelect } from '../AddressAccountSelect/styled'

interface Props extends ArgumentComponentProps<Record<string, unknown>> {
  components: React.ComponentType<ArgumentComponentProps<unknown>>[]
}

export function ArgEnum({
  components,
  typeDef,
  registry,
  onChange: _onChange,
  nestingNumber,
  value,
  label
}: Props) {
  const variants = typeDef.sub as TypeDef[]
  const {
    state: { accounts }
  } = useNetworkAccountsContext()
  const [variantIndex, _setVariantIndex] = useState<number>(0)

  const Component = components[variantIndex]

  const onChange = useCallback(
    (value: unknown): void => {
      _onChange({ [variants[variantIndex].name as string]: value })
    },
    [_onChange, variantIndex, variants]
  )

  const setVariantIndex = useCallback(
    (value: OrFalsy<number>) => {
      if (isNumber(value)) {
        _setVariantIndex(value)

        _onChange({
          [variants[value].name as string]: getInitValue(
            registry,
            accounts || [],
            variants[value]
          )
        })
      }
    },
    [registry, accounts, _onChange, variants]
  )

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        width: '100%'
      }}
    >
      <FormControl sx={{ minWidth: '10rem' }}>
        <InputLabel id="enum-select-label">
          <ArgumentSignature
            abiParam={{ type: variants[variantIndex] }}
            registry={registry}
          />
        </InputLabel>
        <StyledSelect
          sx={{ color: 'white' }}
          labelId="enum-select-label"
          value={variantIndex}
          onChange={event => setVariantIndex(event.target.value as number)}
          label={
            <ArgumentSignature
              abiParam={{ type: variants[variantIndex] }}
              registry={registry}
            />
          }
        >
          {variants.map(({ name }, index) => (
            <MenuItem sx={{ color: 'white' }} key={index} value={index}>
              {name}
            </MenuItem>
          ))}
        </StyledSelect>
      </FormControl>
      {variants[variantIndex].type !== 'Null' && (
        <FormControl sx={{ marginLeft: 2 }} fullWidth>
          <Component
            nestingNumber={nestingNumber + 1}
            onChange={onChange}
            registry={registry}
            typeDef={variants[variantIndex]}
            label={label}
            value={
              !!value && typeof value === 'object'
                ? Object.values(value)[0]
                : {}
            }
          />
        </FormControl>
      )}
    </Box>
  )
}
