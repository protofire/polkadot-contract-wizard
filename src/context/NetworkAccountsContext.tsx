import React, { createContext, useEffect, useState, useContext } from 'react'
import { ApiPromise, WsProvider } from '@polkadot/api'
import jsonrpc from '@polkadot/types/interfaces/jsonrpc'
import { isTestChain } from '@polkadot/util'
import { keyring as KeyringUI, Keyring } from '@polkadot/ui-keyring'
import { TypeRegistry } from '@polkadot/types/create'

import { PROVIDER_SOCKET, APP_NAME } from '@constants'
import { WalletConnectionEvents } from 'src/domain/DomainEvents'
import { ChainType } from '@polkadot/types/interfaces/system'
import { accountsInPossession } from 'src/domain/KeyringAccouns'

type NetworkState = 'DISCONNECTED' | 'CONNECTING' | 'CONNECTED' | 'ERROR'

export interface NetworkAccountsContextState {
  currentAccount?: string
  jsonRpc: typeof jsonrpc
  apiStatus: NetworkState
  api?: ApiPromise
  apiError?: string
  accountStatus: NetworkState // keyring state
  keyring?: Keyring
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

// Connecting to the Substrate node
const connect = (
  state: NetworkAccountsContextState,
  updateState: React.Dispatch<React.SetStateAction<NetworkAccountsContextState>>
) => {
  if (state.apiStatus !== 'DISCONNECTED') return

  updateState(prev => ({ ...prev, apiStatus: 'CONNECTING' }))
  console.info(`Connecting socket: ${PROVIDER_SOCKET}`)

  const provider = new WsProvider(PROVIDER_SOCKET)
  const _api = new ApiPromise({ provider, rpc: jsonrpc })

  // Set listeners for disconnection and reconnection event.
  _api.on('connected', () => {
    updateState(prev => ({ ...prev, api: _api }))
    // `ready` event is not emitted upon reconnection and is checked explicitly here.
    _api.isReady.then(_api =>
      updateState(prev => ({ ...prev, apiStatus: 'CONNECTED', api: _api }))
    )
  })
  _api.on('ready', () =>
    updateState(prev => ({ ...prev, apiStatus: 'CONNECTED' }))
  )
  _api.on('error', err =>
    updateState(prev => ({ ...prev, apiStatus: 'ERROR', apiError: err }))
  )
}

const registry = new TypeRegistry()
const retrieveChainInfo = async (
  api: ApiPromise
): Promise<{ systemChain: string; systemChainType: ChainType }> => {
  const [systemChain, systemChainType] = await Promise.all([
    api.rpc.system.chain(),
    api.rpc.system.chainType
      ? api.rpc.system.chainType()
      : Promise.resolve(registry.createType('ChainType', 'Live') as ChainType)
  ])

  return {
    systemChain: (systemChain || '<unknown>').toString(),
    systemChainType
  }
}

let keyringLoadAll = false

const loadAccounts = (
  state: NetworkAccountsContextState,
  updateState: React.Dispatch<React.SetStateAction<NetworkAccountsContextState>>
) => {
  const { api, apiStatus, accountStatus: keyringStatus } = state
  if (
    apiStatus !== 'CONNECTED' ||
    keyringLoadAll ||
    keyringStatus !== 'DISCONNECTED'
  )
    return
  if (!api) {
    throw Error('Api providers has an connection error')
  }

  keyringLoadAll = true
  updateState(prev => ({ ...prev, accountStatus: 'CONNECTING' }))

  const asyncLoadAccounts = async (_api: ApiPromise) => {
    try {
      const { web3Enable, web3Accounts } = await import(
        '@polkadot/extension-dapp'
      )
      await web3Enable(APP_NAME)
      let allAccounts = await web3Accounts()
      allAccounts = allAccounts.map(({ address, meta }) => ({
        address,
        meta: { ...meta, name: `${meta.name} (${meta.source})` }
      }))

      // Logics to check if the connecting chain is a dev chain, coming from polkadot-js Apps
      // ref: https://github.com/polkadot-js/apps/blob/15b8004b2791eced0dde425d5dc7231a5f86c682/packages/react-api/src/Api.tsx?_pjax=div%5Bitemtype%3D%22http%3A%2F%2Fschema.org%2FSoftwareSourceCode%22%5D%20%3E%20main#L101-L110
      const { systemChain, systemChainType } = await retrieveChainInfo(
        _api as ApiPromise
      )
      const isDevelopment =
        systemChainType.isDevelopment ||
        systemChainType.isLocal ||
        isTestChain(systemChain)

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

  asyncLoadAccounts(api)
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