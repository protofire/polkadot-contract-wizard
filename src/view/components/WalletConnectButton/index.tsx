import { useState } from 'react'
import { styled } from '@mui/material/styles'

import { useNetworkAccountsContext } from 'src/context/NetworkAccountsContext'
import { StyledButton, MyButtonProps } from '../Button'
import { WalletConnectionEvents } from 'src/domain/DomainEvents'
import { ModalMessage } from '@/components'
import { AccountSelect } from './AccountsSelect'
import { accountsInPossession } from 'src/domain/KeyringAccouns'

export const ConnectButton = styled(StyledButton)<MyButtonProps>(() => ({
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

  const dispatchConnect = () => {
    document.dispatchEvent(
      new CustomEvent(WalletConnectionEvents.walletConnectInit)
    )
  }

  return (
    <>
      {accountStatus === 'DISCONNECTED' || accountStatus === 'CONNECTING' ? (
        <ConnectButton
          loading={isLoading}
          size="small"
          onClick={dispatchConnect}
        >
          Connect
        </ConnectButton>
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

      <ModalMessage open={true} handleClose={() => setOpenModal(!openModal)} />
    </>
  )
}
