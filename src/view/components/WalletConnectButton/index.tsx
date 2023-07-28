import { useState } from 'react'
import { styled } from '@mui/material/styles'
import WarningIcon from '@mui/icons-material/Warning'

import { useNetworkAccountsContext } from 'src/context/NetworkAccountsContext'
import { StyledButton, MyButtonProps } from '../Button'
import { WalletConnectionEvents } from 'src/domain/DomainEvents'
import { AccountSelect } from './AccountsSelect'
import { useOnceWhen } from 'src/hooks/useOnceWhen'
import { ModalWallet } from '../ModalWallet'
import { Box } from '@mui/material'
import { NetworkSelect } from './NetworkSelect'

export const ButtonConnection = styled(StyledButton)<MyButtonProps>(() => ({
  fontSize: '1rem',
  height: '2.5rem',
  borderRadius: '0.5rem',
  margin: '0.5rem 0'
}))

export const WalletConnectButton = () => {
  const {
    state: {
      accountStatus,
      currentAccount,
      allWallets,
      currentWallet,
      currentChain
    },
    setCurrentAccount,
    setCurrentWallet,
    setCurrentChain
  } = useNetworkAccountsContext()

  const isLoading =
    accountStatus === 'CONNECTING' || (currentWallet as unknown as boolean)
  const [openModal, setOpenModal] = useState(false)
  const noAccounts = accountStatus === 'CONNECTED' && !currentAccount

  useOnceWhen({
    condition: noAccounts,
    callback: () => setOpenModal(true)
  })

  const dispatchConnect = () => {
    document.dispatchEvent(
      // new CustomEvent(WalletConnectionEvents.walletConnectInit)
      new CustomEvent(WalletConnectionEvents.listAllWallets)
    )
  }

  return (
    <>
      {accountStatus === 'DISCONNECTED' || accountStatus === 'CONNECTING' ? (
        <ButtonConnection
          loading={isLoading}
          size="small"
          onClick={() => {
            dispatchConnect()
            setOpenModal(true)
          }}
        >
          Connect
        </ButtonConnection>
      ) : (
        currentAccount && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'right'
            }}
          >
            <NetworkSelect
              currentChain={currentChain}
              onChange={setCurrentChain}
            />
            <AccountSelect
              currentAccount={currentAccount}
              accounts={currentWallet?.accounts}
              onChange={setCurrentAccount}
            />
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
