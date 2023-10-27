import { useEffect, useState } from 'react'
import { ContractsTable } from '@/view/HomeView/ContractsTableWidget/ContractsTable'
import { useSearchCompileContract } from '@/hooks'
import { UserContractDetails } from '@/domain'
import { ContractTableItem } from '@/domain/wizard/ContractTableItem'
import { downloadMetadata } from '@/utils/downloadMetadata'

function updateContractItem(
  codeId: string,
  contractsItem: ContractTableItem[],
  contractDataUpdated: Pick<
    ContractTableItem,
    'isDownloading' | 'sourceJsonString'
  >
) {
  const index = contractsItem.findIndex(item => item.codeId === codeId)

  if (index) {
    contractsItem[index] = {
      ...contractsItem[index],
      ...contractDataUpdated
    }
  }

  return contractsItem
}

export function ContractsTableWidget({
  contracts
}: {
  contracts: UserContractDetails[]
}) {
  const { searchCompileContract } = useSearchCompileContract()
  const [contractsItem, setContractsItem] =
    useState<ContractTableItem[]>(contracts)

  useEffect(() => setContractsItem(contracts), [contracts])

  const onDownloadSource = async (codeId: string) => {
    setContractsItem(prev =>
      updateContractItem(codeId, prev, { isDownloading: true })
    )
    const sourceMetadata = await searchMetadata(codeId)

    sourceMetadata && downloadMetadata(codeId, sourceMetadata)
    setContractsItem(prev =>
      updateContractItem(codeId, prev, { isDownloading: false })
    )
  }

  const searchMetadata = async (codeId: string): Promise<string | void> => {
    const contractWithMeta = contractsItem.find(
      contract => contract.codeId === codeId && contract.sourceJsonString
    )

    if (contractWithMeta) return contractWithMeta.sourceJsonString

    const result = await searchCompileContract(codeId)
    if (result) {
      setContractsItem(prev =>
        updateContractItem(codeId, prev, { sourceJsonString: result.metadata })
      )
      return result.metadata
    }
  }

  return (
    <ContractsTable
      contracts={contractsItem}
      onDownloadMeta={onDownloadSource}
    />
  )
}
