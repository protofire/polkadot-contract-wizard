import { styled } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'
import React from 'react'

const BlankLayoutWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  height: '100vh',
  display: 'flex',
  minHeight: '100vh',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(5)
}))

const BlankLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <BlankLayoutWrapper>
      <Box
        className="app-content"
        sx={{ minHeight: '100vh', overflowX: 'hidden', position: 'relative' }}
      >
        {children}
      </Box>
    </BlankLayoutWrapper>
  )
}

export default BlankLayout
