import { ApiPromise, WsProvider } from '@polkadot/api'
import { TypeRegistry } from '@polkadot/types/create'

import {
  getChainInfo,
  ChainProperties
} from '@/infrastructure/NetworkAccountRepository'

const WS_ROCOCO_PROVIDER = 'wss://rococo-contracts-rpc.polkadot.io'
const WS_LOCAL_PROVIDER = 'ws://127.0.0.1:9944'
const registry = new TypeRegistry()

describe('getChainInfo function', () => {
  let api: ApiPromise
  const shouldRunChainTests = process.env.POLKADOT_CONNECTION_TESTS === 'true'

  afterAll(async () => {
    shouldRunChainTests && (await api.disconnect())
  })

  test(
    shouldRunChainTests
      ? 'returns correct chain info when there is an internet connection'
      : 'skips network tests',
    async () => {
      if (!shouldRunChainTests) {
        console.warn('Skipping network tests')
        return
      }
      api = await ApiPromise.create({
        provider: new WsProvider(WS_ROCOCO_PROVIDER)
      })

      const chainProperties: ChainProperties = await getChainInfo(api)

      expect(typeof chainProperties.systemName).toEqual('string')
      expect(typeof chainProperties.systemChainType).toEqual(
        typeof registry.createType('ChainType', 'Live')
      )
      expect(typeof chainProperties.systemChain).toEqual('string')
      expect(typeof chainProperties.tokenSymbol).toEqual('string')
      expect(typeof chainProperties.isDevelopment).toEqual('boolean')
    }
  )

  test(
    shouldRunChainTests
      ? 'returns chain info when is local'
      : 'skips local network tests',
    async () => {
      if (!shouldRunChainTests) {
        console.warn('Skipping local network tests')
        return
      }

      api = await ApiPromise.create({
        provider: new WsProvider(WS_LOCAL_PROVIDER)
      })

      const chainProperties: ChainProperties = await getChainInfo(api)

      expect(chainProperties.systemChain).toEqual('Development')
      expect(chainProperties.tokenSymbol).toEqual('Unit')
      expect(chainProperties.isDevelopment).toEqual(true)
    }
  )
})
