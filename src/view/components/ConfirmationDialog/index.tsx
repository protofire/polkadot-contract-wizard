import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box
} from '@mui/material'

const style = {
  backgroundColor: 'background.paper'
}

interface ConfirmationDialogProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  message?: string
  title?: string
}

const TITLE_CONFIRM = 'Confirm to continue'
const TEXT_CONFIRM = 'Are you sure you want to continue?'

function ConfirmationDialog({
  open,
  onClose,
  onConfirm,
  message = TEXT_CONFIRM,
  title = TITLE_CONFIRM
}: ConfirmationDialogProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <Box sx={style}>
        <DialogTitle>
          <Typography variant="h5" color="white">
            {title}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" color="white">
            {message}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={onConfirm}>Confirm</Button>
        </DialogActions>
      </Box>
    </Dialog>
  )
}

export default ConfirmationDialog
