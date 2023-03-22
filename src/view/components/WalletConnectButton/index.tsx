import dynamic from 'next/dynamic'
import { useState } from 'react'
// import { web3Enable } from '@polkadot/extension-dapp'
import { StyledButton } from '../Button'

const Extensions = dynamic(() => import('./Extensions'), {
  ssr: false
})

export const WalletConnectButton = () => {
  const [showExtensions, setShowExtensions] = useState(false)

  return (
    <>
      {!showExtensions ? (
        <StyledButton onClick={() => setShowExtensions(true)}>
          Connect
        </StyledButton>
      ) : (
        <Extensions />
      )}
    </>
  )
}
