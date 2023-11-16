import { InputLabel, MenuItem, SelectChangeEvent } from '@mui/material'
import { StyledSelect } from '../AddressAccountSelect/styled'

interface BooleanSelectProps {
  label: string
  value: boolean
  onChange: (value: boolean) => void
}

export function ArgBooleanSelect({
  value,
  onChange,
  label
}: BooleanSelectProps) {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value === 'true')
  }

  const stringValue = value ? 'true' : 'false'

  return (
    <>
      <InputLabel>{label}</InputLabel>
      <StyledSelect
        sx={{ color: 'white' }}
        value={stringValue}
        onChange={handleChange}
        label={label}
      >
        <MenuItem sx={{ color: 'white' }} value="true">
          True
        </MenuItem>
        <MenuItem sx={{ color: 'white' }} value="false">
          False
        </MenuItem>
      </StyledSelect>
    </>
  )
}
