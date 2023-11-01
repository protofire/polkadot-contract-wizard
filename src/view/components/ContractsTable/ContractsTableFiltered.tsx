import {
  ContractsTable,
  ContractsTableProps
} from '@/components/ContractsTable/ContractsTable'
import { ROUTES } from '@/constants/routes'
import { Link, Typography } from '@mui/material'

export function ContractsTableFiltered({
  contracts,
  onDownloadMeta
}: ContractsTableProps): JSX.Element {
  const filterContracts = contracts
    .filter(contract => !contract.hidden)
    .slice(0, 4)
  const totalContracts = filterContracts.length

  return (
    <>
      <ContractsTable
        contracts={filterContracts}
        tableConfig={{ onlyTable: true, editName: false }}
        onDownloadMeta={onDownloadMeta}
      />
      {filterContracts.length > 0 ? (
        <Link href={ROUTES.CONTRACTS} sx={{ textDecoration: 'none' }}>
          <Typography variant="h5" color="primary" textAlign="center" mb="1rem">
            View all contracts ({totalContracts})
          </Typography>
        </Link>
      ) : (
        ''
      )}
    </>
  )
}
