import { Avatar, Box, Typography } from '@mui/material'
import Identicon from '@polkadot/react-identicon'

import { shortNameLonger, truncateAddress } from '@/utils/formatString'

interface Props {
  address: string
  truncateLenght?: number
  name?: string
}

export function AccountAvatar({ address, name, truncateLenght = 4 }: Props) {
  return (
    <Box display="flex" alignItems="center">
      <Avatar>
        <Identicon value={address} size={32} theme="beachball" />
      </Avatar>
      <Box marginLeft={1}>
        {name === undefined ? <></> : <span>{shortNameLonger(name)}</span>}
        <Typography color={name === undefined ? 'white' : '#636669'}>
          {truncateAddress(address, truncateLenght)}
        </Typography>
      </Box>
    </Box>
  )
}
