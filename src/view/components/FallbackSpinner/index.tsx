import { Typography } from '@mui/material'
import Box, { BoxProps } from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Image from 'next/image'

interface Props extends BoxProps {
  text?: string
}

export const FallbackSpinner = (props: Props) => {
  const { text, sx } = props

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        ...sx
      }}
    >
      <Image src="/favicon.ico" alt="favicon starts" width={30} height={30} />
      <CircularProgress disableShrink sx={{ mt: 6 }} />
      {text ? (
        <Box
          sx={{
            paddingTop: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Typography variant="caption" component="div" color="text.secondary">
            {text}
          </Typography>
        </Box>
      ) : null}
    </Box>
  )
}
