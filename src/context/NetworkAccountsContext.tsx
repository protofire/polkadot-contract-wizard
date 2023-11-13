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

import { ChainProperties } from '@/services/NetworkAccountRepository'
import { Wallet, WalletAccount } from '@/services/useink/walletTypes'
import { DEFAULT_CHAIN } from '../constants'
import { useLocalDbContext } from './LocalDbContext'
import { ChainId } from '@/services/useink/chains'
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
