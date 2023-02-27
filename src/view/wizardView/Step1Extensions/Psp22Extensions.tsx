import { Dispatch, SetStateAction } from 'react'
import {
  Box,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
  styled
} from '@mui/material'

import { PSP22Fungible } from 'src/types/smartContract/tokens'

const StyledTextField = styled(TextField)(
  ({ theme }) => ({
    '& .MuiInputBase-input': {
      color: theme.palette.secondary.light,
    },
  })
)
export function Psp22Extensions({ dataForm, setDataForm }: { dataForm: PSP22Fungible, setDataForm: Dispatch<SetStateAction<PSP22Fungible>> }) {
  const onChangeMetadata = (key: 'active' | 'name' | 'symbol', value?: string) => {
    setDataForm((prev) => {
      const _value = value ?? !dataForm.metadata[key]
      const changed = { ...prev.metadata, [key]: _value }
      return { ...prev, metadata: { ...changed } }
    })
  }

  return (
    <>
      <FormControlLabel
        control={<Checkbox
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
              Metadata for [`PSP22`].
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
              Extension of [`PSP22`] that allows create `amount` tokens and
              assigns them to `account`, increasing the total supply.
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
              Extension of [`PSP22`] that allows token holders to destroy both
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
            checked={dataForm.wrapper}
            onChange={() => {
              setDataForm((prev) =>
                ({ ...prev, wrapper: !prev.wrapper })
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
              Wrapper
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontSize: '1.2rem', color: '#b1b1b1' }}
            >
              Extension of [`PSP22`] that allows you to wrap your PSP22 token in
              a PSP22Wrapper token which can be used for example for governance.
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
            checked={dataForm.flashMint}
            onChange={() => {
              setDataForm((prev) =>
                ({ ...prev, flashMint: !prev.flashMint })
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
              FlashMint
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontSize: '1.2rem', color: '#b1b1b1' }}
            >
              Extension of [`PSP22`] that allows the user to perform a flash
              loan on the token by minting the borrowed amount and then burning
              it along with fees for the loan.
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
            checked={dataForm.pausable}
            onChange={() => {
              setDataForm((prev) =>
                ({ ...prev, pausable: !prev.pausable })
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
              Pausable
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontSize: '1.2rem', color: '#b1b1b1' }}
            >
              Extension of [`PSP22`] that allows you to pause all token
              operations.
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
            checked={dataForm.capped}
            onChange={() => {
              setDataForm((prev) =>
                ({ ...prev, capped: !prev.capped })
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
              Capped
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontSize: '1.2rem', color: '#b1b1b1' }}
            >
              Extension of [`PSP22`] that allows you to implement with a supply
              cap, analogue to ERC20Capped.
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
