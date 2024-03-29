import { AbiMessage } from '@/services/substrate/types'

export interface GroupedAbiMessages {
  nonMutating: AbiMessage[]
  mutating: AbiMessage[]
}

export function groupAndSortAbiMessages(
  abiMessages: AbiMessage[] | undefined
): { mutating: AbiMessage[]; nonMutating: AbiMessage[] } {
  if (!abiMessages?.length) return { mutating: [], nonMutating: [] }

  const mutating = abiMessages
    .filter(message => message.isMutating)
    .sort((a, b) => a.method.localeCompare(b.method))
  const nonMutating = abiMessages
    .filter(message => !message.isMutating)
    .sort((a, b) => a.method.localeCompare(b.method))

  return {
    nonMutating,
    mutating
  }
}
