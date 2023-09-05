import {
  MenuItem,
  MenuItemProps,
  Select,
  SelectProps,
  SelectChangeEvent,
  Stack,
  styled,
  Avatar
} from '@mui/material'
import { ALL_CHAINS_OBJ } from '@/constants/chains'
import { ChainExtended } from 'src/types/chain'
import { CHAINS_ALLOWED } from '@/constants/chains'

const StyledSelect = styled(Select)<SelectProps>(() => ({
  color: 'white',
  padding: '0',
  margin: '0.5rem 0.5rem',
  borderRadius: '0.5rem',
  width: '202px',
  height: '2.88em',
  display: 'flex',

  '& fieldset': {
    top: '0'
  },

  '& p': {
    marginLeft: '0.5rem',
    paddingTop: '0.5rem'
  },

  '& legend': {
    display: 'none'
  },

  '& img': {
    width: 'auto',
    height: 'auto'
  }
}))

const StyledMenuItem = styled(MenuItem)<MenuItemProps>(() => ({
  color: 'white',
  '& p': {
    marginLeft: '1rem',
    paddingTop: '0.5rem'
  },
  '& img': {
    width: 'auto',
    height: 'auto',
    fontWeight: '600'
  }
}))

export function NetworkSelect({
  currentChain,
  onChange
}: {
  currentChain: ChainExtended
  onChange: (chain: ChainExtended) => void
}) {
  const _handleChangeChain = (event: SelectChangeEvent<unknown>) => {
    const chainId = event.target.value as string
    const chain = ALL_CHAINS_OBJ[chainId]
    onChange(chain)
  }

  return (
    <>
      <StyledSelect
        placeholder="Select Network..."
        value={currentChain.id}
        onChange={_handleChangeChain}
      >
        {Object.values(ALL_CHAINS_OBJ).map(option => (
          <StyledMenuItem
            sx={{ color: 'white' }}
            selected={currentChain.name === option.name}
            key={option.id}
            value={option.id}
          >
            <Stack sx={{ display: 'flex', flexDirection: 'row' }}>
              <Avatar src={option.logo.src} alt={option.logo.alt} />{' '}
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
