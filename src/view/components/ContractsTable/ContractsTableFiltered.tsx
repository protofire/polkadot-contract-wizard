import {
  ContractsTable,
  ContractsTableProps
} from '@/components/ContractsTable/ContractsTable'
import { ROUTES } from '@/constants/routes'
import { Box, Link, Typography } from '@mui/material'
interface Props extends ContractsTableProps {
  isLoading: boolean
}

export function ContractsTableFiltered({
  contracts,
  onDownloadMeta,
  isLoading
}: Props): JSX.Element {
  const thereAreContracts = contracts !== undefined && contracts.length > 0
  const _isLoading = !isLoading && contracts === undefined
  const filterContracts = contracts.filter(contract => !contract.hidden)
  const totalContracts = filterContracts.length
  const Loading: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
    if (isLoading) return <Typography>Loading</Typography>
  }
  return (
    <>
      <Loading isLoading={_isLoading} />
      {thereAreContracts ? (
        contracts && (
          <ContractsTable
            contracts={filterContracts.slice(0, 4)}
            tableConfig={{ onlyTable: true, editName: false }}
            onDownloadMeta={onDownloadMeta}
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
