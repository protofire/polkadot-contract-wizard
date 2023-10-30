import { useFindUserContract } from '@/hooks/userContracts/useFindUserContract'
import { ContractDetailSkeleton } from '@/view/CustomContracts/detail/SkeletonContractDetail'
import MainContainer from '@/view/layout/MainContainer'
import { useRouter } from 'next/router'
import ContractDetail from './contract-detail'
import { useModalBehaviour } from '@/hooks/useModalBehaviour'
import { useHasMounted } from '@/hooks/useHasMounted'

const CustomContractDetail: React.FC = () => {
  const router = useRouter()
  const { uuid } = router.query
  const { userContract, requested, isLoading } = useFindUserContract(
    uuid as string
  )
  const modalBehaviour = useModalBehaviour()
  const hasMounted = useHasMounted()

  if (!userContract || !hasMounted || isLoading) {
    return <ContractDetailSkeleton />
  }

  if (!userContract && requested) {
    router.push('/404')
  }

  return (
    <MainContainer>
      <ContractDetail
        modalBehaviour={modalBehaviour}
        userContract={userContract}
      />
    </MainContainer>
  )
}

export default CustomContractDetail
