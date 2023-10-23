import { Box } from '@mui/material'

const MainContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      sx={{
        width: { sm: '90%', md: '75%', lg: '100%', xl: '75%' },
        margin: { lg: '1rem auto 2rem auto', xl: '2rem auto 2rem auto' }
      }}
    >
      {children}
    </Box>
  )
}

export default MainContainer
