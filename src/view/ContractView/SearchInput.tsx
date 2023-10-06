import * as React from 'react'
import Box from '@mui/material/Box'
import InputAdornment from '@mui/material/InputAdornment'
import { StyledTextField } from '@/components'
import { Search } from '@mui/icons-material'
import { MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { TITLE_MAP_TOKEN } from '@/constants/titleTokenType'

type Props = {
  types: string[]
  handleChange: () => void
}

export default function SearchInput({ handleChange }: Props) {
  const [contractType, setContractType] = React.useState('')

  const searchType = [
    { name: 'TYPE', value: '' },
    ...Object.entries(TITLE_MAP_TOKEN).map(element => ({
      name: element[1].title,
      value: element[0]
    }))
  ]

  const handleSelect = (event: SelectChangeEvent) => {
    setContractType(event.target.value)
  }

  return (
    <Box
      sx={{
        '& > :not(style)': { m: 1, color: 'white' }
      }}
    >
      <StyledTextField
        id="input-search-table"
        sx={{ color: 'white', width: '441px' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          )
        }}
        placeholder="Search"
        variant="outlined"
      />

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
