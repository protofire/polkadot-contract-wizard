import { useCallback, useState } from 'react'
import { Abi, BlueprintPromise, CodePromise } from '@polkadot/api-contract'
import { BlueprintOptions } from '@polkadot/api-contract/types'
import { ApiPromise } from '@polkadot/api'
import { StorageDeposit, Balance } from '@polkadot/types/interfaces'
import { WeightV2 } from '@polkadot/types/interfaces'
import { Bytes } from '@polkadot/types'

import { GetServiceData } from '@/types'
import { useNetworkAccountsContext } from '@/context/NetworkAccountsContext'
import { BIG_ZERO_BN } from '@/constants/numbers'
import { ContractConstructorDataForm } from '@/domain/wizard/step3DeployForm.types'
import { deployContractService } from '@/infrastructure/deployContract'
import { ContractMetadata, TokenType, UserContractDetails } from '@/domain'
import { genRanHex } from '@/utils/blockchain'
import {
  contractDryRun,
  transformUserInput
} from '@/infrastructure/contractDryRun'
import { useReportError } from './useReportError'
import { useNetworkApi } from '@/hooks/useNetworkApi'
import { ChainId } from '@/infrastructure/useink/chains'

type ReturnValue = GetServiceData

export type UseDeployContract = ContractMetadata & {
  argsForm: ContractConstructorDataForm
  tokenType: TokenType
  blockchain: ChainId
  successCallback?: (contractDeployed: UserContractDetails) => void
}

type UIStorageDeposit = {
  value?: Balance
  type: 'charge' | 'refund' | 'empty'
}

export interface InstantiateData {
  accountId: string
  argValues?: Record<string, unknown>
  value?: Balance
  metadata?: Abi
  name: string
  constructorIndex: number
  salt: string | Uint8Array | Bytes | null
  storageDepositLimit: Balance | null
  gasLimit: WeightV2 | undefined
  codeHash?: string
}

export function decodeStorageDeposit(
  storageDeposit: StorageDeposit
): UIStorageDeposit {
  if (storageDeposit.isCharge) {
    return { value: storageDeposit.asCharge, type: 'charge' }
  } else if (storageDeposit.isRefund) {
    return { value: storageDeposit.asRefund, type: 'refund' }
  }
  return {
    type: 'empty'
  }
}

export function getPredictedCharge(dryRun: UIStorageDeposit) {
  return dryRun.type === 'charge'
    ? !dryRun.value?.eq(BIG_ZERO_BN)
      ? dryRun.value ?? null
      : null
    : null
}

function createInstatiateTx(
  api: ApiPromise,
  data: Omit<InstantiateData, 'name'>,
  argValues: ContractConstructorDataForm,
  wasm: ContractMetadata['wasm']
) {
  const { metadata, codeHash, gasLimit, salt, storageDepositLimit, value } =
    data
  const isValid = codeHash || !!wasm

  if (metadata && isValid) {
    const constructor = metadata.findConstructor(0)

    // const gasLimit = 100000n * 1000000n
    // const storageDepositLimit = null
    const options: BlueprintOptions = {
      gasLimit,
      salt: salt || null,
      storageDepositLimit,
      value
    }

    const codeOrBlueprint = codeHash
      ? new BlueprintPromise(api, metadata, codeHash)
      : new CodePromise(api, metadata, wasm)

    const transformed = transformUserInput(
      api.registry,
      constructor.args,
      argValues
    )

    return constructor.args.length > 0
      ? codeOrBlueprint.tx[constructor.method](options, ...transformed)
      : codeOrBlueprint.tx[constructor.method](options)
  } else {
    throw new Error('Error creating instantiate tx')
  }
}

export const useDeployContract = (): ReturnValue & {
  deployContract: (
    props: UseDeployContract
  ) => Promise<UserContractDetails | void>
} => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()
  const { reportErrorWithToast } = useReportError()
  const { accountConnected } = useNetworkAccountsContext()
  const currentAccount = accountConnected?.address
  const { apiPromise: api } = useNetworkApi()

  const deployContract = useCallback(
    async ({
      wasm,
      metadata,
      argsForm,
      code_id,
      tokenType,
      blockchain,
      successCallback
    }: UseDeployContract): Promise<UserContractDetails | void> => {
      if (!currentAccount || !api) return
      setIsLoading(true)
      setError(undefined)

      const metadataAbi = new Abi(metadata, api.registry.getChainProperties())
      try {
        const { storageDeposit, gasRequired } = await contractDryRun({
          currentAccount,
          api,
          metadataAbi,
          argsForm,
          wasm
        })

        const predictedStorageDeposit = decodeStorageDeposit(storageDeposit)
        const tx = createInstatiateTx(
          api,
          {
            accountId: currentAccount,
            metadata: metadataAbi,
            constructorIndex: 0,
            salt: genRanHex(64),
            argValues: {},
            storageDepositLimit: getPredictedCharge(predictedStorageDeposit),
            gasLimit: gasRequired
          },
          argsForm,
          wasm
        )

        const result = await deployContractService({ api, tx, currentAccount })
        const contractDeployed: UserContractDetails = {
          userAddress: currentAccount,
          blockchain,
          txHash: result.txHash,
          address: result.contractAddress,
          codeHash: code_id,
          name: tokenType,
          abi: metadataAbi.json,
          date: new Date().toISOString(),
          external: false
        }

        successCallback?.(contractDeployed)

        return contractDeployed
      } catch (error) {
        reportErrorWithToast(error)
      } finally {
        setIsLoading(false)
      }
    },
    [api, currentAccount, reportErrorWithToast]
  )

  return { isLoading, error, deployContract }
}
