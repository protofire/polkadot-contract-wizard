import { Search } from '@mui/icons-material'
import { InputAdornment, TextField } from '@mui/material'

export const SearchInput = () => (
  <TextField
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
  />
)
