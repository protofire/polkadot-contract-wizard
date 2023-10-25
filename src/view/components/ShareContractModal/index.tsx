import React from 'react'
import { Box, Button, IconButton, Modal, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { ModalStyled, ModalTypography } from './styled'
import { useCopyToClipboard } from '@/hooks'

type Props = {
  open: boolean
  url: string
  handleClose: () => void
}
export function ShareContractModal({ open, handleClose, url }: Props) {
  const [recentlyCopied, copyToClipboard] = useCopyToClipboard()

  return (
    <Modal open={open} onClose={handleClose}>
      <ModalStyled>
        <ModalTypography id="modal-modal-title" variant="h3">
          Share contract
        </ModalTypography>

        <Typography variant="body1">
          You can share this link to another users to let them interact with the
          contract directly.
        </Typography>

        <Box mt={1}>
          <Typography>
            ⚠️{' '}
            <span style={{ fontStyle: 'italic' }}>
              Remember the interaction depends on the contract permissions.
            </span>
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            border: '1px solid #525252',
            borderRadius: '10px',
            marginTop: '2rem',
            padding: '1rem'
          }}
        >
          <Box
            sx={{
              overflowY: 'hidden',
              overflowX: 'hidden',
              minHeight: '56px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Typography
              variant="caption"
              sx={{ color: '#EBEBEB', marginLeft: '0.5rem', width: '100%' }}
            >
              {url}
            </Typography>
          </Box>
          <Button
            size="large"
            variant="contained"
            sx={{ borderRadius: '20px', maxHeight: '3rem' }}
            onClick={() => copyToClipboard(url)}
          >
            Copy
          </Button>
        </Box>

        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
        <Box></Box>
      </ModalStyled>
    </Modal>
  )
}
