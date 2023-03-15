import { FormGroup, Grid, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router'

import { useStepsSCWizard } from '@context'
import BackNextButton from '../BackNextButtons'
import { ControlsToken, ROUTES } from '@constants'
import ExtensionCheckbox from './ExtensionCheckbox'
import Security from './Security'

export default function Step1Extensions({
  extensionFields
}: {
  extensionFields: ControlsToken
  constructorFields?: ControlsToken
}) {
  const { dataForm, setDataForm, resetDataForm, handleNext } =
    useStepsSCWizard()
  const router = useRouter()

  const _handleBack = () => {
    router.push(ROUTES.HOME)
    resetDataForm()
  }

  const onChangeExtensions = (key: string) => {
    setDataForm(prev => {
      const changed = { ...prev.extensions, [key]: !prev.extensions[key] }
      return { ...prev, extensions: changed }
    })
  }

  if (!extensionFields) return null

  return (
    <>
      <Grid container columns={{ xs: 12, md: 12 }} spacing={6}>
        <Grid item sm={12} md={8}>
          <Typography variant="h3">Functionalities</Typography>
          <Stack sx={{ mt: 2, mb: 2 }}>
            <FormGroup sx={{ gap: 3 }}>
              {extensionFields &&
                extensionFields.optionList.map((extension, index) => {
                  return (
                    <ExtensionCheckbox
                      key={index}
                      checked={
                        dataForm.extensions[extension.name] ? true : false
                      }
                      extension={extension}
                      onChange={() => onChangeExtensions(extension.name)}
                    />
                  )
                })}
            </FormGroup>
          </Stack>
        </Grid>
        <Grid item sm={12} md={4}>
          <Typography variant="h3">Security</Typography>
          <Security />
        </Grid>
      </Grid>
      <BackNextButton handleBack={_handleBack} handleNext={handleNext} />
    </>
  )
}
