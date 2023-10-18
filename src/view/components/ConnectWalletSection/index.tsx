import { Box, Paper, Typography } from '@mui/material'
import { TypographyStyled } from './styled'

interface ConnectWalletSectionProps {
  text: Array<string> | string
}

export function ConnectWalletSection({ text }: ConnectWalletSectionProps) {
  return (
    <Box
      sx={{
        margin: '5rem'
      }}
    >
      <Paper
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: '870px',
          minWidth: '700px',
          height: '343px',
          margin: '0 auto',
          borderRadius: '15px',
          color: '#ffff'
        }}
      >
        <Typography fontSize={'1.5rem'} mb={5}>
          ⚠️ Wallet not connected
        </Typography>

        {Array.isArray(text) ? (
          text.map((t, key) => (
            <TypographyStyled key={key}>{t}</TypographyStyled>
          ))
        ) : (
          <TypographyStyled>{text}</TypographyStyled>
        )}
      </Paper>
    </Box>
  )
}
