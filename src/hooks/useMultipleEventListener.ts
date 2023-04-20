import { useEffect, useRef } from 'react'

type EventCallback<T> = (event: T) => void

export const useMultiEventListener = <T extends Event>(
  events: string[], // accept any array of strings as event names
  callback: EventCallback<T>
): void => {
  const callbackRef = useRef<EventCallback<T>>(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    const handleEvent = (event: Event) => {
      callbackRef.current(event as T) // type assertion
    }

    events.forEach(eventName => {
      window.addEventListener(eventName, handleEvent)
    })

    return () => {
      events.forEach(eventName => {
        window.removeEventListener(eventName, handleEvent)
      })
    }
  }, [events])
}
