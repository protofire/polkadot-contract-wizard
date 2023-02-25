import { Dispatch, SetStateAction, useState } from 'react'
import {
  FormGroup,
  Stack,
} from '@mui/material'
import { useRouter } from 'next/router'

import { DEFAULT_TOKEN_VALUES, useStepsSCWizard } from '@context'
import BackNextButton from '../BackNextButtons'
import { TokenType } from '@types'
import { Psp22Extensions } from './Psp22Extensions'
import { Psp34Extensions } from './Psp34Extensions'
import { Psp37Extensions } from './Psp37Extensions'
import { PSP22Fungible, PSP34NonFungible, PSP37MultiToken } from 'src/types/smartContract/tokens'
import { ROUTES } from '@constants'

export default function Step1Extensions({ tokenType }: { tokenType: TokenType }) {
  const { handleNext } = useStepsSCWizard()
  const { dataForm, setDataForm } = useStepsSCWizard()
  const router = useRouter()

  const _handleBack = () => {
    router.push(ROUTES.HOME)
    setDataForm(DEFAULT_TOKEN_VALUES[tokenType])
  }

  const getExtensionFields = () => {
    switch (tokenType) {
      case 'psp22':
        return <Psp22Extensions dataForm={dataForm as PSP22Fungible} setDataForm={setDataForm as Dispatch<SetStateAction<PSP22Fungible>>} />

      case 'psp34':
        return <Psp34Extensions dataForm={dataForm as PSP34NonFungible} setDataForm={setDataForm as Dispatch<SetStateAction<PSP34NonFungible>>} />

      case 'psp37':
        return <Psp37Extensions dataForm={dataForm as PSP37MultiToken} setDataForm={setDataForm as Dispatch<SetStateAction<PSP37MultiToken>>} />

      default:
        return null
    }
  }

  return (
    <Stack sx={{ mt: 2, mb: 2 }}>
      <FormGroup sx={{ gap: 3 }}>
        {getExtensionFields()}
      </FormGroup>
      <BackNextButton handleBack={_handleBack} handleNext={handleNext} />
    </Stack>
  )
}
