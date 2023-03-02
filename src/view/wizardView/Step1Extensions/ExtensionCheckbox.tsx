import { OptionTokenField } from '@constants'
import {
    TextField,
    styled,
    FormControlLabel,
    Checkbox,
    Typography
} from '@mui/material'

const StyledFormControlLabel = styled(FormControlLabel)(
    () => ({
        '& .MuiSvgIcon-root': { fontSize: 32 }
    })
)

export default function InputFieldExtension({ extension }: { extension: OptionTokenField }) {
    return (<StyledFormControlLabel
        control={<Checkbox
        // checked={dataForm.metadata.active}
        // onChange={() => {
        //     onChangeMetadata('active')
        // }}
        />}
        label={
            <>
                <Typography
                    variant="h3"
                    sx={{
                        fontSize: '1.7rem'
                    }}
                >
                    {extension.name}
                </Typography>
                <Typography
                    variant="body1"
                    sx={{ fontSize: '1.2rem', color: '#b1b1b1' }}
                >
                    {extension.tooltip}
                </Typography>
            </>
        }
    />)
}