import { Box } from '@mui/material'
import { useRouter } from 'next/router'

import FormWizard from 'src/view/wizardView'
import { isOfTypeTokens } from '@types'

export default function WizardPage() {
  const router = useRouter()
  const { token } = router.query

  if (!token || Array.isArray(token) || !isOfTypeTokens(token)) {
    typeof window !== 'undefined' && router.push('/404')
    return null
  }

  return (
    <Box>
      <h1>{token}</h1>
      <FormWizard token={token} />
    </Box>
  )
}
