import React, { createContext, useState, useContext, useEffect } from 'react'
import { ApiPromise } from '@polkadot/api'
import jsonrpc from '@polkadot/types/interfaces/jsonrpc'
import { useAllWallets, useApi, useWallet } from 'useink'

import { WalletKeys } from '@/constants/wallets'
import {
  ChainProperties,
  getChainInfo
} from '@/infrastructure/NetworkAccountRepository'
import { DAPP_CONFIG } from '../constants'
import { Wallet, WalletAccount } from '@/infrastructure/useink/walletTypes'

type NetworkState = 'DISCONNECTED' | 'CONNECTED' | 'ERROR'
export const OPTION_FOR_DISCONNECTING = 'disconnect'

export interface NetworkAccountsContextState {
  currentAccount?: string
  jsonRpc: typeof jsonrpc
  api?: ApiPromise
  apiError?: string
  chainInfo?: ChainProperties
  accountStatus: NetworkState
  walletKey?: WalletKeys
  allWallets?: Wallet[]
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
    connect: (walletName: string) => void
  }
)

export function NetworkAccountsContextProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [state, setState] = useState<NetworkAccountsContextState>(initialState)
  const allWallets = useAllWallets()
  const { accounts, connect, disconnect } = useWallet()
  const apiProvider = useApi()

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
    const { extensionName, getAccounts } = wallet
    await wallet.enable(DAPP_CONFIG.name)
    const accounts = await getAccounts()
    const apiProv = apiProvider?.api
    const chainInfo = await getChainInfo(apiProv as ApiPromise)

    connect(extensionName)
    setState(prev => ({
      ...prev,
      accountStatus: 'CONNECTED',
      currentAccount: accounts[0].address,
      walletKey: extensionName,
      api: apiProv,
      chainInfo
    }))
  }

  return (
    <NetworkAccountsContext.Provider
      value={{
        state,
        setCurrentAccount,
        setCurrentWallet,
        connect
      }}
    >
      {children}
    </NetworkAccountsContext.Provider>
  )
}

export const useNetworkAccountsContext = () =>
  useContext(NetworkAccountsContext)
