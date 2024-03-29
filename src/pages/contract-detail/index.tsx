import { ContractDetailSkeleton } from '@/view/CustomContracts/detail/SkeletonContractDetail'
import MainContainer from '@/view/layout/MainContainer'
import ContractDetail from '@/view/ContractDetailView'
import { useRouter } from 'next/router'
import { useFindUserContract } from '@/hooks/userContracts/useFindUserContract'
import { useHasMounted } from '@/hooks/useHasMounted'

export default function CustomContractDetailPage() {
  const router = useRouter()
  const { uuid } = router.query
  const { userContract, requested, isLoading } = useFindUserContract(
    uuid as string
  )
  const hasMounted = useHasMounted()

  if (!userContract || !hasMounted || isLoading) {
    return <ContractDetailSkeleton />
  }

  if (!userContract && requested) {
    router.push('/404')
    return
  }

  return (
    <MainContainer>
      {userContract && <ContractDetail userContract={userContract} />}
    </MainContainer>
  )
}
