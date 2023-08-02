import React from 'react'
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Modal,
  Typography
} from '@mui/material'
import { Wallet } from '@/infrastructure/useink/walletTypes'

const modalStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 680,
  height: 600,
  textAlign: 'justify',
  bgcolor: 'rgba(0, 0, 0, 1)',
  border: '2px solid #000',
  borderRadius: '3.75rem',
  padding: '3rem 3rem 2.5rem 3rem',
  boxShadow: '0px 4px 50px 0px rgba(255, 255, 255, 0.1);',
  color: 'white',
  display: 'flex',
  flexDirection: 'column'
}

const listItemSx = {
  '&:hover': {
    borderRadius: '1.8rem',
    backgroundColor: 'rgba(98, 98, 98, 0.26)'
  }
}

const listSx = {
  margin: '0 auto',
  width: '16rem',
  '&:hover': {
    borderRadius: '1.8rem'
  }
}

type Props = {
  open: boolean
  handleClose: () => void
  wallets: Wallet[]
  setCurrentWallet: (wallet: Wallet) => void
}
export function ModalWallet({
  open,
  handleClose,
  wallets,
  setCurrentWallet
}: Props) {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Typography
          style={{ textAlign: 'center' }}
          id="modal-modal-title"
          variant="h3"
          component="h2"
        >
          Connect your wallet
        </Typography>
        <Box>
          <Typography
            style={{
              textAlign: 'center',
              fontWeight: 'normal',
              marginTop: '2rem',
              marginBottom: '1.5rem'
            }}
            variant="h6"
          >
            Installed Wallets
          </Typography>
          <List disablePadding sx={listSx}>
            {wallets
              .filter(wallet => wallet.installed)
              .map(w => (
                <ListItem key={w.title}>
                  <>
                    <ListItemButton
                      sx={listItemSx}
                      onClick={() => {
                        setCurrentWallet(w)
                        handleClose()
                      }}
                    >
                      <ListItemIcon>
                        <Avatar src={w.logo.src} alt={w.logo.alt} />
                      </ListItemIcon>
                      <ListItemText primary={`${w.title}`} />
                    </ListItemButton>
                  </>
                </ListItem>
              ))}
          </List>
        </Box>
        <Box>
          <Divider style={{ margin: '2rem' }} variant="middle" />
          <List disablePadding sx={listSx}>
            {wallets
              .filter(wallet => !wallet.installed)
              .map(w => (
                <ListItem key={w.title}>
                  <>
                    <ListItemButton
                      sx={listItemSx}
                      onClick={() => {
                        setCurrentWallet(w)
                        handleClose()
                      }}
                    >
                      <ListItemIcon>
                        <Avatar src={w.logo.src} alt={w.logo.alt} />
                      </ListItemIcon>
                      <ListItemText primary={`Install ${w.title}`} />
                    </ListItemButton>
                  </>
                </ListItem>
              ))}
          </List>
        </Box>
      </Box>
    </Modal>
  )
}
