import { useState } from 'react'
import { styled } from '@mui/material/styles'
import WarningIcon from '@mui/icons-material/Warning'

import { useNetworkAccountsContext } from 'src/context/NetworkAccountsContext'
import { StyledButton, MyButtonProps } from '../Button'
import { AccountSelect } from './AccountsSelect'
import { ModalWallet } from '../ModalWallet'
import { Box } from '@mui/material'
import CircleIcon from '@mui/icons-material/Circle'
import { WALLET_IMG_DETAILS } from '@/constants/wallets'

export const ButtonConnection = styled(StyledButton)<MyButtonProps>(() => ({
  fontSize: '1rem',
  height: '2.5rem',
  borderRadius: '1.5rem',
  margin: '0.5rem 0',
  backgroundColor: '#FF7900',
  color: '#FFFF',
  border: '0px',
  padding: '1.3rem',
  textTransform: 'none'
}))

export const WalletConnectButton = () => {
  const {
    state: { accountStatus, currentAccount, walletKey, allWallets, accounts },
    setCurrentAccount,
    setCurrentWallet
  } = useNetworkAccountsContext()

  const [openModal, setOpenModal] = useState(false)
  const noAccounts = accountStatus === 'CONNECTED' && accounts?.length === 0

  return (
    <>
      {accountStatus === 'DISCONNECTED' ? (
        <ButtonConnection size="small" onClick={() => setOpenModal(true)}>
          Connect your wallet{' '}
          <CircleIcon
            style={{
              marginLeft: '15px',
              fontSize: '0.9rem',
              color: `rgba(255, 255, 255, 0.62)`
            }}
          />
        </ButtonConnection>
      ) : (
        currentAccount && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'right'
            }}
          >
            {walletKey && (
              <AccountSelect
                walletLogo={WALLET_IMG_DETAILS[walletKey]}
                currentAccount={currentAccount as string}
                accounts={accounts}
                onChange={setCurrentAccount}
              />
            )}
          </Box>
        )
      )}

      {noAccounts && (
        <ButtonConnection
          variant="outlined"
          startIcon={<WarningIcon />}
          onClick={() => setOpenModal(true)}
        >
          No accounts
        </ButtonConnection>
      )}

      {allWallets && (
        <ModalWallet
          open={openModal}
          handleClose={() => setOpenModal(!openModal)}
          wallets={allWallets}
          setCurrentWallet={setCurrentWallet}
        />
      )}
    </>
  )
}
