import React from 'react'
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography
} from '@mui/material'

import { useStepsSCWizard } from '@/context'
import { SecurityOfToken } from '@/domain'

export default function Security() {
  const { dataForm, setDataForm } = useStepsSCWizard()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === 'none') {
      const newDataForm = { ...dataForm }
      delete newDataForm.security
      setDataForm(newDataForm)
    }

    setDataForm(prev => ({
      ...prev,
      security: event.target.value as SecurityOfToken
    }))
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
            control={<Radio />}
            label={
              <>
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: '1.4rem'
                  }}
                >
                  None
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ fontSize: '1rem', color: '#b1b1b1' }}
                >
                  {/* security for your contract. */}
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
                    fontSize: '1.4rem'
                  }}
                >
                  Ownable
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ fontSize: '1rem', color: '#b1b1b1' }}
                >
                  A single account authorized for all privileged actions.
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
                    fontSize: '1.4rem'
                  }}
                >
                  Access Control
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ fontSize: '1rem', color: '#b1b1b1' }}
                >
                  Allows to implement role-based access control mechanisms.
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
                    fontSize: '1.4rem'
                  }}
                >
                  Access Control Enumerable
                </Typography>{' '}
                <Typography
                  variant="body1"
                  sx={{ fontSize: '1rem', color: '#b1b1b1' }}
                >
                  Allows to implement role-based access control mechanisms with
                  a unique identifier.
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
    </Stack>
  )
}
