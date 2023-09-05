import React, { createContext, useState, useContext, useEffect } from 'react'
import { ApiPromise, WsProvider } from '@polkadot/api'
import jsonrpc from '@polkadot/types/interfaces/jsonrpc'
import { WalletState, useAllWallets, useChainRpcList, useWallet } from 'useink'
import { CHAINS_ALLOWED } from '@/constants/chains'
import { ChainExtended } from 'src/types/chain'
import { WalletKeys } from '@/constants/wallets'

import {
  ChainProperties,
  getChainInfo
} from '@/infrastructure/NetworkAccountRepository'
import { Wallet, WalletAccount } from '@/infrastructure/useink/walletTypes'
import { DAPP_CONFIG, DEFAULT_CHAIN } from '../constants'
import { LocalStorageNetworkRepository } from '@/infrastructure/LocalStorageNetworkRepository'

type NetworkState = 'DISCONNECTED' | 'CONNECTING' | 'CONNECTED' | 'ERROR'
export const OPTION_FOR_DISCONNECTING = 'disconnect'

export interface NetworkAccountsContextState {
  currentAccount?: string
  jsonRpc: typeof jsonrpc
  api?: ApiPromise
  apiError?: string
  chainInfo?: ChainProperties
  accountStatus: NetworkState
  currentWallet?: WalletState
  allWallets?: Wallet[]
  currentChain?: ChainExtended
  walletKey?: WalletKeys
  accounts?: WalletAccount[]
}

export const initialState: NetworkAccountsContextState = {
  jsonRpc: { ...jsonrpc },
  accountStatus: 'DISCONNECTED'
}

export const NetworkAccountsContext = createContext(
  {} as {
    state: NetworkAccountsContextState
    setCurrentAccount: (account: string) => void
    setCurrentWallet: (wallet: Wallet) => void
    setCurrentChain: (chain: ChainExtended) => void
    connect: (walletName: string) => void
  }
)
const connectApi = async (
  state: NetworkAccountsContextState,
  updateState: React.Dispatch<
    React.SetStateAction<NetworkAccountsContextState>
  >,
  wallet: Wallet
) => {
  if (state.accountStatus !== 'DISCONNECTED') return
  const defaultRpc = state.currentChain?.rpcs[0]
  console.log(defaultRpc)
  console.info(`Connecting socket: ${DAPP_CONFIG.providerSocket}`)
  const provider = new WsProvider(DAPP_CONFIG.providerSocket)
  const _api = new ApiPromise({ provider, rpc: jsonrpc })

  _api.on('connected', () => {
    updateState(prev => ({ ...prev, api: _api }))
    _api.isReady.then(async _api => {
      const chainInfo = await getChainInfo(_api)
      const accounts = await wallet.getAccounts()
      updateState(prev => ({
        ...prev,
        accountStatus: 'CONNECTED',
        // Select the fist account from the wallet by default
        currentAccount: accounts[0].address,
        walletKey: wallet.extensionName,
        api: _api,
        chainInfo
      }))
    })
  })
  _api.on('ready', () =>
    updateState(prev => ({ ...prev, accountStatus: 'CONNECTED' }))
  )
  _api.on('error', err =>
    updateState(prev => ({ ...prev, accountStatus: 'ERROR', apiError: err }))
  )
}

const networkRepository = new LocalStorageNetworkRepository()

export function NetworkAccountsContextProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [state, setState] = useState<NetworkAccountsContextState>(initialState)
  const allWallets = useAllWallets()
  const { accounts, connect, disconnect } = useWallet()
  const { setChainRpc } = useChainRpcList()

  useEffect(() => {
    setState(prev => ({
      ...prev,
      allWallets
    }))
  }, [allWallets])

  useEffect(() => {
    setState(prev => ({
      ...prev,
      accounts
    }))
  }, [accounts])

  const disconnectWallet = () => {
    disconnect()
    setState(prev => ({
      ...prev,
      accountStatus: 'DISCONNECTED'
    }))
  }

  const setCurrentAccount = (accountAddress: string) => {
    if (accountAddress === OPTION_FOR_DISCONNECTING) {
      disconnectWallet()
      return
    }
    const account: WalletAccount = accounts?.filter(
      element => element.address === accountAddress
    )[0]
    connect(account.wallet?.extensionName as string)
    setState(prev => ({ ...prev, currentAccount: account.address }))
  }

  const setCurrentWallet = async (wallet: Wallet) => {
    setState(prev => ({
      ...prev,
      accountStatus: 'CONNECTING',
      currentChain: CHAINS_ALLOWED[DEFAULT_CHAIN]
    }))
    connect(wallet.extensionName)
    connectApi(state, setState, wallet)
  }

  function setCurrentChain(chainObj: ChainExtended) {
    const { id, rpcs } = chainObj
    // Select the first rpc from the list
    setChainRpc(rpcs[0], id)
    setState(prev => ({
      ...prev,
      currentChain: chainObj
    }))
  }

  return (
    <NetworkAccountsContext.Provider
      value={{
        state,
        setCurrentAccount,
        setCurrentWallet,
        setCurrentChain,
        connect
      }}
    >
      {children}
    </NetworkAccountsContext.Provider>
  )
}

export const useNetworkAccountsContext = () =>
  useContext(NetworkAccountsContext)
