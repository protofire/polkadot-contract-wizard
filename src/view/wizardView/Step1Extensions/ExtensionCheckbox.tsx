import { OptionTokenField } from '@constants'
import {
  styled,
  FormControlLabel,
  Checkbox,
  Typography,
  CheckboxProps
} from '@mui/material'

const StyledFormControlLabel = styled(FormControlLabel)(() => ({
  '& .MuiSvgIcon-root': { fontSize: 32 }
}))

export default function InputFieldExtension({
  extension,
  checked,
  onChange
}: { extension: OptionTokenField } & CheckboxProps) {
  return (
    <StyledFormControlLabel
      control={<Checkbox checked={checked} onChange={onChange} />}
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
    />
  )
}
