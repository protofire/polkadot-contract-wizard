import { Abi } from '@/services/substrate/types'

export interface Validation {
  isError?: boolean
  isSuccess?: boolean
  isTouched?: boolean
  isValid?: boolean
  isWarning?: boolean
  message?: React.ReactNode
}

export interface Metadata {
  source?: Record<string, unknown>
  name: string
  value?: Abi
  isSupplied: boolean
}

export type MetadataState = Metadata & Validation
