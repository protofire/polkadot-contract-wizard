import { useCallback } from 'react'

import { useAppNotificationContext } from '@/context'
import { IS_DEVELOPMENT } from '@/constants/config'
import { getErrorMessage } from '@/utils/error'

export function useReportError(toastError = true) {
  const { addNotification } = useAppNotificationContext()

  const reportError = useCallback(
    (error: unknown) => {
      const errorMessage = getErrorMessage(error)

      if (IS_DEVELOPMENT) console.error(error)

      if (toastError) {
        addNotification({
          message: errorMessage,
          type: 'error'
        })
      }
    },
    [addNotification, toastError]
  )

  return reportError
}
