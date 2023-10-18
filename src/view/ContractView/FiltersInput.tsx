import React from 'react'
import Box from '@mui/material/Box'
import { MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { TITLE_MAP_TOKEN } from '@/constants/titleTokenType'
import { ContractType } from '@/domain/repositories/DeploymentRepository'

export interface FiltersInputProps {
  setFilterBy: (type: ContractType | '') => void
}

type KeyMapToken = keyof typeof TITLE_MAP_TOKEN

const searchType = [
  { name: 'ALL', value: '' },
  ...Object.entries(TITLE_MAP_TOKEN).map(element => ({
    name: element[1].title,
    value: element[0] as KeyMapToken
  }))
]
export function FiltersInput({ setFilterBy }: FiltersInputProps) {
  const [contractType, setContractType] = React.useState<KeyMapToken | ''>('')
  const handleSelect = (event: SelectChangeEvent) => {
    event.preventDefault()

    const value = event.target.value as KeyMapToken | ''
    setFilterBy(value)
    setContractType(value)
  }

  return (
    <Box
      sx={{
        '& > :not(style)': { m: 1, color: 'white' }
      }}
    >
      {/* <TextField
        id="input-search-table"
        sx={{ color: 'white', width: '300px', input: { color: 'white' } }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          )
        }}
        placeholder="Search"
        variant="outlined"
      /> */}

      <Select
        sx={{ m: 1, width: '150px' }}
        value={contractType}
        onChange={handleSelect}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
      >
        {searchType.map(element => {
          return (
            <MenuItem
              key={element.name}
              value={element.value}
              sx={{ color: 'white' }}
            >
              {element.name}
            </MenuItem>
          )
        })}
      </Select>
    </Box>
  )
}
