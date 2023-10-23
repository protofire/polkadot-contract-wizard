import { useMemo } from 'react'
import { Drawer } from '@mui/material'

import DrawerContent from './DrawerContent'
import DrawerHeader from './DrawerHeader'
import { useLocalDbContext } from '@/context/LocalDbContext'

interface Props {
  open: boolean
  handleDrawerToggle: () => void
  drawerwidth?: number
  isMobile?: boolean
  version: string
}

const MainDrawer = ({
  open,
  isMobile,
  handleDrawerToggle,
  drawerwidth = 260,
  version
}: Props) => {
  const { apiVersion: backendApiVersion } = useLocalDbContext()
  const drawerContent = useMemo(
    () => (
      <DrawerContent version={version} backendApiVersion={backendApiVersion} />
    ),
    [version, backendApiVersion]
  )
  const drawerHeader = useMemo(() => <DrawerHeader open={open} />, [open])

  const mobileProps = {
    open,
    ModalProps: {
      keepMounted: true
    },
    onClose: () => handleDrawerToggle
  }

  const desktopProps = {
    open: true,
    onClose: () => handleDrawerToggle
  }

  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'permanent'}
      {...(isMobile ? { open } : { open: true })}
      {...(isMobile ? { ...mobileProps } : { ...desktopProps })}
      sx={{
        width: open ? drawerwidth : 0
      }}
      PaperProps={{
        sx: {
          ...(!isMobile && !open ? { boxShadow: 0 } : {}),
          width: open ? drawerwidth : 0,
          border: '0'
        }
      }}
      ModalProps={{ onClose: handleDrawerToggle }}
    >
      {open && drawerHeader}
      {open && drawerContent}
    </Drawer>
  )
}

export default MainDrawer
