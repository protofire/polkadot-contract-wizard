import React, { createContext, useEffect, useState, useContext } from 'react'
import { ApiPromise } from '@polkadot/api'
import jsonrpc from '@polkadot/types/interfaces/jsonrpc'
import { WalletConnectionEvents } from '@/domain/DomainEvents'
import { WalletState, useAllWallets, useWallet } from 'useink'
import { CHAINS_ALLOWED } from '@/constants/chain'
import { Wallet, WalletLogoProps } from '@/types'
import { WALLET_DETAILS, WalletImg } from '@/constants/wallets'

type NetworkState = 'DISCONNECTED' | 'CONNECTING' | 'CONNECTED' | 'ERROR'

export interface NetworkAccountsContextState {
  currentAccount?: string
  jsonRpc: typeof jsonrpc
  api?: ApiPromise
  apiError?: string
  accountStatus: NetworkState
  currentWallet?: WalletState
  allWallets?: Wallet[]
  walletLogo: WalletLogoProps
}

export const initialState: NetworkAccountsContextState = {
  jsonRpc: { ...jsonrpc },
  accountStatus: 'DISCONNECTED',
  currentWallet: undefined,
  walletLogo: {} as WalletLogoProps
}

export const NetworkAccountsContext = createContext(
  {} as {
    state: NetworkAccountsContextState
    setCurrentAccount: (account: string) => void
    setCurrentWallet: (walletExtensionName: string) => void
  }
)

const loadAccounts = (
  state: NetworkAccountsContextState,
  updateState: React.Dispatch<
    React.SetStateAction<NetworkAccountsContextState>
  >,
  wallet: WalletState
) => {
  if (state.currentWallet) return
  const AsyncLoadAccounts = async () => {
    updateState(prev => ({
      ...prev,
      accountStatus: 'CONNECTED',
      currentWallet: wallet,
      currentAccount: wallet.account?.address
    }))
  }

  AsyncLoadAccounts()
}

const listWallets = (
  updateState: React.Dispatch<
    React.SetStateAction<NetworkAccountsContextState>
  >,
  allWallets: Wallet[]
) => {
  updateState(prev => ({
    ...prev,
    allWallets
  }))
}

export function NetworkAccountsContextProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [state, setState] = useState<NetworkAccountsContextState>(initialState)
  const allWallets = useAllWallets()
  const wallet = useWallet()

  // TODO: Add API Provider
  // const apiProvider = useApi()
  // const apiPromise = apiProvider?.api

  useEffect(() => {
    const savedWallet = localStorage.getItem('currentWallet')
    console.log('savedWallet', savedWallet)
    if (!savedWallet) return
    console.log('wallet', wallet)
    setCurrentWallet(savedWallet)
    loadAccounts(state, setState, wallet)

    console.log('currentState', state)
  }, [])

  useEffect(() => {
    document.addEventListener(WalletConnectionEvents.walletConnectInit, () => {
      loadAccounts(state, setState, wallet)
    })

    document.addEventListener(WalletConnectionEvents.listAllWallets, () => {
      listWallets(setState, allWallets)
    })

    return () => {
      document.removeEventListener(
        WalletConnectionEvents.walletConnectInit,
        () => loadAccounts(state, setState, wallet)
      )

      document.removeEventListener(
        WalletConnectionEvents.listAllWallets,
        () => {
          listWallets(setState, allWallets)
        }
      )
    }
  }, [state, allWallets, wallet])

  function setCurrentAccount(accountAddress: string) {
    const account = wallet.accounts?.filter(
      element => element.address === accountAddress
    )[0]
    wallet.setAccount(account)
    setState(prev => ({ ...prev, currentAccount: account.address }))
  }

  function setCurrentWallet(walletExtensionName: string) {
    // Save currentWallet
    if (!localStorage.getItem('currentWallet')) {
      localStorage.setItem('currentWallet', walletExtensionName)
    }
    wallet.connect(walletExtensionName)
    setState(prev => ({
      ...prev,
      currentWallet: wallet,
      walletLogo: WALLET_DETAILS[walletExtensionName]
    }))
    document.dispatchEvent(
      new CustomEvent(WalletConnectionEvents.walletConnectInit)
    )
  }

  return (
    <NetworkAccountsContext.Provider
      value={{ state, setCurrentAccount, setCurrentWallet }}
    >
      {children}
    </NetworkAccountsContext.Provider>
  )
}

export const useNetworkAccountsContext = () =>
  useContext(NetworkAccountsContext)
