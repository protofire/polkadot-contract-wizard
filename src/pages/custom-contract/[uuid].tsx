import { GetServerSidePropsContext } from 'next'
import { ContractDetailSkeleton } from '@/view/CustomContracts/detail/SkeletonContractDetail'
import MainContainer from '@/view/layout/MainContainer'
import ContractDetail from './contract-detail'
import { useModalBehaviour } from '@/hooks/useModalBehaviour'
import { UserContractDetails } from '@/domain'
import { fetchContractByUUID } from '@/services/backendApi/find/fetchContractByUUID'

interface Props {
  userContract: UserContractDetails
}

export default function CustomContractDetailPage({ userContract }: Props) {
  const modalBehaviour = useModalBehaviour()

  if (!userContract) {
    return <ContractDetailSkeleton />
  }

  return (
    <MainContainer>
      {userContract && (
        <ContractDetail
          modalBehaviour={modalBehaviour}
          userContract={userContract}
        />
      )}
    </MainContainer>
  )
}

export async function getServerSideProps({
  params
}: GetServerSidePropsContext) {
  const uuid = params?.uuid

  if (typeof uuid !== 'string') {
    return {
      notFound: true
    }
  }

  const userContract = await fetchContractByUUID(uuid)

  if (!userContract) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      userContract
    }
  }
}
