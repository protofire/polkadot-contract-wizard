import { Abi, ApiPromise, ContractPromise } from '@/services/substrate/types'
import { useEffect, useMemo, useState } from 'react'

import { MetadataState, UserContractDetailsWithAbi } from '@/domain'
import { useNetworkApi } from '@/hooks/useNetworkApi'
import { MetadataManager } from '@/services/substrate/MetadataManager'

interface UseContractPromise {
  abi: Abi
  name: string
  tx: ContractPromise['tx']
  address: string
  contractPromise: ContractPromise
}

export function useContractPromise(
  address: string,
  metadata: MetadataState
): UseContractPromise | undefined {
  const { apiPromise } = useNetworkApi()
  const [contract, setContract] = useState<ContractPromise | undefined>()

  useEffect(() => {
    setContract(undefined)
    if (!metadata.value || !address || !apiPromise) return

    const c = new ContractPromise(apiPromise, metadata.value, address)
    setContract(c)
  }, [address, apiPromise, metadata.value])

  if (!contract) return undefined

  return {
    abi: contract.abi,
    name: contract.abi.info.contract.name.toString(),
    tx: contract.tx,
    address: contract.address.toString(),
    contractPromise: contract
  }
}

const metadataManager = new MetadataManager()

export function useContractPromiseFromSource(
  userContract: UserContractDetailsWithAbi,
  apiPromise: ApiPromise | undefined
) {
  const derivedMetadata = useMemo(
    () =>
      metadataManager.deriveFromJson(
        { isWasmRequired: false, name: userContract.name },
        userContract.abi,
        apiPromise
      ),
    [apiPromise, userContract.abi, userContract.name]
  )

  return useContractPromise(userContract.address, derivedMetadata)
}
