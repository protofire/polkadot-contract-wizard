import React from 'react'
import {
  ContractsTable,
  TableConfig
} from '@/view/components/ContractsTable/ContractsTable'
import { UserContractDetails } from '@/domain'
import {
  FiltersInput,
  FiltersInputProps
} from '@/view/ContractView/FiltersInput'
import { Box, Button, Typography } from '@mui/material'
import Link from 'next/link'
import { ROUTES } from '@/constants'
import { useDownloadMetadata } from './useDownloadMetadata'

interface Props extends FiltersInputProps {
  contracts?: UserContractDetails[]
  isLoading: boolean
  tableConfig?: TableConfig
}

const Loading: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  if (isLoading) return <Typography>Loading</Typography>
}

export function ContractsTableContent({
  contracts,
  setFilterBy,
  isLoading,
  tableConfig
}: Props) {
  const thereAreContracts = contracts !== undefined && contracts.length > 0
  const _isLoading = !isLoading && contracts === undefined
  const { userContractItems, onDownloadSource } = useDownloadMetadata(contracts)

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
        userContractItems && (
          <ContractsTable
            onDownloadMeta={onDownloadSource}
            tableConfig={tableConfig}
            contracts={userContractItems as UserContractDetails[]}
          />
        )
      ) : (
        <Box
          sx={{
            margin: '2rem',
            textAlign: 'center'
          }}
        >
          <Typography
            variant="body1"
            align="center"
            color="white"
            mt="2rem"
            mb="1rem"
          >
            You don&apos;t have any contracts for this network. Build one! ☝️
          </Typography>
        </Box>
      )}
    </>
  )
}
