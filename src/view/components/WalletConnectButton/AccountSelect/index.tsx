import { SelectChangeEvent, Stack, Avatar } from '@mui/material'
import { shortNameLonger, truncateAddress } from '@/utils/formatString'
import CircleIcon from '@mui/icons-material/Circle'
import PowerOffIcon from '@mui/icons-material/PowerOff'
import { OPTION_FOR_DISCONNECTING } from '@/context/NetworkAccountsContext'
import {
  WalletAccount,
  WalletLogoProps
} from '@/infrastructure/useink/walletTypes'
import { StyledMenuItem, StyledSelect } from './styled'

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
  if (!accounts)
    return (
      <StyledSelect
        value={'Select Account...'}
        placeholder="Select Account..."
      ></StyledSelect>
    )
  const allAccounts = [
    ...accounts,
    { name: OPTION_FOR_DISCONNECTING, address: OPTION_FOR_DISCONNECTING }
  ]

  return (
    <StyledSelect
      value={currentAccount}
      placeholder="Select Account..."
      onChange={_handleChange}
    >
      {allAccounts.map(a => (
        <StyledMenuItem
          sx={{
            color: 'white'
          }}
          selected={currentAccount === a.address}
          key={a.address}
          value={a.address}
        >
          {a.name !== OPTION_FOR_DISCONNECTING && (
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
          )}

          {a.name === OPTION_FOR_DISCONNECTING && (
            <>
              <PowerOffIcon sx={{ fontSize: '2rem' }} />
              <Stack
                sx={{
                  height: '20px',
                  justifyContent: 'center',
                  margin: '10px 13px'
                }}
              >
                <Stack>
                  <p
                    style={{
                      marginLeft: '0px',
                      height: '10px',
                      fontSize: '1rem'
                    }}
                  >
                    Disconect Wallet
                  </p>
                </Stack>
              </Stack>
            </>
          )}
        </StyledMenuItem>
      ))}
    </StyledSelect>
  )
}
