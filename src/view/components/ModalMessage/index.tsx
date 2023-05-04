import React from 'react'
import { Box, Modal, Stack, Typography, Link as MuiLink } from '@mui/material'
import WarningIcon from '@mui/icons-material/Warning'
import NextLink from 'next/link'

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
}
export function ModalMessage({ open, handleClose }: Props) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Stack
          direction="row"
          sx={{
            gap: '1rem',
            display: 'flex'
          }}
        >
          <WarningIcon
            color="primary"
            sx={{ alignContent: 'center', alignSelf: 'center' }}
            fontSize="large"
          />
          <Typography id="modal-modal-title">
            No wallet extension has been found to manage Substrate accounts.
          </Typography>
        </Stack>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          If you have already installed the extension but still see this
          message, make sure you have authorized the Polkadot contract wizard
          UI.
        </Typography>
        <Typography id="modal-modal-description2" sx={{ mt: 2 }}>
          Otherwise, install one of the extensions to manage your Substrate
          accounts such as:
        </Typography>
        <MuiLink
          sx={{
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '0.5rem'
          }}
          href="https://polkadot.js.org/extension/"
          component={NextLink}
        >
          Polkadot.js
        </MuiLink>
      </Box>
    </Modal>
  )
}
