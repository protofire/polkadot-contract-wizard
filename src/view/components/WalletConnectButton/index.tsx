import { useState } from 'react'
import { styled } from '@mui/material/styles'
import WarningIcon from '@mui/icons-material/Warning'

import { useNetworkAccountsContext } from 'src/context/NetworkAccountsContext'
import { StyledButton, MyButtonProps } from '../Button'
import { AccountSelect } from './AccountSelect'
import { ModalWallet } from '../ModalWallet'
import { Box } from '@mui/material'
import { NetworkSelect } from './NetworkSelect'
import CircleIcon from '@mui/icons-material/Circle'
import { WALLET_IMG_DETAILS } from '@/constants/wallets'
import { useRecentlyClicked } from '@/hooks/useRecentlyClicked'
import { useDelay } from '@/hooks/useDelay'

export const ButtonConnection = styled(StyledButton)<MyButtonProps>(() => ({
  fontSize: '1rem',
  height: '2.5rem',
  borderRadius: '1.5rem',
  margin: '0.5rem 0',
  padding: '1.3rem',
  textTransform: 'none'
}))

export const WalletConnectButton = () => {
  const {
    state: { accountStatus, walletKey, allWallets, accounts },
    isConnected,
    disconnectWallet,
    accountConnected,
    networkConnected,
    setCurrentAccount,
    setCurrentWallet,
    setCurrentChain
  } = useNetworkAccountsContext()
  const isDelayFinished = useDelay()
  const [openModal, setOpenModal] = useState(false)
  const noAccounts = accountStatus === 'CONNECTED' && accounts?.length === 0
  const { ref: buttonRef, recentlyClicked } = useRecentlyClicked()
  const isLoading = recentlyClicked || !isDelayFinished
  // console.log('__isConnected', isConnected, accountConnected)

  return (
    <>
      {!isConnected || isLoading ? (
        <ButtonConnection
          ref={buttonRef}
          size="small"
          loading={isLoading}
          onClick={() => setOpenModal(true)}
        >
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
        accountConnected && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'right'
            }}
          >
            {accountConnected && networkConnected && (
              <NetworkSelect
                currentChain={networkConnected}
                onChange={setCurrentChain}
              />
            )}
            <AccountSelect
              accountConnected={accountConnected}
              accounts={accounts}
              setAccount={setCurrentAccount}
              disconnectWallet={disconnectWallet}
            />
            )
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
