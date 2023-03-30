import { Box } from '@mui/material'
import { useRouter } from 'next/router'

import FormWizard from 'src/view/wizardView'
import { isOfTypeTokens } from '@types'
import LoadingSpinner from 'src/view/components/LoadingSpinner'
import { HeadLine } from 'src/view/components/HeadLine'
import {
  DeployContextProvider,
  StorageDeploysRepository
} from 'src/context/SCDeployedContext'

const repositoryDeploys = new StorageDeploysRepository()

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
      <DeployContextProvider repository={repositoryDeploys}>
        <HeadLine tokenType={token} />
        <FormWizard token={token} />
      </DeployContextProvider>
    </Box>
  )
}
