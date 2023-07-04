import { useEffect, useState } from 'react'

export function useViewportWidth() {
  const [viewportWidth, setViewportWidth] = useState(0)

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth)
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return { viewportWidth }
}
