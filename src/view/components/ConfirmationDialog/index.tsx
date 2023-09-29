import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material'

interface ConfirmationDialogProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
}

function ConfirmationDialog({
  open,
  onClose,
  onConfirm
}: ConfirmationDialogProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirmar Acción</DialogTitle>
      <DialogContent>
        <p>Be sure you want to perform this action?</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={onConfirm}>Confirmar</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmationDialog
