import { ReactNode } from 'react'

import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import Link from '@mui/material/Link'
import BlankLayout from 'src/view/layout/BlankLayout'

const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    width: '90vw'
  }
}))

const Page404 = () => {
  return (
    <Box
      sx={{
        p: 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
      }}
    >
      <BoxWrapper>
        <Typography variant="h1" sx={{ mb: 2.5 }}>
          404
        </Typography>
        <Typography
          variant="h5"
          sx={{
            mb: 2.5,
            letterSpacing: '0.18px',
            fontSize: '1.5rem !important'
          }}
        >
          Page Not Found
        </Typography>
        <Typography variant="body2">
          We think you just went to a page non-existing page.
        </Typography>
      </BoxWrapper>
      <Button component={Link} href="/" variant="contained" sx={{ px: 5.5 }}>
        Back to Home
      </Button>
    </Box>
  )
}

Page404.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default Page404
