import { useEffect, useRef } from 'react'
import { IS_DEVELOPMENT } from '../constants'
import { SmartContractEvents, WalletConnectionEvents } from '@/domain'

type EventCallback = () => void
type EventNames =
  | keyof typeof WalletConnectionEvents
  | keyof typeof SmartContractEvents

export function useMultiEventListener(
  events: EventNames[], // accept any array of strings as event names
  callback: EventCallback
): void {
  const callbackRef = useRef<EventCallback>(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    const handleEvent = (event: Event) => {
      if (IS_DEVELOPMENT) {
        console.info('Received event::', event.type)
      }
      callback()
    }

    events.forEach(eventName => {
      document.addEventListener(eventName, handleEvent)
    })

    return () => {
      events.forEach(eventName => {
        document.removeEventListener(eventName, handleEvent)
      })
    }
  }, [callback, events])
}
