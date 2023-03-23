import { useEffect, useRef, useState } from 'react'

import { NetworkAccountsContextState } from 'src/context/NetworkAccountsContext'
import { DomainEvents } from 'src/domain/DomainEvents'
import { StyledButton } from '../Button'
import { ModalMessage } from '@components'

type AccountState = Pick<
  NetworkAccountsContextState,
  'apiStatus' | 'accountStatus'
>

async function loadCustomHook() {
  const customHook = (await import('src/context/NetworkAccountsContext'))
    .useNetworkAccountsContext

  return customHook
}

export const WalletConnectButton = () => {
  const useNetworkState = useRef<() => NetworkAccountsContextState>()
  const { apiStatus, accountStatus } =
    useNetworkState.current !== undefined
      ? useNetworkState.current()
      : {
          apiStatus: 'DISCONNECTED',
          accountStatus: 'DISCONNECTED'
        }
  const isLoading = apiStatus === 'CONNECTING' || accountStatus === 'CONNECTING'
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    loadCustomHook().then(hook => {
      useNetworkState.current = hook
    })
  }, [])

  const dispatchConnect = () => {
    if (apiStatus !== 'CONNECTED') {
      setOpenModal(true)
      return
    }
    document.dispatchEvent(new CustomEvent(DomainEvents.walletConnectInit))
  }

  return (
    <>
      <StyledButton loading={isLoading} size="small" onClick={dispatchConnect}>
        Connect
      </StyledButton>
      <ModalMessage
        open={openModal}
        handleClose={() => setOpenModal(false)}
        title="There is not Extensions available to connect to Polkadot network"
        body="There is not polkadot wallet installed or it is possible that you
      rejected the wallet connection (Please open the wallet and delete the
      rejected action)."
      />
    </>
  )
}
