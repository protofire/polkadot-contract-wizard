import React from 'react'
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Modal
} from '@mui/material'
import { Wallet } from '@/types'

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  textAlign: 'justify',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  padding: '3rem 3rem 2.5rem 3rem',
  borderRadius: '0.5rem',
  color: 'white'
}

type Props = {
  open: boolean
  handleClose: () => void
  wallets: Wallet[]
  setCurrentWallet: (walletName: string) => void
}
export function ModalWallet({
  open,
  handleClose,
  wallets,
  setCurrentWallet
}: Props) {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <List>
          {wallets &&
            wallets.map(w => (
              <ListItem disablePadding key={w.title}>
                {w.installed ? (
                  <ListItemButton
                    onClick={() => {
                      setCurrentWallet(w.extensionName)
                      handleClose()
                    }}
                  >
                    <ListItemIcon>
                      <Avatar src={w.logo.src} alt={w.logo.alt} />
                    </ListItemIcon>
                    <ListItemText primary={`Connect to ${w.title}`} />
                  </ListItemButton>
                ) : (
                  <ListItemButton
                    onClick={e => {
                      e.preventDefault()
                      window.location.href = w.installUrl
                    }}
                  >
                    <ListItemIcon>
                      <Avatar src={w.logo.src} alt={w.logo.alt} />
                    </ListItemIcon>
                    <ListItemText primary={`Install ${w.title}`} />
                  </ListItemButton>
                )}
              </ListItem>
            ))}
        </List>
      </Box>
    </Modal>
  )
}
