import {
    Box,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Stack,
    TextField,
    Typography
} from '@mui/material'

export default function Step1Extensions() {
    return (
        <Stack sx={{ mt: 2, mb: 2 }}>
            <FormGroup sx={{ gap: 3 }}>
                <FormControlLabel
                    control={<Checkbox />}
                    label={
                        <>
                            <Typography
                                variant="h3"
                                sx={{
                                    fontSize: '1.7rem',
                                }}
                            >
                                Metadata
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{ fontSize: '1.2rem', color: '#b1b1b1' }}
                            >
                                Metadata for [`PSP22`].
                            </Typography>
                        </>
                    }
                    sx={{
                        '& .MuiSvgIcon-root': { fontSize: 32 },
                    }}
                />
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    <TextField id="outlined-basic" label="Name" variant="outlined" />
                    <TextField id="outlined-basic2" label="Symbol" variant="outlined" />
                    <TextField id="outlined-basic3" label="Decimals" variant="outlined" />
                </Box>
                <FormControlLabel
                    control={<Checkbox />}
                    label={
                        <>
                            <Typography
                                variant="h3"
                                sx={{
                                    fontSize: '1.7rem',
                                }}
                            >
                                Minteable
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{ fontSize: '1.2rem', color: '#b1b1b1' }}
                            >
                                Extension of [`PSP22`] that allows create `amount` tokens and
                                assigns them to `account`, increasing the total supply.
                            </Typography>
                        </>
                    }
                    sx={{
                        '& .MuiSvgIcon-root': { fontSize: 32 },
                    }}
                />
                <FormControlLabel
                    control={<Checkbox />}
                    label={
                        <>
                            <Typography
                                variant="h3"
                                sx={{
                                    fontSize: '1.7rem',
                                }}
                            >
                                Burnable
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{ fontSize: '1.2rem', color: '#b1b1b1' }}
                            >
                                Extension of [`PSP22`] that allows token holders to destroy both
                                their own tokens and those that they have an allowance for.
                            </Typography>
                        </>
                    }
                    sx={{
                        '& .MuiSvgIcon-root': { fontSize: 32 },
                    }}
                />
                <FormControlLabel
                    control={<Checkbox />}
                    label={
                        <>
                            <Typography
                                variant="h3"
                                sx={{
                                    fontSize: '1.7rem',
                                }}
                            >
                                Wrapper
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{ fontSize: '1.2rem', color: '#b1b1b1' }}
                            >
                                Extension of [`PSP22`] that allows you to wrap your PSP22 token
                                in a PSP22Wrapper token which can be used for example for
                                governance.
                            </Typography>
                        </>
                    }
                    sx={{
                        '& .MuiSvgIcon-root': { fontSize: 32 },
                    }}
                />
                <FormControlLabel
                    control={<Checkbox />}
                    label={
                        <>
                            <Typography
                                variant="h3"
                                sx={{
                                    fontSize: '1.7rem',
                                }}
                            >
                                FlashMint
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{ fontSize: '1.2rem', color: '#b1b1b1' }}
                            >
                                Extension of [`PSP22`] that allows the user to perform a flash
                                loan on the token by minting the borrowed amount and then
                                burning it along with fees for the loan.
                            </Typography>
                        </>
                    }
                    sx={{
                        '& .MuiSvgIcon-root': { fontSize: 32 },
                    }}
                />
                <FormControlLabel
                    control={<Checkbox />}
                    label={
                        <>
                            <Typography
                                variant="h3"
                                sx={{
                                    fontSize: '1.7rem',
                                }}
                            >
                                Pausable
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{ fontSize: '1.2rem', color: '#b1b1b1' }}
                            >
                                Extension of [`PSP22`] that allows you to pause all token
                                operations.
                            </Typography>
                        </>
                    }
                    sx={{
                        '& .MuiSvgIcon-root': { fontSize: 32 },
                    }}
                />
                <FormControlLabel
                    control={<Checkbox />}
                    label={
                        <>
                            <Typography
                                variant="h3"
                                sx={{
                                    fontSize: '1.7rem',
                                }}
                            >
                                Capped
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{ fontSize: '1.2rem', color: '#b1b1b1' }}
                            >
                                Extension of [`PSP22`] that allows you to implement with a
                                supply cap, analogue to ERC20Capped.
                            </Typography>
                        </>
                    }
                    sx={{
                        '& .MuiSvgIcon-root': { fontSize: 32 },
                    }}
                />
            </FormGroup>
        </Stack>
    )
}
