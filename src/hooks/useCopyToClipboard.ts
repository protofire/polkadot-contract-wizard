import { useState, useRef } from 'react'
import copy from 'copy-to-clipboard'

export function useCopyToClipboard() {
  const [isCopied, setIsCopied] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  function handleCopy(textToCopy: string) {
    copy(textToCopy)
    setIsCopied(true)

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => setIsCopied(false), 1000)
  }

  return [isCopied, handleCopy] as const
}
