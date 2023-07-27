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
import { Chain, ChainId } from 'useink/chains'
import { chainObj } from '@/context/NetworkAccountsContext'

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
  currentChain,
  onChange
}: {
  currentChain: Chain
  onChange: (chain: Chain) => void
}) {
  const _handleChangeChain = (event: SelectChangeEvent<unknown>) => {
    const chainId = event.target.value as string
    const chain = chainObj[chainId]
    onChange(chain)
  }
  return (
    <>
      <StyledSelect
        placeholder="Select Network..."
        value={currentChain.id}
        onChange={_handleChangeChain}
      >
        {CHAINS_ALLOWED.map(option => (
          <StyledMenuItem
            sx={{ color: 'white' }}
            selected={currentChain.name === option.name}
            key={option.id}
            value={option.id}
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
