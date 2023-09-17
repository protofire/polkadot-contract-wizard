import { useState, useRef, useEffect, MutableRefObject } from 'react'

type RefType = HTMLButtonElement | null
const ONE_SECOND = 1000 // ms

interface UseRecentlyClicked {
  ref: MutableRefObject<RefType>
  recentlyClicked: boolean
}

export function useRecentlyClicked(waitTime = ONE_SECOND): UseRecentlyClicked {
  const [clicked, setClicked] = useState(false)
  const ref = useRef<RefType>(null)

  useEffect(() => {
    if (!ref.current) return

    function handleClick() {
      setClicked(true)
      setTimeout(() => {
        setClicked(false)
      }, waitTime)

      ref.current?.click()
    }

    ref.current.addEventListener('click', handleClick)

    // avoid losing the pointer when clean up
    const copyCurrentButton = ref.current
    return () => {
      copyCurrentButton.removeEventListener('click', handleClick)
    }
  }, [ref, waitTime])

  return { ref, recentlyClicked: clicked }
}
