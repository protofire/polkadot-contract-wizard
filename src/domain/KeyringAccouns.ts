import { Keyring } from '@polkadot/ui-keyring'

export interface KeyringAccount {
  key: string
  value: string
  text: string
  icon: string
}

// Get the list of accounts we possess the private key for
export function accountsInPossession(keyring: Keyring) {
  return keyring.getPairs().map(account => ({
    key: account.address,
    value: account.address,
    text:
      typeof account.meta.name === 'string' && account.meta.name.toUpperCase(),
    icon: 'user'
  }))
}
