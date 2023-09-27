import { Box } from '@mui/material'
import { useRouter } from 'next/router'

import FormWizard from '@/view/wizardView'
import { isOfTypeTokens } from '@/domain'
import LoadingSpinner from '@/view/components/LoadingSpinner'
import { HeadLine } from '@/view/components/HeadLine'

export default function WizardPage() {
  const router = useRouter()
  const { token } = router.query

  if (!router.isReady) return <LoadingSpinner />

  if (!token || Array.isArray(token) || !isOfTypeTokens(token)) {
    typeof window !== 'undefined' && router.push('/404')
    return null
  }

  return (
    <Box>
      <HeadLine tokenType={token} />
      <FormWizard token={token} />
    </Box>
  )
}
