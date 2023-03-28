import { useEffect, useMemo, useState } from 'react'
import { IconButton, Snackbar } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

import {
  AppNotification,
  useAppNotificationContext
} from 'src/context/AppNotificationContext'

type SnackbarMessage = AppNotification

export interface State {
  open: boolean
  snackPack: readonly SnackbarMessage[]
  messageInfo?: SnackbarMessage
}

export function CustomSnackBar(): JSX.Element {
  const [open, setOpen] = useState(false)
  const [messageInfo, setMessageInfo] = useState<SnackbarMessage | undefined>(
    undefined
  )
  const { appNotifications, removeFirst } = useAppNotificationContext()
  const notifications = useMemo(() => appNotifications, [appNotifications])

  useEffect(() => {
    // Set a new snack when no one exists
    if (notifications.length && !messageInfo) {
      setMessageInfo({ ...notifications[0] })
      setOpen(true)
    } else if (notifications.length && messageInfo && open) {
      setOpen(false)
    }
  }, [messageInfo, notifications, open])

  const handleClose = (
    _event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') return

    setOpen(false)
  }
  const handleExited = () => {
    removeFirst()
    setMessageInfo(undefined)
  }

  console.log('__pack', notifications)
  return (
    <Snackbar
      key={messageInfo ? messageInfo.id : undefined}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      TransitionProps={{ onExited: handleExited }}
      message={messageInfo ? messageInfo.message : undefined}
      action={
        <>
          <IconButton
            aria-label="close"
            color="inherit"
            sx={{ p: 0.5 }}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </>
      }
    />
  )
}
