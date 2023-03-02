import { Box, CircularProgress } from "@mui/material"

const LoadingSpinner = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                height: '100vh',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <CircularProgress color='primary' />
        </Box>
    )
}

export default LoadingSpinner

