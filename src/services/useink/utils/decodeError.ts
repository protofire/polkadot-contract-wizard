import {
  ContractPromise,
  DispatchError,
  RegistryError
} from '@/services/substrate/types.js'

export type RegistryErrorMethod = string

export const getRegistryError = (
  error: DispatchError | undefined,
  { api }: ContractPromise
): RegistryError | undefined => {
  if (!error?.isModule) return

  return api?.registry.findMetaError(error.asModule)
}

const formatErrorMessage = (registryError: RegistryError): string =>
  `${registryError.section}.${registryError.method}: ${registryError.docs}`

export const decodeError = (
  dispatchError: DispatchError | undefined,
  chainContract: ContractPromise | undefined,
  moduleMessages?: Record<RegistryErrorMethod, string>,
  defaultMessage?: string
): string | undefined => {
  if (!chainContract) return undefined
  const registryError = getRegistryError(dispatchError, chainContract)
  if (!registryError) return undefined

  return (
    moduleMessages?.[registryError.method] ||
    defaultMessage ||
    formatErrorMessage(registryError)
  )
}
