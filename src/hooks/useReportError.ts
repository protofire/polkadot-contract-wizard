import { useCallback } from 'react'

import { useAppNotificationContext } from '@/context'
import { IS_DEVELOPMENT } from '@/constants/config'
import { getErrorMessage } from '@/utils/error'

export function reportError(error: unknown): string {
  const errorMessage = getErrorMessage(error)

  if (IS_DEVELOPMENT) console.error(error)

  return errorMessage
}

export function useReportError(toastError = true) {
  const { addNotification } = useAppNotificationContext()

  const reportErrorWithToast = useCallback(
    (error: unknown) => {
      const errorMessage = reportError(error)

      if (toastError) {
        addNotification({
          message: errorMessage,
          type: 'error'
        })
      }
    },
    [addNotification, toastError]
  )

  return { reportErrorWithToast, addNotification }
}
