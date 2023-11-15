import JSON5 from 'json5'
import {
  AbiMessage,
  AnyJson,
  Bytes,
  ContractExecResult,
  ContractReturnFlags,
  Registry,
  TypeDef
} from '@/services/substrate/types'

type ContractResult = {
  Err?: AnyJson
  Ok?: AnyJson
}

function isContractResult(obj: unknown): obj is ContractResult {
  return (
    typeof obj === 'object' && obj !== null && ('Err' in obj || 'Ok' in obj)
  )
}

function getReturnTypeName(type: TypeDef | null | undefined): string {
  return type?.lookupName || type?.type || ''
}

export function stringify(obj: unknown): string {
  return JSON5.stringify(obj, null, 2)
}

function decodeReturnValue(
  returnType: TypeDef | null | undefined,
  data: Bytes,
  registry: Registry
): AnyJson {
  if (!returnType) return '()'
  const returnTypeName = getReturnTypeName(returnType)
  try {
    return registry.createTypeUnsafe(returnTypeName, [data]).toHuman()
  } catch (exception) {
    console.error(exception)
    return 'Decoding error'
  }
}

function checkRevertFlag(flags: ContractReturnFlags): boolean {
  return flags.toHuman().includes('Revert')
}

function extractOutcome(returnValue: AnyJson): AnyJson {
  if (!isContractResult(returnValue)) return returnValue
  return returnValue.Err ?? returnValue.Ok ?? returnValue
}

function getOutcomeText(outcome: AnyJson): string {
  if (isContractResult(outcome) && outcome.Ok === null) {
    return 'null'
  }

  if (!isContractResult(outcome)) {
    return typeof outcome === 'object' && outcome !== null
      ? stringify(outcome)
      : outcome?.toString() ?? 'Error'
  }

  const outcomeJson = outcome.Err ?? outcome.Ok
  return typeof outcomeJson === 'object' && outcomeJson !== null
    ? stringify(outcomeJson)
    : outcomeJson?.toString() ?? 'Error'
}

export function getDecodedOutput(
  { result }: Pick<ContractExecResult, 'result' | 'debugMessage'>,
  { returnType }: AbiMessage,
  registry: Registry
): {
  decodedOutput: string
  isError: boolean
} {
  if (!result.isOk) return { decodedOutput: 'Error', isError: true }

  const isError = checkRevertFlag(result.asOk.flags)
  const returnValue = decodeReturnValue(returnType, result.asOk.data, registry)
  const outcome = extractOutcome(returnValue)
  const decodedOutput = isError
    ? getOutcomeText(outcome)
    : getOutcomeText(outcome) || '<empty>'

  return {
    decodedOutput,
    isError
  }
}
