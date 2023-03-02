import { Dispatch, SetStateAction } from 'react'
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
import { PSP22Fungible, PSP34NonFungible, PSP37MultiToken } from 'src/types/smartContract/tokens'
import { ROUTES, TokenOptionConfig } from '@constants'
import { WIZARD_CONFIG } from '@constants'

export default function Step1Extensions({ optionFields }: { optionFields: TokenOptionConfig | undefined }) {
  const { dataForm, setDataForm, resetDataForm, handleNext } = useStepsSCWizard()
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

  return (
    <Stack sx={{ mt: 2, mb: 2 }}>
      <FormGroup sx={{ gap: 3 }}>
        {optionFields &&
          optionFields.controls.map((item, index) => {
            return (
              <h2 key={index}>item</h2>
            )
          })
        }

      </FormGroup>
      <BackNextButton handleBack={_handleBack} handleNext={handleNext} />
    </Stack>
  )
}
