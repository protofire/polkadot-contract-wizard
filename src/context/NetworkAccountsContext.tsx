import React, { createContext, useEffect, useState, useContext } from 'react'
import { ApiPromise, WsProvider } from '@polkadot/api'
import jsonrpc from '@polkadot/types/interfaces/jsonrpc'
import { WalletConnectionEvents } from '@/domain/DomainEvents'
import { WalletState, useAllWallets, useWallet } from 'useink'
import { ChainId } from 'useink/dist/chains'
import { CHAINS_ALLOWED } from '@/constants/chain'

type NetworkState = 'DISCONNECTED' | 'CONNECTING' | 'CONNECTED' | 'ERROR'

export interface NetworkAccountsContextState {
  currentAccount?: string
  jsonRpc: typeof jsonrpc
  api?: ApiPromise
  apiError?: string
  accountStatus: NetworkState // keyring state
  // chainInfo?: ChainProperties
  currentWallet?: WalletState
  allWallets?: WalletState[]
}

export const initialState: NetworkAccountsContextState = {
  jsonRpc: { ...jsonrpc },
  accountStatus: 'DISCONNECTED',
  currentWallet: undefined
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
  allWallets: WalletState[]
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
  const [networkId, setNetworkId] = useState<ChainId | undefined>()

  const allWallets = useAllWallets()
  const wallet = useWallet()

  // TODO: Add API Provider
  // const apiProvider = useApi()
  // const apiPromise = apiProvider?.api

  useEffect(() => {
    if (networkId) return
    setNetworkId(CHAINS_ALLOWED[0].paraId)
  }, [networkId])

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
    wallet.connect(walletExtensionName)
    setState(prev => ({ ...prev, currentWallett: wallet }))
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
