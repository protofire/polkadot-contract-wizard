import { useRouter } from 'next/router'
import Image from 'next/image'
import Navigation from './Navigation'
import SimpleBar from '@/view/components/third-party/SimpleBar'
import { LOGO_PROTOFIRE } from '@/constants/images'
import { Typography, Stack, Link, Box } from '@mui/material'
import TelegramIcon from '@mui/icons-material/Telegram'
import GithubIcon from '@mui/icons-material/GitHub'

interface Props {
  version: string
  backendApiVersion: string
}

const DrawerContent = ({ version, backendApiVersion }: Props) => {
  const { pathname } = useRouter()

  return (
    <>
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
      <Stack
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: '1.2rem'
        }}
      >
        <Typography variant="h5" mb={4}>
          <Link
            href="https://t.me/+u5M4K7vKfbQxZjMx"
            underline="hover"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}
          >
            <TelegramIcon fontSize="small" sx={{ color: '#ffffff' }} />
            Need Help?
          </Link>
        </Typography>
        <Typography variant="h5" mb={4}>
          <Link
            href="https://github.com/protofire/polkadot-contract-wizard"
            underline="hover"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}
          >
            <GithubIcon fontSize="small" sx={{ color: '#ffffff' }} />
            Github
          </Link>
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            gap: '0.5rem'
          }}
        >
          <Typography
            variant="body1"
            sx={{
              color: '#ffffff7d',
              fontSize: '0.8rem',
              marginTop: '0.1rem'
            }}
          >
            Developed by
          </Typography>
          <Link
            href="https://protofire.io"
            underline="hover"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              alt="Logo protofire"
              src={LOGO_PROTOFIRE}
              width={100}
              height={25}
            />
          </Link>
        </Box>
        <Stack direction="row" justifyContent="flex-end">
          {version && (
            <Box display="flex" justifyContent={'right'} pr={'1rem'}>
              <Typography
                sx={{
                  color: '#ffffff7d',
                  fontSize: '0.6rem',
                  marginTop: '0.1rem'
                }}
              >
                FE V{version}
              </Typography>
            </Box>
          )}
          {version && (
            <Box display="flex" justifyContent={'right'} pr={'1rem'}>
              <Typography
                sx={{
                  color: '#ffffff7d',
                  fontSize: '0.6rem',
                  marginTop: '0.1rem'
                }}
              >
                BE V{backendApiVersion}
              </Typography>
            </Box>
          )}
        </Stack>
      </Stack>
    </>
  )
}

export default DrawerContent
