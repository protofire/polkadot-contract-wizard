
import { Abi, AbiMessage } from '@/services/substrate/types'

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

export interface AbiSource {
  [key: string]: unknown
  source: { language: string }
  spec: {
    messages: AbiMessage[]
  }
}

export function isAbiSource(
  abi: Record<string, unknown> | undefined
): abi is AbiSource {
  return (
    typeof abi === 'object' &&
    abi !== null &&
    'source' in abi &&
    typeof abi.source === 'object' &&
    abi.source !== null &&
    'spec' in abi &&
    abi.spec !== null &&
    typeof abi.spec === 'object' &&
    'messages' in abi.spec &&
    Array.isArray(abi.spec.messages)
  )
}

export type MetadataState = Metadata & Validation
