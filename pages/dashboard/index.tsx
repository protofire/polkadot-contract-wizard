import { Box, Link, Stack, Typography } from '@mui/material'
import Image from 'next/image'

const ImageResponsive = ({ alt, src }: { alt: string; src: string }) => {
  return (
    <Image
      alt={alt}
      src={src}
      width={0}
      height={0}
      sizes="100vw"
      style={{ width: '100%', height: 'auto' }}
    />
  )
}

export default function Dashboard() {
  return (
    <Box
      sx={{
        width: { sm: '90%', md: '75%', lg: '80%', xl: '60%' },
        margin: '0 auto 2rem auto'
      }}
    >
      <Typography variant="h1" align="center">
        Dashboard
      </Typography>
      <Stack mt={8} flexDirection="column" gap={4} justifyContent={'center'}>
        <Typography variant="h3">Sample title</Typography>
        <Typography variant="body1">
          The Polkadot Contract Wizard is a non-code tool to generate, compile
          and deploy smart contracts on Polkadot Ecosystem. It provides{' '}
          <Link
            href="https://github.com/w3f/PSPs"
            underline="hover"
            target="_blank"
            rel="noopener noreferrer"
          >
            standard contracts based on PSP.
          </Link>
        </Typography>
      </Stack>
    </Box>
  )
}
