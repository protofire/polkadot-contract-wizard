import { useState } from 'react'
import {
  FormGroup,
  Stack,
} from '@mui/material'

import { DEFAULT_TOKEN_VALUES, useStepsSCWizard } from '@context'
import BackNextButton from '../BackNextButtons'
import { TokenType } from '@types'
import { Psp22Extensions } from './psp22Extensions'
import { Psp34Extensions } from './psp34Extensions'
import { Psp37Extensions } from './psp37Extensions'
import { PSP22Fungible, PSP34NonFungible, PSP37MultiToken } from 'src/types/smartContract/tokens'

export default function Step1Extensions({ tokenType }: { tokenType: TokenType }) {
  const { handleBack, handleNext } = useStepsSCWizard()
  const [dataForm, setDataForm] = useState(DEFAULT_TOKEN_VALUES[tokenType])


  const getExtensionFields = () => {
    switch (tokenType) {
      case 'psp22':
        return <Psp22Extensions dataForm={dataForm as PSP22Fungible} />

      case 'psp34':
        return <Psp34Extensions dataForm={dataForm as PSP34NonFungible} />

      case 'psp37':
        return <Psp37Extensions dataForm={dataForm as PSP37MultiToken} />

      default:
        return null
    }
  }

  return (
    <Stack sx={{ mt: 2, mb: 2 }}>
      <FormGroup sx={{ gap: 3 }}>
        {getExtensionFields()}
      </FormGroup>
      <BackNextButton handleBack={handleBack} handleNext={handleNext} />
    </Stack>
  )
}
