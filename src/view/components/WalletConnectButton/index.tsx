import { useState } from 'react'
import { KeyringPair } from '@polkadot/keyring/types'
import CopyToClipboard from 'react-copy-to-clipboard'

import { useNetworkAccountsContext } from 'src/context/NetworkAccountsContext'
import { DomainEvents } from 'src/domain/DomainEvents'
import { StyledButton } from '../Button'
import { ModalMessage } from '@components'

const acctAddr = (acct: KeyringPair | undefined) => (acct ? acct.address : '')

export const WalletConnectButton = () => {
  const {
    state: { apiStatus, accountStatus, currentAccount }
  } = useNetworkAccountsContext()
  const isLoading = apiStatus === 'CONNECTING' || accountStatus === 'CONNECTING'
  const [openModal, setOpenModal] = useState(false)

  const dispatchConnect = () => {
    document.dispatchEvent(new CustomEvent(DomainEvents.walletConnectInit))
  }

  return (
    <>
      {accountStatus === 'DISCONNECTED' || accountStatus === 'CONNECTING' ? (
        <StyledButton
          loading={isLoading}
          size="small"
          onClick={dispatchConnect}
        >
          Connect
        </StyledButton>
      ) : (
        <CopyToClipboard text={acctAddr(currentAccount)}>
          <StyledButton color={currentAccount ? 'success' : 'error'}>
            {acctAddr(currentAccount)}
          </StyledButton>
        </CopyToClipboard>
      )}

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
