import { MenuItem, Select, SelectChangeEvent, Stack } from '@mui/material'
import { truncateAddress } from '@/utils'
import { KeyringAccount } from 'src/domain/KeyringAccouns'
import { AvatarAccount } from './AvatarAccount'

export function AccountSelect({
  accounts,
  currentAccount,
  onChange
}: {
  accounts: KeyringAccount[]
  currentAccount: string
  onChange: (account: string) => void
}) {
  const _handleChange = (event: SelectChangeEvent<string>) => {
    onChange(event.target.value)
  }

  return (
    <Select
      sx={{ color: 'white' }}
      value={currentAccount}
      placeholder="Select Account..."
      onChange={_handleChange}
    >
      {accounts.map(a => (
        <MenuItem
          sx={{ color: 'white' }}
          selected={currentAccount === a.address}
          key={a.address}
          value={a.address}
        >
          <Stack sx={{ display: 'flex', flexDirection: 'row' }}>
            <AvatarAccount address={a.address} />
            <Stack>
              <span>{a.label}</span>
              <p>{truncateAddress(a.address)}</p>
            </Stack>
          </Stack>
        </MenuItem>
      ))}
    </Select>
  )
}
