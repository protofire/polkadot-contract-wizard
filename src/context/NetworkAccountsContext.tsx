import React, { createContext, useEffect, useState, useContext } from 'react'
import { ApiPromise } from '@polkadot/api'
import jsonrpc from '@polkadot/types/interfaces/jsonrpc'
import { WalletConnectionEvents } from '@/domain/DomainEvents'
import { WalletState, useAllWallets, useChainRpcList, useWallet } from 'useink'
import { ALL_CHAINS_OBJ } from '@/constants/chain'
import { Wallet } from '@/types'
import { ChainProperties } from '@/infrastructure/NetworkAccountRepository'
import { ChainExtended } from 'src/types/chain'

type NetworkState = 'DISCONNECTED' | 'CONNECTING' | 'CONNECTED' | 'ERROR'

export interface NetworkAccountsContextState {
  currentAccount?: string
  jsonRpc: typeof jsonrpc
  api?: ApiPromise
  apiError?: string
  accountStatus: NetworkState
  chainInfo?: ChainProperties
  currentWallet?: WalletState
  allWallets?: Wallet[]
  currentChain?: ChainExtended
}

export const initialState: NetworkAccountsContextState = {
  jsonRpc: { ...jsonrpc },
  accountStatus: 'DISCONNECTED',
  currentWallet: undefined,
  currentChain: {} as ChainExtended
}

export const NetworkAccountsContext = createContext(
  {} as {
    state: NetworkAccountsContextState
    setCurrentAccount: (account: string) => void
    setCurrentWallet: (walletExtensionName: string) => void
    setCurrentChain: (chain: ChainExtended) => void
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
      currentAccount: wallet.account?.address,
      currentChain: ALL_CHAINS_OBJ['astar']
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
  const { setChainRpc } = useChainRpcList()

  // TODO: Add API Provider
  // const apiProvider = useApi()
  // const apiPromise = apiProvider?.api

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
      value={{ state, setCurrentAccount, setCurrentWallet, setCurrentChain }}
    >
      {children}
    </NetworkAccountsContext.Provider>
  )
}

export const useNetworkAccountsContext = () =>
  useContext(NetworkAccountsContext)
