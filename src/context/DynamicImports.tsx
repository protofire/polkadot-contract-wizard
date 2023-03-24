import { web3Accounts, web3Enable } from '@polkadot/extension-dapp'
import { useCallback } from 'react'

export default function ExtensionDapp() {
  const _web3Acocunts = useCallback(() => {
    return web3Accounts
  }, [])
  const _web3Enable = useCallback(() => {
    return web3Enable
  }, [])
  return { web3Accounts: _web3Acocunts, web3Enable: _web3Enable }
}
