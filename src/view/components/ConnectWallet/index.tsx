import { useState } from 'react'
import { useWallet, useAllWallets } from 'useink'
import { ModalWallet } from '../ModalWallets'
import { Typography } from '@mui/material'

export const ConnectWallet = ({}) => {
  const { account, connect, disconnect } = useWallet()
  const wallets = useAllWallets()
  const [openModal, setOpenModal] = useState(false)

  if (!account) {
    return (
      <>
        <button onClick={() => setOpenModal(true)}> Connect Wallet </button>
        <ModalWallet
          open={openModal}
          handleClose={() => setOpenModal(!openModal)}
          wallets={wallets}
          connect={connect}
        />
      </>
    )
  }

  return (
    <>
      <Typography variant="h5" align="center">
        You are connected as {account?.name || account.address}
      </Typography>

      <button onClick={disconnect}>Disonnect Wallet</button>
    </>
  )
}
