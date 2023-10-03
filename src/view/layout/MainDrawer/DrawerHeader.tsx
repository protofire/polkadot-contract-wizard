import { useTheme } from '@mui/material/styles'
import { Stack } from '@mui/material'

import DrawerHeaderStyled from './DrawerHeaderStyled'
import Logo from '@/view/components/Logo'

const DrawerHeader = ({ open }: { open: boolean }) => {
  const theme = useTheme()

  return (
    <DrawerHeaderStyled theme={theme} open={open}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Logo />
      </Stack>
    </DrawerHeaderStyled>
  )
}

export default DrawerHeader
