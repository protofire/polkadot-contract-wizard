import { useEffect, useMemo } from 'react'
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

export function CustomSnackBar(): JSX.Element {
  const { appNotifications, removeFirst } = useAppNotificationContext()
  const notifications = useMemo(() => appNotifications, [appNotifications])

  useEffect(() => {
    if (notifications.length < 1) return

    notifications.map(_notification => {
      toast(_notification.message, {
        type: _notification.type ?? 'default',
        onClose: removeFirst
      })
    })
  }, [notifications, removeFirst])

  return <ToastContainer theme="dark" autoClose={2000} />
}
