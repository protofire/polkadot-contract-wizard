import { Abi } from '@polkadot/api-contract'
import { AbiParam, AbiMessage } from '@polkadot/api-contract/types'
import { ApiPromise } from '@polkadot/api'
import { ContractInstantiateResult } from '@polkadot/types/interfaces'
import { Registry } from '@polkadot/types-codec/types'

import { ContractConstructorDataForm } from '@/domain/wizard/step3DeployForm.types'
import { BN_ZERO } from '@/constants/numbers'
import { ContractMetadata } from '@/domain'
import { method } from 'lodash'

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

function getParamsContractInstatiate(
  accountId: string,
  api: ApiPromise,
  metadataAbi: Abi,
  argsFormValues: ContractConstructorDataForm,
  wasm: ContractMetadata['wasm']
) {
  const deployConstructor: AbiMessage = metadataAbi.constructors[0]
  const inputData = deployConstructor.toU8a(
    transformUserInput(
      metadataAbi.registry,
      deployConstructor.args,
      argsFormValues
    )
  )

  return {
    origin: accountId,
    value: api.registry.createType('Balance', BN_ZERO),
    gasLimit: null,
    storageDepositLimit: null,
    code: { Upload: wasm },
    data: inputData,
    salt: null
  }
}

interface ContractDryRun {
  currentAccount: string
  api: ApiPromise
  metadataAbi: Abi
  argsForm: ContractConstructorDataForm
  wasm: ContractMetadata['wasm']
}

const DRY_RUN_ERRORS_MSG: Record<string, string> = {
  StorageDepositLimitExhausted: 'Insufficient funds to cover the tx'
}

export async function contractDryRun({
  currentAccount,
  api,
  metadataAbi,
  argsForm,
  wasm
}: ContractDryRun): Promise<ContractInstantiateResult> {
  const params = getParamsContractInstatiate(
    currentAccount,
    api,
    metadataAbi,
    argsForm,
    wasm
  )

  const dryRunResult = (await api.call.contractsApi.instantiate(
    ...Object.values(params)
  )) as ContractInstantiateResult

  if (dryRunResult?.result.isOk) return dryRunResult

  const dryRunError =
    dryRunResult?.result.isErr && dryRunResult?.result.asErr.isModule
      ? api.registry.findMetaError(dryRunResult?.result.asErr.asModule)
      : null

  let errMesssage = 'Transaction dry run verification failed'

  if (dryRunError && dryRunError.method in DRY_RUN_ERRORS_MSG) {
    errMesssage = DRY_RUN_ERRORS_MSG[dryRunError.name]
  } else if (dryRunError && dryRunResult.debugMessage.length) {
    errMesssage = dryRunResult.debugMessage.toString()
  }

  throw Error(errMesssage)
}