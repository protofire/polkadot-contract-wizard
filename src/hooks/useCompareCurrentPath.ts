import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

interface UseCompareCurrentPath {
  isEqual: boolean
}

export function useCompareCurrentPath(
  targetPath: string
): UseCompareCurrentPath {
  const router = useRouter()
  const [isEqual, setIsEqual] = useState(false)

  useEffect(() => {
    setIsEqual(false)
    if (router.pathname === targetPath) {
      setIsEqual(true)
    }
  }, [router.pathname, targetPath])

  return { isEqual }
}
