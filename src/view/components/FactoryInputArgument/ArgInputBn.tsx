import { TextField } from '@mui/material'
import BN from 'bn.js'
import { useCallback, useState } from 'react'

import { ArgumentComponentProps } from '@/domain/common/substrateInputTypes'
import { getMinMax } from '@/services/substrate/utils'

type Props = ArgumentComponentProps<BN>

export function InputBn({
  onChange,
  typeDef: { type },
  label
}: Props): JSX.Element {
  const [displayValue, setDisplayValue] = useState('0')
  const [min, max] = getMinMax(type)

  const handleChange = useCallback(
    ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
      if (value.trim()) {
        const val = Number(value)
        if (!Number.isNaN(val) && min <= val && val <= max) {
          const bn = new BN(value)
          setDisplayValue(value)
          onChange(bn)
        }
      }
    },
    [max, min, onChange]
  )

  return (
    <TextField
      onChange={handleChange}
      placeholder="Input a number"
      value={displayValue}
      type="number"
      variant="outlined"
      label={label}
    />
  )
}
