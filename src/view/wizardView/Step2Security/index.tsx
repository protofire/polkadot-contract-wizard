import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography
} from '@mui/material'

import { useStepsSCWizard } from '@context'
import BackNextButton from '../BackNextButtons'
import { SecurityOfToken } from 'src/types/smartContract/tokens'

export default function Step2Security() {
  const { handleBack, handleNext, dataForm, setDataForm } = useStepsSCWizard()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === 'none') {
      const newDataForm = { ...dataForm }
      delete newDataForm.security
      setDataForm(newDataForm)
    }

    setDataForm((prev) => ({ ...prev, security: event.target.value as SecurityOfToken }))
  }

  return (
    <Stack sx={{ mt: 2, mb: 2 }}>
      <FormControl>
        <RadioGroup
          aria-labelledby="security"
          value={dataForm.security ?? 'none'}
          onChange={handleChange}
          name="radio-buttons-group"
          sx={{ gap: 3 }}
        >
          <FormControlLabel
            control={
              <Radio />}
            label={
              <>
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: '1.7rem'
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
              '& .MuiSvgIcon-root': { fontSize: 32 }
            }}
          />

          <FormControlLabel
            control={<Radio />}
            label={
              <>
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: '1.7rem'
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
            value="ownable"
            sx={{
              '& .MuiSvgIcon-root': { fontSize: 32 }
            }}
          />
          <FormControlLabel
            control={<Radio />}
            label={
              <>
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: '1.7rem'
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
              '& .MuiSvgIcon-root': { fontSize: 32 }
            }}
          />
          <FormControlLabel
            control={<Radio />}
            label={
              <>
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: '1.7rem'
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
              '& .MuiSvgIcon-root': { fontSize: 32 }
            }}
          />
        </RadioGroup>
      </FormControl>
      <BackNextButton handleBack={handleBack} handleNext={handleNext} />
    </Stack >
  )
}
