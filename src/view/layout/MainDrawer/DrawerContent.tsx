import { useRouter } from 'next/router'

import Navigation from './Navigation'
import SimpleBar from 'src/view/components/third-party/SimpleBar'

const DrawerContent = () => {
  const { pathname } = useRouter()

  return (
    <SimpleBar
      sx={{
        '& .simplebar-content': {
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          marginTop: '2rem'
        }
      }}
    >
      <Navigation currentPath={pathname} />
    </SimpleBar>
  )
}

export default DrawerContent
