import Identicon from '@polkadot/react-identicon'

export function AvatarAccount({ address }: { address: string }) {
  return <Identicon theme="substrate" size={50} value={address} />
}
