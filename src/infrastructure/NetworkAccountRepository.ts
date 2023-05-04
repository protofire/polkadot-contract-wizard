import { ApiPromise } from '@polkadot/api'
import { ChainType } from '@polkadot/types/interfaces/system'
import { TypeRegistry } from '@polkadot/types/create'
import { isTestChain } from '@polkadot/util'

export interface ChainProperties {
  systemName: string | null
  systemChainType: ChainType
  systemChain: string
  tokenSymbol: string
  isDevelopment: boolean
}

const registry = new TypeRegistry()
export async function getChainInfo(api: ApiPromise): Promise<ChainProperties> {
  const [chainProperties, systemName, systemChain, systemChainType] =
    await Promise.all([
      api.rpc.system.properties(),
      api.rpc.system.name(),
      (await api.rpc.system.chain()).toString(),
      api.rpc.system.chainType
        ? api.rpc.system.chainType()
        : Promise.resolve(registry.createType('ChainType', 'Live') as ChainType)
    ])

  return {
    systemName: systemName.toString(),
    systemChain,
    systemChainType,
    tokenSymbol: chainProperties.tokenSymbol.isSome
      ? chainProperties.tokenSymbol
          .unwrap()
          .toArray()
          .map(s => s.toString())[0]
      : 'Unit',
    isDevelopment:
      systemChainType.isDevelopment ||
      systemChainType.isLocal ||
      isTestChain(systemChain)
  }
}
