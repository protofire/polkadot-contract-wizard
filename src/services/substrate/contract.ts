import { isValidAddress } from '@/utils/blockchain'
import { ApiPromise, Option } from './types'
import { ContractInfo } from '@polkadot/types/interfaces'

/**
 * Retrieves contract information for a given address using the provided Polkadot API.
 *
 * @param {ApiPromise} api - An instance of ApiPromise from @polkadot/api.
 * @param {string} address - The address of the contract to retrieve information for.
 *
 * @returns {Promise<ContractInfo|null>} Returns the contract information if found and the address is valid, otherwise returns null.
 *
 * @throws {Error} Throws an error if there's an issue querying the contract information.
 *
 * @example
 * const api = new ApiPromise({ provider: new WsProvider('wss://example.com') });
 * const address = '5D5PhZQNJzcJXVBxwJxZcsutjKPqUPydrvpu6HeiBfMae68Y';
 * const info = await getContractInfo(api, address);
 */
export async function getContractInfo(
  api: ApiPromise,
  address: string
): Promise<ContractInfo | null> {
  if (!isValidAddress(address)) return null

  const result = (await api.query.contracts.contractInfoOf(
    address
  )) as Option<ContractInfo>

  return result.unwrapOr(null)
}
