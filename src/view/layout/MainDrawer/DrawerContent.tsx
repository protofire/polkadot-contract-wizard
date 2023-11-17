import { useRouter } from 'next/router'
import Image from 'next/image'
import Navigation from './Navigation'
import SimpleBar from '@/view/components/third-party/SimpleBar'
import { LOGO_PROTOFIRE } from '@/constants/images'
import { Typography, Stack, Link, Box, Tooltip } from '@mui/material'
import TelegramIcon from '@mui/icons-material/Telegram'
import GithubIcon from '@mui/icons-material/GitHub'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined'
import { ROUTES } from '@/constants/routes'
import { DOCUMENTATION_URL } from '@/constants'

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
        <Typography variant="h6" mb={4}>
          <Link
            href={DOCUMENTATION_URL}
            underline="hover"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}
          >
            <InfoOutlinedIcon fontSize="small" sx={{ color: '#ffffff' }} />
            Documentation
            <OpenInNewOutlinedIcon
              fontSize="small"
              style={{ fontSize: 16 }}
              sx={{ color: '#848997' }}
            />
          </Link>
        </Typography>
        <Typography variant="h6" mb={4}>
          <Link
            href={ROUTES.TELEGRAM}
            underline="hover"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}
          >
            <TelegramIcon fontSize="small" sx={{ color: '#ffffff' }} />
            Need Help?
            <OpenInNewOutlinedIcon
              fontSize="small"
              style={{ fontSize: 16 }}
              sx={{ color: '#848997' }}
            />
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
        <Stack
          direction="row"
          justifyContent="space-evenly"
          alignContent="center"
          gap="1rem"
        >
          <Tooltip title="Check our Github repository.">
            <Link
              href={ROUTES.GITHUB}
              underline="hover"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <GithubIcon fontSize="small" sx={{ color: '#ffffff' }} />
            </Link>
          </Tooltip>
          {version && (
            <Box display="flex" justifyContent={'right'} pr={'1rem'}>
              <Typography
                sx={{
                  color: '#ffffff7d',
                  fontSize: '0.65rem',
                  marginTop: '0.2rem'
                }}
              >
                UI V{version}
              </Typography>
            </Box>
          )}
          {backendApiVersion && (
            <Box display="flex" justifyContent={'right'} pr={'1rem'}>
              <Typography
                sx={{
                  color: '#ffffff7d',
                  fontSize: '0.65rem',
                  marginTop: '0.2rem'
                }}
              >
                API V{backendApiVersion}
              </Typography>
            </Box>
          )}
        </Stack>
      </Stack>
    </>
  )
}

export default DrawerContent
