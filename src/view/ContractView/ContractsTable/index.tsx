import { useEffect, useState } from 'react'
import { ContractsTable } from '@/view/ContractView/ContractsTable/ContractsTable'
import { UserContractDetails } from '@/domain'
import { ContractTableItem } from '@/domain/wizard/ContractTableItem'
import SearchInput from '../SearchInput'
import { Box, Button } from '@mui/material'
import Link from 'next/link'
import { ROUTES } from '@/constants'

export function ContractsTableContent({
  contracts
}: {
  contracts: UserContractDetails[]
}) {
  // const { searchCompileContract } = useSearchCompileContract()
  const [contractsItem, setContractsItem] =
    useState<ContractTableItem[]>(contracts)

  useEffect(() => setContractsItem(contracts), [contracts])

  return (
    <>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        marginTop={'2rem'}
      >
        <SearchInput handleChange={() => undefined} types={[]}></SearchInput>
        <Link href={ROUTES.HOME}>
          <Button
            size="large"
            variant="contained"
            sx={{ borderRadius: '20px', maxHeight: '3rem', minWidth: '15rem' }}
          >
            Add new contract
          </Button>
        </Link>
      </Box>
      <ContractsTable contracts={contractsItem} />
    </>
  )
}
