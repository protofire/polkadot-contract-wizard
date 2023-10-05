import { useEffect, useState } from 'react'
import { ContractsTable } from '@/view/ContractView/ContractsTable/ContractsTable'
import { useSearchCompileContract } from '@/hooks'
import { UserContractDetails } from '@/domain'
import { ContractTableItem } from '@/domain/wizard/ContractTableItem'
import { downloadMetadata } from '@/utils/downloadMetadata'
import SearchInput from '../SearchInput'
import { Box, Button, Typography } from '@mui/material'

function updateContractItem(
  codeId: string,
  contractsItem: ContractTableItem[],
  contractDataUpdated: Pick<
    ContractTableItem,
    'isDownloading' | 'sourceJsonString'
  >
) {
  const index = contractsItem.findIndex(item => item.codeHash === codeId)

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
      contract => contract.codeHash === codeId && contract.sourceJsonString
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
    <>
      <Typography variant="h3" align="left" sx={{ margin: '2rem 0rem' }}>
        Your Contracts
      </Typography>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <SearchInput handleChange={() => undefined} types={[]}></SearchInput>
        <Button
          size="large"
          variant="contained"
          sx={{ borderRadius: '20px', maxHeight: '3rem', minWidth: '15rem' }}
        >
          Add new contract
        </Button>
      </Box>
      <ContractsTable contracts={contractsItem} />
    </>
  )
}
