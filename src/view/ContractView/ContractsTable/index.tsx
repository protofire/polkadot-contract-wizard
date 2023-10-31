import React, { useEffect, useState } from 'react'
import {
  ContractsTable,
  TableConfig
} from '@/view/ContractView/ContractsTable/ContractsTable'
import { UserContractDetails } from '@/domain'
import { FiltersInput, FiltersInputProps } from '../FiltersInput'
import { Box, Button, Typography } from '@mui/material'
import Link from 'next/link'
import { ROUTES } from '@/constants'
import { useSearchCompileContract } from '@/hooks'
import { ContractTableItem } from '@/domain/wizard/ContractTableItem'
import { downloadMetadata } from '@/utils/downloadMetadata'

interface Props extends FiltersInputProps {
  contracts?: UserContractDetails[]
  isLoading: boolean
  tableConfig?: TableConfig
}

const Loading: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  if (isLoading) return <Typography>Loading</Typography>
}

function updateContractItem(
  codeId: string,
  contractsItem: ContractTableItem[] | undefined,
  contractDataUpdated: Pick<
    ContractTableItem,
    'isDownloading' | 'sourceJsonString'
  >
) {
  const index = contractsItem?.findIndex(item => item.codeId === codeId)

  if (index && contractsItem) {
    contractsItem[index] = {
      ...contractsItem[index],
      ...contractDataUpdated
    }
  }

  return contractsItem
}

export function ContractsTableContent({
  contracts,
  setFilterBy,
  isLoading,
  tableConfig
}: Props) {
  const thereAreContracts = contracts !== undefined && contracts.length > 0
  const _isLoading = !isLoading && contracts === undefined

  const { searchCompileContract } = useSearchCompileContract()
  const [contractsItem, setContractsItem] = useState<
    ContractTableItem[] | undefined
  >(contracts)

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
    const contractWithMeta = contractsItem?.find(
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
    <>
      {!tableConfig?.onlyTable && (
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          marginTop={'2rem'}
        >
          <FiltersInput setFilterBy={setFilterBy}></FiltersInput>
          <Link href={ROUTES.HOME}>
            <Button
              size="large"
              variant="contained"
              sx={{
                borderRadius: '20px',
                maxHeight: '3rem',
                minWidth: '15rem'
              }}
            >
              Add new contract
            </Button>
          </Link>
        </Box>
      )}
      <Loading isLoading={_isLoading} />
      {thereAreContracts ? (
        contracts && (
          <ContractsTable
            onDownloadMeta={onDownloadSource}
            tableConfig={tableConfig}
            contracts={contracts}
          />
        )
      ) : (
        <Box
          sx={{
            width: '100%',
            margin: '2rem',
            textAlign: 'center'
          }}
        >
          <Typography>There are no contracts to list</Typography>
        </Box>
      )}
    </>
  )
}
