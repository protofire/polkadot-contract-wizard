import { Keyring } from '@polkadot/ui-keyring'

export interface KeyringAccount {
  address: string
  label: string
}

// Get the list of accounts we possess the private key for
export function accountsInPossession(keyring: Keyring): KeyringAccount[] {
  return keyring.getPairs().map((account, index) => ({
    address: account.address,
    label:
      typeof account.meta.name === 'string'
        ? account.meta.name.toUpperCase()
        : `Account ${index}`
  }))
}
