import {
  FormControlLabel,
  Checkbox,
  Typography,
  CheckboxProps
} from '@mui/material'
import { styled } from '@mui/material/styles'

import { OptionTokenField } from '@/constants/index'

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
              fontSize: '1.4rem'
            }}
          >
            {extension.name}
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontSize: '1rem', color: '#b1b1b1' }}
          >
            {extension.tooltip}
          </Typography>
        </>
      }
    />
  )
}
