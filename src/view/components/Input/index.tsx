import {
    TextField,
    styled
} from '@mui/material'

const StyledTextField = styled(TextField)(
    ({ theme }) => ({
        '& .MuiInputBase-input': {
            color: theme.palette.secondary.light,
        },
    })
)

export default StyledTextField
