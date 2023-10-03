import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback
} from 'react'
import { ApiPromise } from '@polkadot/api'
import jsonrpc from '@polkadot/types/interfaces/jsonrpc'
import { WalletState, useAllWallets, useWallet } from 'useink'
import { WalletKeys } from '@/constants/wallets'

import { ChainProperties } from '@/infrastructure/NetworkAccountRepository'
import { Wallet, WalletAccount } from '@/infrastructure/useink/walletTypes'
import { DEFAULT_CHAIN } from '../constants'
import { useLocalDbContext } from './LocalDbContext'
import { ChainId } from '@/infrastructure/useink/chains'
import { createNotImplementedWarning } from '@/utils/error'
import { WalletConnectionEvents } from '@/domain'

type NetworkState = 'DISCONNECTED' | 'CONNECTING' | 'CONNECTED' | 'ERROR'
export const OPTION_FOR_DISCONNECTING = 'disconnect'

export interface NetworkAccountsContextState {
  jsonRpc: typeof jsonrpc
  api?: ApiPromise
  apiError?: string
  chainInfo?: ChainProperties
  accountStatus: NetworkState
  currentWallet?: WalletState
  allWallets?: Wallet[]
  currentChain?: ChainId
  walletKey?: WalletKeys
  accounts?: WalletAccount[]
}

export const initialState: NetworkAccountsContextState = {
  jsonRpc: { ...jsonrpc },
  accountStatus: 'DISCONNECTED'
}

interface NetworkContextProps {
  state: NetworkAccountsContextState
  isConnected: boolean
  accountConnected: WalletAccount | undefined
  networkConnected: ChainId
  setCurrentAccount: (account: WalletAccount) => void
  setCurrentWallet: (wallet: Wallet) => void
  setCurrentChain: (chain: ChainId) => void
  connect: (walletName: string) => void
  disconnectWallet: () => void
}

export const NetworkAccountsContext = createContext<NetworkContextProps>({
  state: initialState,
  isConnected: false,
  accountConnected: undefined,
  networkConnected: DEFAULT_CHAIN,
  setCurrentAccount: () => createNotImplementedWarning('setCurrentAccount'),
  setCurrentWallet: () => createNotImplementedWarning('setCurrentWallet'),
  setCurrentChain: () => createNotImplementedWarning('setCurrentChain'),
  connect: () => createNotImplementedWarning('connect'),
  disconnectWallet: () => createNotImplementedWarning('disconnectWallet')
})

// const connectApi = async (
//   state: NetworkAccountsContextState,
//   updateState: React.Dispatch<
//     React.SetStateAction<NetworkAccountsContextState>
//   >,
//   wallet: Wallet
// ) => {
//   if (state.accountStatus !== 'DISCONNECTED') return
//   const defaultRpc = getChain(state.currentChain)?.rpcs[0]
//   console.log(defaultRpc)
//   console.info(`Connecting socket: ${DAPP_CONFIG.providerSocket}`)
//   const provider = new WsProvider(DAPP_CONFIG.providerSocket)
//   const _api = new ApiPromise({ provider, rpc: jsonrpc })

//   _api.on('connected', () => {
//     updateState(prev => ({ ...prev, api: _api }))
//     _api.isReady.then(async _api => {
//       const chainInfo = await getChainInfo(_api)
//       const accounts = await wallet.getAccounts()
//       updateState(prev => ({
//         ...prev,
//         accountStatus: 'CONNECTED',
//         // Select the fist account from the wallet by default
//         currentAccount: accounts[0].address,
//         walletKey: wallet.extensionName,
//         api: _api,
//         chainInfo
//       }))
//     })
//   })
//   _api.on('ready', () =>
//     updateState(prev => ({ ...prev, accountStatus: 'CONNECTED' }))
//   )
//   _api.on('error', err =>
//     updateState(prev => ({ ...prev, accountStatus: 'ERROR', apiError: err }))
//   )
// }

export function NetworkAccountsContextProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [state, setState] = useState<NetworkAccountsContextState>(initialState)
  const allWallets = useAllWallets()
  const { account, accounts, connect, disconnect, isConnected, setAccount } =
    useWallet()
  const { networkRepository } = useLocalDbContext()
  const [networkId, setNetworkId] = useState<ChainId>(DEFAULT_CHAIN)

  const loadNetworkConnected = useCallback(() => {
    const networkSelected = networkRepository.getNetworkSelected()

    setNetworkId(networkSelected.id)
  }, [networkRepository])

  useEffect(() => {
    loadNetworkConnected()
  }, [loadNetworkConnected])

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

  const setCurrentWallet = async (wallet: Wallet) => {
    connect(wallet.extensionName)
  }

  const _setAccount = (account: WalletAccount) => {
    setAccount(account)

    document.dispatchEvent(
      new CustomEvent(WalletConnectionEvents.changeAccountAddress)
    )
  }

  const setCurrentChain = useCallback(
    async (chainId: ChainId) => {
      networkRepository.setNetworkSelected(chainId)
      setNetworkId(chainId)

      document.dispatchEvent(
        new CustomEvent(WalletConnectionEvents.networkChanged)
      )
    },
    [networkRepository]
  )

  return (
    <NetworkAccountsContext.Provider
      value={{
        state,
        isConnected,
        accountConnected: account,
        networkConnected: networkId,
        setCurrentAccount: _setAccount,
        setCurrentWallet,
        setCurrentChain,
        disconnectWallet: disconnect,
        connect
      }}
    >
      {children}
    </NetworkAccountsContext.Provider>
  )
}

export const useNetworkAccountsContext = () =>
  useContext(NetworkAccountsContext)
