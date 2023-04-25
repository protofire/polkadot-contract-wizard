import { Box } from '@mui/material'
import { useRouter } from 'next/router'

import FormWizard from 'src/view/wizardView'
import { isOfTypeTokens } from '@/types'
import LoadingSpinner from 'src/view/components/LoadingSpinner'
import { HeadLine } from 'src/view/components/HeadLine'

export default function WizardPage() {
  const router = useRouter()
  const { token } = router.query

  if (!router.isReady) return <LoadingSpinner />

  if (!token || Array.isArray(token) || !isOfTypeTokens(token)) {
    typeof window !== 'undefined' && router.push('/404')
    return null
  }

  return (
    <Box
      sx={{
        width: { lg: '100%', xl: '85%' },
        margin: '0 auto 1rem auto'
      }}
    >
      <HeadLine tokenType={token} />
      <FormWizard token={token} />
    </Box>
  )
}
