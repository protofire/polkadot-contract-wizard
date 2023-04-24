import {
  MenuItem,
  MenuItemProps,
  Select,
  SelectProps,
  SelectChangeEvent,
  Stack,
  styled
} from '@mui/material'
import { shortNameLonger, truncateAddress } from '@/utils/formatString'
import { KeyringAccount } from 'src/domain/KeyringAccouns'
import { AvatarAccount } from './AvatarAccount'

const StyledSelect = styled(Select)<SelectProps>(() => ({
  color: 'white',
  display: 'flex',
  margin: '0.5rem 0',
  padding: '0',
  height: '2.88em',
  borderRadius: '0.5rem',

  '& fieldset': {
    top: '0'
  },

  '& span': {
    fontSize: '0.8rem',
    marginLeft: '1rem'
  },

  '& p': {
    fontSize: '0.8rem',
    marginLeft: '1rem',
    fontWeight: '600',
    lineHeight: '12px'
  },

  '& legend': {
    display: 'none'
  }
}))

const StyledMenuItem = styled(MenuItem)<MenuItemProps>(() => ({
  color: 'white',

  '& span': {
    fontSize: '0.8rem',
    marginLeft: '1rem'
  },

  '& p': {
    fontSize: '0.8rem',
    marginLeft: '1rem',
    fontWeight: '600',
    lineHeight: '12px'
  }
}))

export function AccountSelect({
  accounts,
  currentAccount,
  onChange
}: {
  accounts: KeyringAccount[]
  currentAccount: string
  onChange: (account: string) => void
}) {
  const _handleChange = (event: SelectChangeEvent<unknown>) => {
    onChange(event.target.value as string)
  }

  return (
    <StyledSelect
      value={currentAccount}
      placeholder="Select Account..."
      onChange={_handleChange}
    >
      {accounts.map(a => (
        <StyledMenuItem
          sx={{ color: 'white' }}
          selected={currentAccount === a.address}
          key={a.address}
          value={a.address}
        >
          <Stack sx={{ display: 'flex', flexDirection: 'row' }}>
            <AvatarAccount address={a.address} />
            <Stack>
              <span>{shortNameLonger(a.label)}</span>
              <p>{truncateAddress(a.address)}</p>
            </Stack>
          </Stack>
        </StyledMenuItem>
      ))}
    </StyledSelect>
  )
}
