import { useCallback, useState } from 'react'
import { Abi, BlueprintPromise, CodePromise } from '@polkadot/api-contract'
import {
  AbiMessage,
  AbiParam,
  BlueprintOptions
} from '@polkadot/api-contract/types'
import { ApiPromise } from '@polkadot/api'
import {
  ContractInstantiateResult,
  StorageDeposit,
  Balance
} from '@polkadot/types/interfaces'
import { Registry } from '@polkadot/types-codec/types'
import { WeightV2 } from '@polkadot/types/interfaces'
import { Bytes } from '@polkadot/types'

import { GetServiceData } from '@/types'
import { ContractResponse } from '@/infrastructure'
import { useNetworkAccountsContext } from 'src/context/NetworkAccountsContext'
import { BN_ZERO } from '@/constants/numbers'
import { ContractConstructorDataForm } from '@/domain/wizard/step3DeployForm.types'
import { deployContractService } from '@/infrastructure/deployContract'
import {
  useAppNotificationContext,
  useStorageContractsContext
} from '@/context'
import { ContractDeployed, TokenType } from '@/domain'
import { genRanHex } from '@/utils/blockchain'

type ReturnValue = GetServiceData

export type UseDeployContract = ContractResponse & {
  argsForm: ContractConstructorDataForm
  tokenType: TokenType
  blockchain: ContractDeployed['blockchain']
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

export function transformUserInput(
  registry: Registry,
  deployConstructor: AbiParam[],
  argsFormValues: ContractConstructorDataForm
) {
  const values = Object.fromEntries(argsFormValues)

  return deployConstructor.map(param => {
    const value = values[param.name] ?? null
    if (value && param.type) {
      return registry.createType(param.type.type, value)
    }

    return value
  })
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
    ? !dryRun.value?.eq(BN_ZERO)
      ? dryRun.value ?? null
      : null
    : null
}

function getParamsContractInstatiate(
  accountId: string,
  api: ApiPromise,
  metadataAbi: Abi,
  argsFormValues: ContractConstructorDataForm
) {
  const deployConstructor: AbiMessage = metadataAbi.constructors[0]
  const inputData = deployConstructor.toU8a(
    transformUserInput(
      metadataAbi.registry,
      deployConstructor.args,
      argsFormValues
    )
  )

  return [
    accountId,
    api.registry.createType('Balance', BN_ZERO),
    null,
    null,
    { Upload: metadataAbi.info.source.wasm },
    inputData,
    ''
  ]
}

function createInstatiateTx(
  api: ApiPromise,
  data: Omit<InstantiateData, 'name'>,
  argValues: ContractConstructorDataForm,
  wasm: ContractResponse['wasm']
) {
  const { metadata, codeHash, gasLimit, salt, storageDepositLimit, value } =
    data
  const isValid = codeHash || !!wasm

  if (metadata && isValid) {
    const constructor = metadata.findConstructor(0)

    const gasLimit = 100000n * 1000000n
    const storageDepositLimit = null
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
  deployContract: (props: UseDeployContract) => Promise<ContractDeployed | void>
} => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()
  const { addNotification } = useAppNotificationContext()
  const { addContractToStorage } = useStorageContractsContext()
  const {
    state: { api, currentAccount }
  } = useNetworkAccountsContext()

  const deployContract = useCallback(
    async ({
      wasm,
      metadata,
      argsForm,
      code_id,
      tokenType,
      blockchain
    }: UseDeployContract): Promise<ContractDeployed | void> => {
      if (!currentAccount || !api) return
      setIsLoading(true)
      setError(undefined)

      const metadataAbi = new Abi(metadata, api.registry.getChainProperties())
      const params: Parameters<typeof api.call.contractsApi.instantiate> =
        getParamsContractInstatiate(currentAccount, api, metadataAbi, argsForm)

      const result = await api.call.contractsApi.instantiate(
        ...Object.values(params)
      )
      const { storageDeposit, gasRequired } =
        result as ContractInstantiateResult

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

      try {
        const result = await deployContractService({ api, tx, currentAccount })
        const contractDeployed = {
          code_id,
          type: tokenType,
          status: 'deployed' as const,
          address: result.contractAddress,
          blockchain,
          name: '',
          txHash: result.txHash.toString()
        }

        addContractToStorage(currentAccount, contractDeployed)

        return contractDeployed
      } catch (error) {
        console.error(error)
        addNotification({
          message:
            typeof error === 'string'
              ? error
              : 'An error ocurred while deploying',
          type: 'error'
        })
      } finally {
        setIsLoading(false)
      }
    },
    [addContractToStorage, addNotification, api, currentAccount]
  )

  return { isLoading, error, deployContract }
}
