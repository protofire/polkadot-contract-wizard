import React, { useEffect, useState } from 'react'
import { ContractsTable } from '@/view/ContractView/ContractsTable/ContractsTable'
import { UserContractDetails } from '@/domain'
import { FiltersInput, FiltersInputProps } from '../FiltersInput'
import { Box, Button, Typography } from '@mui/material'
import Link from 'next/link'
import { ROUTES } from '@/constants'
interface Props extends FiltersInputProps {
  contracts?: UserContractDetails[]
  isLoading: boolean
}

const Loading: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  if (isLoading) return <Typography>Loading</Typography>
}

export function ContractsTableContent({
  contracts,
  setFilterBy,
  isLoading
}: Props) {
  const thereAreContracts = contracts !== undefined && contracts.length > 0
  const _isLoading = !isLoading || contracts === undefined
  return (
    <>
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
            sx={{ borderRadius: '20px', maxHeight: '3rem', minWidth: '15rem' }}
          >
            Add new contract
          </Button>
        </Link>
      </Box>
      <Loading isLoading={_isLoading} />
      {thereAreContracts ? (
        contracts && <ContractsTable contracts={contracts} />
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
