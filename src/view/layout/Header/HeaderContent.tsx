import { Box } from '@mui/material'
import { WalletConnectButton } from 'src/view/components/WalletConnectButton'
import MobileSection from './MobileSection'

const HeaderContent = ({ isMobile }: { isMobile: boolean }) => {
  return (
    <>
      <WalletConnectButton />
      {isMobile && <Box sx={{ width: '100%', ml: 1 }} />}
      {isMobile && <MobileSection />}
    </>
  )
}

export default HeaderContent
