import { Box } from '@mui/material'
import MobileSection from './MobileSection'
import dynamic from 'next/dynamic'

const WalletConnectButton = dynamic(
  () =>
    import('@/view/components/WalletConnectButton').then(
      res => res.WalletConnectButton
    ),
  { ssr: false }
)

const HeaderContent = ({ isMobile }: { isMobile: boolean }) => {
  return (
    <>
      {!isMobile && <WalletConnectButton />}
      {isMobile && <Box sx={{ width: '100%', ml: 1 }} />}
      {isMobile && <MobileSection />}
    </>
  )
}

export default HeaderContent
