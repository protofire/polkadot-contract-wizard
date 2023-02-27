import {
  Box,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
  styled
} from '@mui/material'
import { Dispatch, SetStateAction } from 'react'

import { PSP34NonFungible } from 'src/types/smartContract/tokens'

const StyledTextField = styled(TextField)(
  ({ theme }) => ({
    '& .MuiInputBase-input': {
      color: theme.palette.secondary.light,
    },
  })
)

export function Psp34Extensions({ dataForm, setDataForm }: { dataForm: PSP34NonFungible, setDataForm: Dispatch<SetStateAction<PSP34NonFungible>> }) {
  const onChangeMetadata = (key: 'active' | 'name' | 'symbol' | 'decimals', value?: string) => {
    setDataForm((prev) => {
      const _value = value ?? !dataForm.metadata[key]
      const changed = { ...prev.metadata, [key]: _value }
      return { ...prev, metadata: { ...changed } }
    })
  }

  return (
    <>
      <FormControlLabel
        control={
          <Checkbox

            checked={dataForm.metadata.active}
            onChange={() => {
              onChangeMetadata('active')
            }}
          />}
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
        {dataForm.metadata.active && (
          <>
            <StyledTextField id="outlined-basic" label="Name" variant="outlined" onChange={(event) => {
              onChangeMetadata('name', event.currentTarget.value)
            }} defaultValue={dataForm.metadata.name} disabled={!dataForm.metadata.active} />
            <StyledTextField id="outlined-basic2" label="Symbol" variant="outlined" defaultValue={dataForm.metadata.symbol}
              onChange={(event) => {
                onChangeMetadata('symbol', event.currentTarget.value)
              }}
            />
          </>
        )}
      </Box>
      <FormControlLabel
        control={
          <Checkbox
            checked={dataForm.mintable}
            onChange={() => {
              setDataForm((prev) =>
                ({ ...prev, mintable: !prev.mintable })
              )
            }}
          />
        }
        label={
          <>
            <Typography
              variant="h3"
              sx={{
                fontSize: '1.7rem'
              }}
            >
              Mintable
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
        checked={dataForm.burnable}
        control={
          <Checkbox
            checked={dataForm.burnable}
            onChange={() => {
              setDataForm((prev) =>
                ({ ...prev, burnable: !prev.burnable })
              )
            }}
          />
        }
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
        control={
          <Checkbox
            checked={dataForm.enumerable}
            onChange={() => {
              setDataForm((prev) =>
                ({ ...prev, enumerable: !prev.enumerable })
              )
            }}
          />
        }
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
