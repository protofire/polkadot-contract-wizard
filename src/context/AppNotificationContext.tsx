import React, {
  createContext,
  useEffect,
  useState,
  useContext,
  useCallback
} from 'react'
import { AppNotificationEvents } from 'src/domain/DomainEvents'

export interface AppNotification {
  id: number
  message: string
  type?: 'default' | 'info' | 'success' | 'error' | 'warning'
}

export interface AppNotificationRepository {
  search(): AppNotification[]
  save(notification: AppNotification): void
  removeFirst(): void
}

export class StorageNotificationsRepository
  implements AppNotificationRepository
{
  localStorageKey = 'repositoryNotifications'

  search(): AppNotification[] {
    const data = localStorage.getItem(this.localStorageKey)

    if (!data) {
      return []
    }

    return JSON.parse(data) as AppNotification[]
  }

  save(notification: AppNotification): void {
    const currentRepositoryWidget = this.search()

    localStorage.setItem(
      this.localStorageKey,
      JSON.stringify(currentRepositoryWidget.concat(notification))
    )
  }

  removeFirst(): void {
    const currentRepositoryWidget = this.search()

    localStorage.setItem(
      this.localStorageKey,
      JSON.stringify(currentRepositoryWidget.slice(1))
    )
  }
}

const AppNotificationContext = createContext<{
  appNotifications: AppNotification[]
  addNotification(notification: Omit<AppNotification, 'id'>): void
  removeFirst(): void
}>(
  {} as {
    appNotifications: AppNotification[]
    addNotification(notification: Omit<AppNotification, 'id'>): void
    removeFirst(): void
  }
)

export function AppNotificationContextProvider({
  children,
  repository
}: {
  children: React.ReactNode
  repository: AppNotificationRepository
}) {
  const [appNotifications, setAppNotifications] = useState<AppNotification[]>(
    []
  )

  useEffect(() => {
    setAppNotifications(repository.search())
  }, [repository])

  // update Notifications
  useEffect(() => {
    const reloadRepositoryWidgets = () => {
      setAppNotifications(repository.search())
    }

    document.addEventListener(
      AppNotificationEvents.notificationUpdated,
      reloadRepositoryWidgets
    )

    return () => {
      document.removeEventListener(
        AppNotificationEvents.notificationUpdated,
        reloadRepositoryWidgets
      )
    }
  }, [repository])

  const save = useCallback(
    (notification: Omit<AppNotification, 'key'>) => {
      repository.save({ ...notification, id: new Date().getTime() })
      document.dispatchEvent(
        new CustomEvent(AppNotificationEvents.notificationUpdated)
      )
    },
    [repository]
  )

  const slice = useCallback(() => {
    repository.removeFirst()
    document.dispatchEvent(
      new CustomEvent(AppNotificationEvents.notificationUpdated)
    )
  }, [repository])

  return (
    <AppNotificationContext.Provider
      value={{ appNotifications, addNotification: save, removeFirst: slice }}
    >
      {children}
    </AppNotificationContext.Provider>
  )
}

export const useAppNotificationContext = () =>
  useContext(AppNotificationContext)
