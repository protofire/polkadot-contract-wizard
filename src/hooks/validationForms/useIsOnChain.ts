import { getContractInfo } from '@/services/substrate/contract'
import { isValidAddress } from '@/utils/blockchain'
import { useCallback, useState } from 'react'
import { useNetworkApi } from '../useNetworkApi'

interface UseIsOnChain {
  isOnChain: (_address: string) => Promise<string | undefined>
  contractHash: string
}

interface ContractInfoHumanized {
  codeHash?: string | null
}

export function useIsOnChain(): UseIsOnChain {
  const { apiPromise: api } = useNetworkApi()
  const [contractHash, setContractHash] = useState<string>('')

  const isOnChain = useCallback(
    async (address: string) => {
      setContractHash('')
      if (!api) return

      if (!isValidAddress(address)) return 'Must be a valid Address'

      try {
        const isOnChain = await getContractInfo(api, address)

        if (isOnChain === null) return 'Address is not on-chain'

        const { codeHash } = isOnChain.toHuman() as ContractInfoHumanized
        setContractHash(codeHash || '')
      } catch (e) {
        return 'An error ocurred during address validation'
      }
    },
    [api]
  )

  return { isOnChain, contractHash }
}
