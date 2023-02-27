import {
  Box,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
  styled
} from '@mui/material'
import { Dispatch, SetStateAction } from 'react'
import { PSP37MultiToken } from 'src/types/smartContract/tokens'

const StyledTextField = styled(TextField)(
  ({ theme }) => ({
    '& .MuiInputBase-input': {
      color: theme.palette.secondary.light,
    },
  })
)

export function Psp37Extensions({ dataForm, setDataForm }: { dataForm: PSP37MultiToken, setDataForm: Dispatch<SetStateAction<PSP37MultiToken>> }) {
  const onChangeMetadata = (key: 'active' | 'name', value?: string) => {
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
              Metadata for [`PSP37`].
            </Typography>
          </>
        }
        sx={{
          '& .MuiSvgIcon-root': { fontSize: 32 }
        }}
      />
      {dataForm.metadata.active && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <StyledTextField id="outlined-basic" label="Name" variant="outlined"
            onChange={(event) => {
              onChangeMetadata('name', event.currentTarget.value)
            }} defaultValue={dataForm.metadata.name} disabled={!dataForm.metadata.active}
          />

        </Box>)
      }
      <FormControlLabel
        control={
          <Checkbox
            checked={dataForm.batch}
            onChange={() => {
              setDataForm((prev) =>
                ({ ...prev, batch: !prev.batch })
              )
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
              Batch
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontSize: '1.2rem', color: '#b1b1b1' }}
            >
              Extension of [`PSP37`] that allows you batch transfering tokens
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
            checked={dataForm.mintable}
            onChange={() => {
              setDataForm((prev) =>
                ({ ...prev, mintable: !prev.mintable })
              )
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
              Mintable
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontSize: '1.2rem', color: '#b1b1b1' }}
            >
              Extension of [`PSP37`] that allows minting of new tokens
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
            checked={dataForm.burnable}
            onChange={() => {
              setDataForm((prev) =>
                ({ ...prev, burnable: !prev.burnable })
              )
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
              Burnable
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontSize: '1.2rem', color: '#b1b1b1' }}
            >
              Extension of [`PSP37`] that allows token holders to destroy their tokens
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
          />}
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
              Extension of [`PSP37`] that allows you to iterate over tokens
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
