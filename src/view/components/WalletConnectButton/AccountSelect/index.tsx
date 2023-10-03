import { SelectChangeEvent, Stack, Avatar } from '@mui/material'
import { shortNameLonger, truncateAddress } from '@/utils/formatString'
import CircleIcon from '@mui/icons-material/Circle'
import PowerSettingsNewRoundedIcon from '@mui/icons-material/PowerSettingsNewRounded'
import { OPTION_FOR_DISCONNECTING } from '@/context/NetworkAccountsContext'
import {
  WalletAccount,
  WalletLogoProps
} from '@/infrastructure/useink/walletTypes'
import { StyledMenuItem, StyledSelect } from './styled'

interface AccountSelectProps {
  accounts: WalletAccount[] | undefined
  accountConnected: WalletAccount | undefined
  setAccount: (account: WalletAccount) => void
  disconnectWallet: () => void
}

// {/* <AvatarAccount address={a.address} /> */}
export function AccountSelect({
  accounts,
  accountConnected,
  setAccount,
  disconnectWallet
}: AccountSelectProps) {
  const _handleChange = (event: SelectChangeEvent<unknown>) => {
    const address = event.target.value as string

    if (address === OPTION_FOR_DISCONNECTING) {
      disconnectWallet()
      return
    }
    const newAccount = accounts?.find(element => element.address === address)
    if (!newAccount) {
      console.error(
        `Theres not an account with this address ${event.target.value}`
      )
      return
    }
    setAccount(newAccount)
  }

  const currentAccount = accountConnected?.address

  if (!accounts)
    return (
      <StyledSelect
        value={'Select Account...'}
        placeholder="Select Account..."
      ></StyledSelect>
    )

  if (!currentAccount)
    return (
      <StyledSelect
        value={'No Account'}
        placeholder="No account"
      ></StyledSelect>
    )

  const allAccounts = [
    ...accounts,
    { name: OPTION_FOR_DISCONNECTING, address: OPTION_FOR_DISCONNECTING }
  ]

  return (
    <StyledSelect
      value={accountConnected.address}
      placeholder="Select Account..."
      onChange={_handleChange}
    >
      {allAccounts.map(a => (
        <StyledMenuItem
          key={a.address}
          selected={accountConnected.address === a.address}
          value={a.address}
        >
          {a.name !== OPTION_FOR_DISCONNECTING && (
            <Stack sx={{ display: 'flex', flexDirection: 'row' }}>
              <Avatar
                sx={{ height: '30px', width: '30px', marginTop: '3px' }}
                src={accountConnected.wallet?.logo.src}
                alt={accountConnected.wallet?.logo.alt}
              />
              <Stack>
                <span>{shortNameLonger(a.name as string)}</span>
                <p>{truncateAddress(a.address)}</p>
              </Stack>
              {accountConnected.address === a.address && (
                <CircleIcon
                  style={{
                    marginLeft: '16px',
                    marginTop: '10px',
                    fontSize: '0.9rem',
                    color: `#20E24B`
                  }}
                />
              )}
            </Stack>
          )}

          {a.name === OPTION_FOR_DISCONNECTING && (
            <>
              <PowerSettingsNewRoundedIcon sx={{ fontSize: '1.4rem' }} />
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
                    Disconnect Wallet
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
