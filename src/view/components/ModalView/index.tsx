import React, { ReactNode } from 'react'
import { Button, Typography, Box, Modal, IconButton } from '@mui/material'
import { ModalStyled, ModalTypography } from './styled'
import CloseIcon from '@mui/icons-material/Close'
interface ModalViewProps {
  open: boolean
  onClose: () => void
  onFunction?: () => void
  message?: string
  title?: string
  subTitle?: string
  okBtn?: { text: string; validation: boolean }
  children: ReactNode
}

const MODAL_TITLE = 'Modal Title'
const MODAL_SUBTITLE = 'Modal Subtitle'
const OK_BTN = 'OK'

function ModalView({
  open,
  onClose,
  onFunction,
  title = MODAL_TITLE,
  subTitle = MODAL_SUBTITLE,
  okBtn = { text: OK_BTN, validation: false },
  children
}: ModalViewProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <ModalStyled>
        <ModalTypography id="modal-modal-title" variant="h3">
          {title}
        </ModalTypography>
        <Box mt={1}>
          <Typography>{subTitle}</Typography>
        </Box>
        {children}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'end',
            alignItems: 'end',
            borderRadius: '10px',
            marginTop: '2rem',
            padding: '1rem'
          }}
        >
          <Button
            size="large"
            variant="outlined"
            sx={{
              borderRadius: '20px',
              maxHeight: '3rem',
              marginRight: '2rem'
            }}
            onClick={() => onClose()}
          >
            Cancel
          </Button>
          <Button
            size="large"
            variant="contained"
            sx={{ borderRadius: '20px', maxHeight: '3rem' }}
            onClick={onFunction}
            disabled={okBtn.validation}
          >
            {okBtn.text}
          </Button>
        </Box>

        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
      </ModalStyled>
    </Modal>
  )
}

export default ModalView
