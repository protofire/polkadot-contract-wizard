import { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'

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

function createToast(notification: AppNotification, remove: () => void) {
  toast(notification.message, {
    type: notification.type ?? 'default',
    onClose: remove
  })
}

export function CustomSnackBar(): JSX.Element {
  const { appNotifications, removeFirst } = useAppNotificationContext()

  useEffect(() => {
    if (appNotifications.length < 1) return

    createToast(appNotifications[0], removeFirst)
  }, [appNotifications, removeFirst])

  return <ToastContainer theme="dark" autoClose={2000} />
}
