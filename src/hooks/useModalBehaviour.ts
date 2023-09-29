import { useState } from 'react'

export interface UseModalBehaviour {
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
}

export function useModalBehaviour(): UseModalBehaviour {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  return { closeModal, isOpen, openModal }
}
