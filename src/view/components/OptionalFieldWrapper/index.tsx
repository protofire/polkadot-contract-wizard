import { Box, FormControlLabel, Switch, TextField } from '@mui/material'
import React, { PropsWithChildren } from 'react'

interface OptionalFieldProps extends PropsWithChildren {
  label?: string
  isToggled: boolean
  toggle: () => void
}

export const OptionalFieldWrapper: React.FC<OptionalFieldProps> = ({
  children,
  label = 'Optional Input',
  isToggled,
  toggle
}) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <FormControlLabel
          control={<Switch checked={isToggled} onChange={toggle} />}
          label=""
        />
      </Box>
      {isToggled ? (
        children
      ) : (
        <>
          <TextField
            fullWidth
            disabled
            placeholder="Do not Supply"
            InputLabelProps={{ shrink: true }}
            label={label}
          />
        </>
      )}
    </Box>
  )
}
