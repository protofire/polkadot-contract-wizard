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
import { web3FromAddress, web3Enable } from '@polkadot/extension-dapp'
import { WeightV2 } from '@polkadot/types/interfaces'
import { Bytes } from '@polkadot/types'

import { GetServiceData } from '@/types'
import { ContractMetadata } from '@/infrastructure'
import { useNetworkAccountsContext } from 'src/context/NetworkAccountsContext'
import { BN_ZERO } from '@/constants/numbers'
import { ContractConstructorDataForm } from '@/domain/wizard/step3DeployForm.types'
import { DAPP_CONFIG } from '../constants'
import { CodeSubmittableResult } from '@polkadot/api-contract/base'

type ReturnValue = GetServiceData

export type UseDeployContract = Pick<ContractMetadata, 'metadata' | 'wasm'> & {
  argsForm: ContractConstructorDataForm
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

    if (param.type.type === 'Balance') {
      return registry.createType('Balance', value)
    }

    return value || null
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
  wasm: ContractMetadata['wasm']
) {
  const { metadata, codeHash, gasLimit, salt, storageDepositLimit, value } =
    data
  const isValid = codeHash || !!wasm

  console.log('__metadata', wasm)
  if (metadata && isValid) {
    const constructor = metadata.findConstructor(0)

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
  deployContract: (props: UseDeployContract) => void
} => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()
  const {
    state: { api, currentAccount }
  } = useNetworkAccountsContext()
  const deployContract = useCallback(
    async ({ wasm, metadata, argsForm }: UseDeployContract) => {
      if (!currentAccount || !api) return

      const metadataAbi = new Abi(metadata, api.registry.getChainProperties())

      const params: Parameters<typeof api.call.contractsApi.instantiate> =
        getParamsContractInstatiate(currentAccount, api, metadataAbi, argsForm)

      const result = await api.call.contractsApi.instantiate(
        ...Object.values(params)
      )
      const { storageDeposit, gasRequired } =
        result as ContractInstantiateResult

      const predictedStorageDeposit = decodeStorageDeposit(storageDeposit)
      console.log('__deployParams', argsForm)
      // const tx = createInstatiateTx(
      //   api,
      //   {
      //     accountId: currentAccount,
      //     metadata: metadataAbi,
      //     constructorIndex: 0,
      //     salt: null,
      //     argValues: {},
      //     storageDepositLimit: getPredictedCharge(predictedStorageDeposit),
      //     gasLimit: gasRequired
      //   },
      //   argsForm,
      //   wasm
      // )
      const injector = await web3FromAddress(currentAccount)

      const gasLimit = 100000n * 1000000n
      const storageDepositLimit = null
      const code = new CodePromise(api, metadataAbi, wasm)
      const initialSupply = api.registry.createType('Balance', 1000)
      const tx = code.tx.new({ gasLimit, storageDepositLimit }, initialSupply)

      const unsub = await tx.signAndSend(
        currentAccount,
        {
          signer: injector.signer
        },
        ({ status, contract }) => {
          if (status.isInBlock || status.isFinalized) {
            const address = contract?.address.toString()
            console.log('contract address', address)
            unsub()
          }
        }
      )

      // const unsub = await tx.signAndSend(
      //   currentAccount,
      //   {
      //     signer: injector.signer
      //   },
      //   ({ status, events }) => {
      //     if (status.isInBlock || status.isFinalized) {
      //       events
      //         // find/filter for failed events
      //         .filter(({ event }) =>
      //           api.events.system.ExtrinsicFailed.is(event)
      //         )
      //         // we know that data for system.ExtrinsicFailed is
      //         // (DispatchError, DispatchInfo)
      //         .forEach(
      //           ({
      //             event: {
      //               data: [error, info]
      //             }
      //           }) => {
      //             if (error.isModule) {
      //               // for module errors, we have the section indexed, lookup
      //               const decoded = api.registry.findMetaError(error.asModule)
      //               const { docs, method, section } = decoded

      //               console.log(`${section}.${method}: ${docs.join(' ')}`)
      //             } else {
      //               // Other, CannotLookup, BadOrigin, no extra info
      //               console.log(error.toString())
      //             }
      //           }
      //         )

      //       console.log(
      //         '__',
      //         result.txHash.toString(),
      //         result.contract?.address.toString()
      //       )

      //       let message = 'Transaction failed'
      //       if (result.dispatchError?.isModule) {
      //         const decoded = api?.registry.findMetaError(
      //           result.dispatchError.asModule
      //         )
      //         message = `${decoded?.section.toUpperCase()}.${
      //           decoded?.method
      //         }: ${decoded?.docs}`
      //         console.log('__ERRor', message)
      //       }
      //     }
      //   }
      // )
      console.log('__txSigned', unsub)
    },
    [api, currentAccount]
  )

  return { isLoading, error, deployContract }
}
