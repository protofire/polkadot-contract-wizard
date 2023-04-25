import React, { createContext, useEffect, useState, useContext } from 'react'
import { ApiPromise, WsProvider } from '@polkadot/api'
import jsonrpc from '@polkadot/types/interfaces/jsonrpc'
import { isTestChain } from '@polkadot/util'
import { keyring as KeyringUI, Keyring } from '@polkadot/ui-keyring'
import { TypeRegistry } from '@polkadot/types/create'

import { DAPP_CONFIG } from '@/constants/index'
import { WalletConnectionEvents } from 'src/domain/DomainEvents'
import { ChainType } from '@polkadot/types/interfaces/system'
import { accountsInPossession } from 'src/domain/KeyringAccouns'

type NetworkState = 'DISCONNECTED' | 'CONNECTING' | 'CONNECTED' | 'ERROR'

interface ChainProperties {
  systemName: string | null
  systemChainType: ChainType
  systemChain: string
  tokenSymbol: string
  isDevelopment: boolean
}

export interface NetworkAccountsContextState {
  currentAccount?: string
  jsonRpc: typeof jsonrpc
  apiStatus: NetworkState
  api?: ApiPromise
  apiError?: string
  accountStatus: NetworkState // keyring state
  keyring?: Keyring
  chainInfo?: ChainProperties
}

export const initialState: NetworkAccountsContextState = {
  jsonRpc: { ...jsonrpc },
  apiStatus: 'DISCONNECTED',
  accountStatus: 'DISCONNECTED'
}

export const NetworkAccountsContext = createContext(
  {} as {
    state: NetworkAccountsContextState
    setCurrentAccount: (account: string) => void
  }
)

const registry = new TypeRegistry()
async function getChainInfo(api: ApiPromise): Promise<ChainProperties> {
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

// Connecting to the Substrate node
const connect = (
  state: NetworkAccountsContextState,
  updateState: React.Dispatch<React.SetStateAction<NetworkAccountsContextState>>
) => {
  if (state.apiStatus !== 'DISCONNECTED') return

  updateState(prev => ({ ...prev, apiStatus: 'CONNECTING' }))
  console.info(`Connecting socket: ${DAPP_CONFIG.providerSocket}`)

  const provider = new WsProvider(DAPP_CONFIG.providerSocket)
  const _api = new ApiPromise({ provider, rpc: jsonrpc })

  // Set listeners for disconnection and reconnection event.
  _api.on('connected', () => {
    updateState(prev => ({ ...prev, api: _api }))
    // `ready` event is not emitted upon reconnection and is checked explicitly here.
    _api.isReady.then(async _api => {
      const chainInfo = await getChainInfo(_api)
      updateState(prev => ({
        ...prev,
        apiStatus: 'CONNECTED',
        api: _api,
        chainInfo
      }))
    })
  })
  _api.on('ready', () =>
    updateState(prev => ({ ...prev, apiStatus: 'CONNECTED' }))
  )
  _api.on('error', err =>
    updateState(prev => ({ ...prev, apiStatus: 'ERROR', apiError: err }))
  )
}

let keyringLoadAll = false

const loadAccounts = (
  state: NetworkAccountsContextState,
  updateState: React.Dispatch<React.SetStateAction<NetworkAccountsContextState>>
) => {
  const { api, apiStatus, accountStatus: keyringStatus, chainInfo } = state
  if (
    apiStatus !== 'CONNECTED' ||
    keyringLoadAll ||
    keyringStatus !== 'DISCONNECTED' ||
    !chainInfo
  )
    return
  if (!api) {
    throw Error('Api providers has an connection error')
  }

  keyringLoadAll = true
  updateState(prev => ({ ...prev, accountStatus: 'CONNECTING' }))
  const { isDevelopment } = chainInfo

  const asyncLoadAccounts = async () => {
    try {
      const { web3Enable, web3Accounts } = await import(
        '@polkadot/extension-dapp'
      )
      await web3Enable(DAPP_CONFIG.name)
      let allAccounts = await web3Accounts()
      allAccounts = allAccounts.map(({ address, meta }) => ({
        address,
        meta: { ...meta, name: `${meta.name} (${meta.source})` }
      }))

      KeyringUI.loadAll({ isDevelopment }, allAccounts)
      updateState(prev => ({
        ...prev,
        accountStatus: 'CONNECTED',
        keyring: KeyringUI
      }))
    } catch (e) {
      console.error(e)
      updateState(prev => ({ ...prev, accountStatus: 'ERROR' }))
    }
  }

  asyncLoadAccounts()
}

export function NetworkAccountsContextProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [state, setState] = useState<NetworkAccountsContextState>(initialState)
  connect(state, setState)

  useEffect(() => {
    document.addEventListener(WalletConnectionEvents.walletConnectInit, () =>
      loadAccounts(state, setState)
    )

    return () => {
      document.removeEventListener(
        WalletConnectionEvents.walletConnectInit,
        () => loadAccounts(state, setState)
      )
    }
  }, [state])

  useEffect(() => {
    if (!state.keyring || state.currentAccount !== undefined) return

    const accounts = accountsInPossession(state.keyring)
    const initialAddress = accounts.length > 0 ? accounts[0].address : ''
    setCurrentAccount(initialAddress)
  }, [state.currentAccount, state.keyring])

  function setCurrentAccount(account: string) {
    setState(prev => ({ ...prev, currentAccount: account }))
    document.dispatchEvent(
      new CustomEvent(WalletConnectionEvents.changeAccountAddress)
    )
  }

  return (
    <NetworkAccountsContext.Provider value={{ state, setCurrentAccount }}>
      {children}
    </NetworkAccountsContext.Provider>
  )
}

export const useNetworkAccountsContext = () =>
  useContext(NetworkAccountsContext)
