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
import { shortNameLonger, truncateAddress } from '@/utils/formatString'
import { WalletAccount, WalletLogoProps } from 'src/types/wallet'
import CircleIcon from '@mui/icons-material/Circle'

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
  walletLogo,
  accounts,
  currentAccount,
  onChange
}: {
  walletLogo: WalletLogoProps | undefined
  accounts: WalletAccount[] | undefined
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
      {accounts?.map(a => (
        <StyledMenuItem
          sx={{ color: 'white' }}
          selected={currentAccount === a.address}
          key={a.address}
          value={a.address}
        >
          <Stack sx={{ display: 'flex', flexDirection: 'row' }}>
            {/* <AvatarAccount address={a.address} /> */}

            {walletLogo && (
              <Avatar
                sx={{ height: '30px', width: '30px', marginTop: '3px' }}
                src={walletLogo.src}
                alt={walletLogo.alt}
              />
            )}

            <Stack>
              <span>{shortNameLonger(a.name as string)}</span>
              <p>{truncateAddress(a.address)}</p>
            </Stack>
            <CircleIcon
              style={{
                marginLeft: '15px',
                marginTop: '10px',
                fontSize: '0.9rem',
                color: `#20E24B`
              }}
            />
          </Stack>
        </StyledMenuItem>
      ))}
    </StyledSelect>
  )
}
