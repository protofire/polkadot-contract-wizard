import {
    Box,
    Checkbox,
    FormControlLabel,
    TextField,
    Typography
} from '@mui/material'

import { PSP34NonFungible } from 'src/types/smartContract/tokens'

export function Psp34Extensions({ dataForm }: { dataForm: PSP34NonFungible }) {
    return (
        <>
            <FormControlLabel
                control={<Checkbox />}
                label={
                    <>
                        <Typography
                            variant="h3"
                            sx={{
                                fontSize: '1.7rem'
                            }}
                        >
                            Metadata
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{ fontSize: '1.2rem', color: '#b1b1b1' }}
                        >
                            Metadata for [`PSP34`].
                        </Typography>
                    </>
                }
                sx={{
                    '& .MuiSvgIcon-root': { fontSize: 32 }
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
                                fontSize: '1.7rem'
                            }}
                        >
                            Minteable
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{ fontSize: '1.2rem', color: '#b1b1b1' }}
                        >
                            Extension of [`PSP34`] that allows create `amount` tokens and
                            assigns them to `account`, increasing the total supply.
                        </Typography>
                    </>
                }
                sx={{
                    '& .MuiSvgIcon-root': { fontSize: 32 }
                }}
            />
            <FormControlLabel
                control={<Checkbox />}
                label={
                    <>
                        <Typography
                            variant="h3"
                            sx={{
                                fontSize: '1.7rem'
                            }}
                        >
                            Burnable
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{ fontSize: '1.2rem', color: '#b1b1b1' }}
                        >
                            Extension of [`PSP34`] that allows token holders to destroy both
                            their own tokens and those that they have an allowance for.
                        </Typography>
                    </>
                }
                sx={{
                    '& .MuiSvgIcon-root': { fontSize: 32 }
                }}
            />
            <FormControlLabel
                control={<Checkbox />}
                label={
                    <>
                        <Typography
                            variant="h3"
                            sx={{
                                fontSize: '1.7rem'
                            }}
                        >
                            Enumerable
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{ fontSize: '1.2rem', color: '#b1b1b1' }}
                        >
                            Extension of [`PSP34`] that allows to iterate over all NTFs.
                        </Typography>
                    </>
                }
                sx={{
                    '& .MuiSvgIcon-root': { fontSize: 32 }
                }}
            />
        </>
    )
}
