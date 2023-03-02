import { useMemo } from 'react'
import {
  FormGroup,
  Stack,
} from '@mui/material'
import { useRouter } from 'next/router'

import { useStepsSCWizard } from '@context'
import BackNextButton from '../BackNextButtons'
import { TokenType } from '@types'
import { Psp22Extensions } from './Psp22Extensions'
import { Psp34Extensions } from './Psp34Extensions'
import { Psp37Extensions } from './Psp37Extensions'
import { ROUTES, TokenOptionConfig } from '@constants'
import ExtensionCheckbox from './ExtensionCheckbox'

export default function Step1Extensions({ optionFields }: { optionFields: TokenOptionConfig | undefined }) {
  const { dataForm, setDataForm, resetDataForm, handleNext } = useStepsSCWizard()
  const extensionFields = useMemo(() => optionFields?.controls.find((options) => options.sectionName === 'Extensions'), [optionFields])
  const router = useRouter()

  const _handleBack = () => {
    router.push(ROUTES.HOME)
    resetDataForm()
  }

  // const getExtensionFields = () => {
  //   switch (tokenType) {
  //     case 'psp22':
  //       return <Psp22Extensions dataForm={dataForm as PSP22Fungible} setDataForm={setDataForm as Dispatch<SetStateAction<PSP22Fungible>>} />

  //     default:
  //       return null
  //   }
  // }

  console.log('__dataForm', dataForm)
  return (
    <Stack sx={{ mt: 2, mb: 2 }}>
      <FormGroup sx={{ gap: 3 }}>
        {extensionFields &&
          extensionFields.optionList.map((extension, index) => {
            return (
              <ExtensionCheckbox key={index} extension={extension} />
            )
          })
        }

      </FormGroup>
      <BackNextButton handleBack={_handleBack} handleNext={handleNext} />
    </Stack>
  )
}
