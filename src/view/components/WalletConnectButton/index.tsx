import dynamic from 'next/dynamic'
import { useState } from 'react'
import { DomainEvents } from 'src/domain/DomainEvents'
import { StyledButton } from '../Button'

const Extensions = dynamic(() => import('./Extensions'), {
  ssr: false
})

export const WalletConnectButton = () => {
  const [showExtensions, setShowExtensions] = useState(false)

  const dispatchConnect = () =>
    document.dispatchEvent(new CustomEvent(DomainEvents.walletConnectInit))

  return (
    <>
      {!showExtensions ? (
        <StyledButton size="small" onClick={dispatchConnect}>
          Connect
        </StyledButton>
      ) : (
        <Extensions />
      )}
    </>
  )
}
