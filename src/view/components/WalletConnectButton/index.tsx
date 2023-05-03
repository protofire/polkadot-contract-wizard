import { useState } from 'react'
import { styled } from '@mui/material/styles'
import WarningIcon from '@mui/icons-material/Warning'

import { useNetworkAccountsContext } from 'src/context/NetworkAccountsContext'
import { StyledButton, MyButtonProps } from '../Button'
import { WalletConnectionEvents } from 'src/domain/DomainEvents'
import { ModalMessage } from '@/components'
import { AccountSelect } from './AccountsSelect'
import { accountsInPossession } from 'src/domain/KeyringAccouns'
import { useOnceWhen } from 'src/hooks/useOnceWhen'

export const ButtonConnection = styled(StyledButton)<MyButtonProps>(() => ({
  fontSize: '1rem',
  height: '2.5rem',
  borderRadius: '0.5rem',
  margin: '0.5rem 0'
}))

export const WalletConnectButton = () => {
  const {
    state: { apiStatus, accountStatus, currentAccount, keyring },
    setCurrentAccount
  } = useNetworkAccountsContext()
  const isLoading = apiStatus === 'CONNECTING' || accountStatus === 'CONNECTING'
  const [openModal, setOpenModal] = useState(false)
  const noAccounts =
    apiStatus === 'CONNECTED' &&
    accountStatus === 'CONNECTED' &&
    !currentAccount
  useOnceWhen({
    condition: noAccounts,
    callback: () => setOpenModal(true)
  })

  const dispatchConnect = () => {
    document.dispatchEvent(
      new CustomEvent(WalletConnectionEvents.walletConnectInit)
    )
  }

  return (
    <>
      {accountStatus === 'DISCONNECTED' || accountStatus === 'CONNECTING' ? (
        <ButtonConnection
          loading={isLoading}
          size="small"
          onClick={dispatchConnect}
        >
          Connect
        </ButtonConnection>
      ) : (
        keyring &&
        currentAccount && (
          <AccountSelect
            currentAccount={currentAccount}
            accounts={accountsInPossession(keyring)}
            onChange={setCurrentAccount}
          />
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
      <ModalMessage
        open={openModal}
        handleClose={() => setOpenModal(!openModal)}
      />
    </>
  )
}
