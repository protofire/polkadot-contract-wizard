import {
  FormGroup,
  Stack,
} from '@mui/material'
import { useRouter } from 'next/router'

import { useStepsSCWizard } from '@context'
import BackNextButton from '../BackNextButtons'
import { ControlsToken, ROUTES } from '@constants'
import ExtensionCheckbox from './ExtensionCheckbox'

export default function Step1Extensions({ extensionFields }: { extensionFields: ControlsToken, constructorFields?: ControlsToken }) {
  const { dataForm, setDataForm, resetDataForm, handleNext } = useStepsSCWizard()
  const router = useRouter()

  const _handleBack = () => {
    router.push(ROUTES.HOME)
    resetDataForm()
  }

  const onChangeExtensions = (key: string) => {
    setDataForm((prev) => {
      const changed = { ...prev.extensions, [key]: !prev.extensions[key] }
      return { ...prev, extensions: changed }
    })
  }

  if (!extensionFields) return null

  return (
    <Stack sx={{ mt: 2, mb: 2 }}>
      <FormGroup sx={{ gap: 3 }}>
        {extensionFields &&
          extensionFields.optionList.map((extension, index) => {
            return (
              <ExtensionCheckbox key={index} checked={dataForm.extensions[extension.name] ? true : false}
                extension={extension} onChange={() => onChangeExtensions(extension.name)} />
            )
          })
        }
      </FormGroup>
      <BackNextButton handleBack={_handleBack} handleNext={handleNext} />
    </Stack>
  )
}
