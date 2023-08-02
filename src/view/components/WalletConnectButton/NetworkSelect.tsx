import {
  MenuItem,
  MenuItemProps,
  Select,
  SelectProps,
  SelectChangeEvent,
  Stack,
  styled
} from '@mui/material'
import { CHAINS_ALLOWED } from '@/constants/chain'

const StyledSelect = styled(Select)<SelectProps>(() => ({
  color: 'white',
  padding: '0',
  margin: '0.5rem 0.5rem',
  borderRadius: '0.5rem',
  height: '2.88em',
  display: 'flex',

  '& fieldset': {
    top: '0'
  },

  '& p': {
    marginLeft: '0.5rem'
  },

  '& legend': {
    display: 'none'
  }
}))

const StyledMenuItem = styled(MenuItem)<MenuItemProps>(() => ({
  color: 'white',
  '& p': {
    marginLeft: '1rem',
    fontWeight: '600'
  }
}))

export function NetworkSelect({
  currentNetwork,
  onChange
}: {
  currentNetwork: string
  onChange: (account: string) => void
}) {
  const _handleChangeNetwork = (event: SelectChangeEvent<unknown>) => {
    onChange(event.target.value as string)
  }
  return (
    <>
      <StyledSelect
        placeholder="Select Network..."
        value={currentNetwork}
        onChange={_handleChangeNetwork}
      >
        {CHAINS_ALLOWED.map(option => (
          <StyledMenuItem
            sx={{ color: 'white' }}
            selected={currentNetwork === option.name}
            key={option.id}
            value={option.name}
          >
            <Stack sx={{ display: 'flex', flexDirection: 'row' }}>
              {/* <AvatarAccount address={option.name} /> */}
              <Stack>
                <p>{option.name}</p>
              </Stack>
            </Stack>
          </StyledMenuItem>
        ))}
      </StyledSelect>
    </>
  )
}
