import { ApiPromise } from '@polkadot/api'
import { CodePromise } from '@polkadot/api-contract'
import { decodeAddress, encodeAddress } from '@polkadot/keyring'
import { hexToU8a, isHex } from '@polkadot/util'

import { CompileApiResponse } from '@/types'

export const isValidAddress = (address: string | undefined) => {
  try {
    encodeAddress(isHex(address) ? hexToU8a(address) : decodeAddress(address))

    return true
  } catch (error) {
    return false
  }
}

type InstatiateTxProps = Pick<
  CompileApiResponse['contract'],
  'metadata' | 'wasm'
> & {
  api: ApiPromise
}

export async function factoryInstatiateTx({
  api,
  metadata,
  wasm
}: InstatiateTxProps) {
  const code = new CodePromise(api, JSON.parse(metadata), wasm)

  const initialSupply = api.registry.createType('Balance', 1000)
  return code.tx.new({}, initialSupply)
}
