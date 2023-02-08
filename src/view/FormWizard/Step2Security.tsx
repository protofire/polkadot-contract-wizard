import { FormControl, FormControlLabel, Radio, RadioGroup, Stack, Typography } from "@mui/material";

export default function Step2Security() {
    return (
        <Stack sx={{ mt: 2, mb: 2 }}>
            <FormControl>
                <RadioGroup
                    aria-labelledby="security"
                    defaultValue="none"
                    name="radio-buttons-group"
                    sx={{ gap: 3 }}
                >
                    <FormControlLabel
                        control={<Radio />}
                        label={
                            <>
                                <Typography
                                    variant="h3"
                                    sx={{
                                        fontSize: '1.7rem',
                                    }}
                                >
                                    None
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{ fontSize: '1.2rem', color: '#b1b1b1' }}
                                >
                                    Sample content for None value.
                                </Typography>
                            </>
                        }
                        value="none"
                        sx={{
                            '& .MuiSvgIcon-root': { fontSize: 32 },
                        }}
                    />

                    <FormControlLabel
                        control={<Radio />}
                        label={
                            <>
                                <Typography
                                    variant="h3"
                                    sx={{
                                        fontSize: '1.7rem',
                                    }}
                                >
                                    Ownable
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{ fontSize: '1.2rem', color: '#b1b1b1' }}
                                >
                                    Sample content for Ownable value.
                                </Typography>
                            </>
                        }
                        value="Ownable"
                        sx={{
                            '& .MuiSvgIcon-root': { fontSize: 32 },
                        }}
                    />
                    <FormControlLabel
                        control={<Radio />}
                        label={
                            <>
                                <Typography
                                    variant="h3"
                                    sx={{
                                        fontSize: '1.7rem',
                                    }}
                                >
                                    Access Control
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{ fontSize: '1.2rem', color: '#b1b1b1' }}
                                >
                                    Sample content for Access Control value.
                                </Typography>
                            </>
                        }
                        value="access_control"
                        sx={{
                            '& .MuiSvgIcon-root': { fontSize: 32 },
                        }}
                    />
                    <FormControlLabel
                        control={<Radio />}
                        label={
                            <>
                                <Typography
                                    variant="h3"
                                    sx={{
                                        fontSize: '1.7rem',
                                    }}
                                >
                                    Access Control Enumerable
                                </Typography>{' '}
                                <Typography
                                    variant="body1"
                                    sx={{ fontSize: '1.2rem', color: '#b1b1b1' }}
                                >
                                    Sample content for Access Control Enumerable value.
                                </Typography>
                            </>
                        }
                        value="access_control_enumerable"
                        sx={{
                            '& .MuiSvgIcon-root': { fontSize: 32 },
                        }}
                    />
                </RadioGroup>
            </FormControl>
        </Stack>

    )
}