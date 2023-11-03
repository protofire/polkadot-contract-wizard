import { UserContractDetails } from '@/domain'
import { UserContractTableItem } from '@/domain/wizard/ContractTableItem'
import { useFillMetadata } from '@/hooks/userContracts/useUpdateUserContracts'
import { downloadMetadata } from '@/utils/downloadMetadata'
import { useCallback, useEffect, useState } from 'react'

interface UseDownloadMetadata {
  userContractItems: UserContractTableItem[] | undefined
  onDownloadSource: (userContract: UserContractTableItem) => void
}

function updateContractItem(
  uuid: UserContractDetails['uuid'],
  contractsItem: UserContractTableItem[] | undefined,
  contractDataUpdated: Pick<UserContractTableItem, 'isDownloading'>
) {
  const index = contractsItem?.findIndex(item => item.uuid === uuid)

  if (index && contractsItem) {
    contractsItem[index] = {
      ...contractsItem[index],
      ...contractDataUpdated
    }
  }

  return contractsItem
}

export function useDownloadMetadata(
  userContracts: UserContractDetails[] | undefined
): UseDownloadMetadata {
  const [userContractItems, setUserContractItems] = useState<
    UserContractTableItem[] | undefined
  >(userContracts)
  const { fillMetadata } = useFillMetadata()

  useEffect(() => setUserContractItems(userContracts), [userContracts])

  const setIsDownloading = useCallback(
    (suffix: string, isDownloading = true) => {
      setUserContractItems(prev =>
        updateContractItem(suffix, prev, { isDownloading })
      )
    },
    []
  )

  const onDownloadSource = useCallback(
    async (userContract: UserContractTableItem) => {
      setIsDownloading(userContract.uuid)
      if (userContract.abi) {
        downloadMetadata(userContract.uuid, JSON.stringify(userContract.abi))
        setIsDownloading(userContract.uuid, false)
        return
      }

      const metadataString = await fillMetadata(userContract)
      if (metadataString) {
        downloadMetadata(userContract.uuid, JSON.stringify(metadataString))
        setIsDownloading(userContract.uuid, false)
        return
      }
    },
    [fillMetadata, setIsDownloading]
  )

  return { userContractItems, onDownloadSource }
}
