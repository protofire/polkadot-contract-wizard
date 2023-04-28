import { useState, useRef, useEffect } from 'react'

type RefType = HTMLButtonElement | null

interface UseRecentlyClickedProps {
  onClick: () => void
}

export function useRecentlyClicked({ onClick }: UseRecentlyClickedProps) {
  const [clicked, setClicked] = useState(false)
  const ref = useRef<RefType>(null)

  useEffect(() => {
    if (!ref.current) return

    function handleClick() {
      setClicked(true)
      onClick && onClick()
      setTimeout(() => {
        setClicked(false)
      }, 1000)
    }

    ref.current.addEventListener('click', handleClick)

    // avoid losing the pointer when clean up
    const copyCurrentButton = ref.current
    return () => {
      copyCurrentButton.removeEventListener('click', handleClick)
    }
  }, [onClick, ref])

  return { ref, recentlyClicked: clicked }
}
