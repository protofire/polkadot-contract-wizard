import React, { createContext, useState, useContext } from 'react'
import { ApiPromise } from '@polkadot/api'
import jsonrpc from '@polkadot/types/interfaces/jsonrpc'
import { WalletConnectionEvents } from '@/domain/DomainEvents'
import { WalletState, useAllWallets, useChainRpcList, useWallet } from 'useink'
import { ALL_CHAINS_OBJ } from '@/constants/chain'
import { ChainProperties } from '@/infrastructure/NetworkAccountRepository'
import { ChainExtended } from 'src/types/chain'
import { Wallet, WalletAccount, WalletLogoProps } from '@/types'
import { WALLET_DETAILS } from '@/constants/wallets'

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
  walletLogo: WalletLogoProps
}

export const initialState: NetworkAccountsContextState = {
  jsonRpc: { ...jsonrpc },
  accountStatus: 'DISCONNECTED',
  currentWallet: undefined,
  currentChain: {} as ChainExtended,
  walletLogo: {} as WalletLogoProps
}

export const NetworkAccountsContext = createContext(
  {} as {
    state: NetworkAccountsContextState
    setCurrentAccount: (account: string) => void
    setCurrentWallet: (wallet: Wallet) => void
    setCurrentChain: (chain: ChainExtended) => void
    accounts: WalletAccount[] | undefined
    allWallets: Wallet[]
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
  const { setChainRpc } = useChainRpcList()

  // TODO: Add API Provider
  // const apiProvider = useApi()
  // const apiPromise = apiProvider?.api

  const disconnectWallet = () => {
    disconnect()
    setState(prev => ({
      ...prev,
      accountStatus: 'DISCONNECTED',
      currentAccount: undefined,
      walletLogo: {} as WalletLogoProps
    }))
  }

  const setCurrentAccount = (accountAddress: string) => {
    if (accountAddress === 'disconnect') {
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
    await wallet.enable('contract-wizard')
    const accounts = await getAccounts()

    // Save currentWallet
    if (!localStorage.getItem('currentWallet')) {
      localStorage.setItem('currentWallet', extensionName)
    }
    connect(extensionName)
    setState(prev => ({
      ...prev,
      accountStatus: 'CONNECTED',
      currentAccount: accounts[0].address,
      walletLogo: WALLET_DETAILS[extensionName],
      currentChain: ALL_CHAINS_OBJ['astar']
    }))
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
        accounts,
        allWallets,
        connect,
        setCurrentChain
      }}
    >
      {children}
    </NetworkAccountsContext.Provider>
  )
}

export const useNetworkAccountsContext = () =>
  useContext(NetworkAccountsContext)
