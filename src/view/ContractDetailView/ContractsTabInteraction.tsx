import { Box, Typography } from '@mui/material'
import React, { useMemo } from 'react'
import { ContractTabType, UserContractDetailsWithAbi } from '@/domain'
import BasicTabs from '@/components/Tabs'
import SimpleAccordion from '@/components/Accordion'
import {
  GroupedAbiMessages,
  groupAndSortAbiMessages
} from './groupAndSortAbiMessages'
import { useContractPromiseFromSource } from '@/hooks/useContractPromise'
import { FallbackSpinner } from '@/components/FallbackSpinner'
import { ContractPromise, Registry } from '@/services/substrate/types'
import { ContractInteractionForm } from './ContractInteractionForm.'

const types: ContractTabType[] = ['Read Contract', 'Write Contract']
const groupedIndex: Record<ContractTabType, keyof GroupedAbiMessages> = {
  'Read Contract': 'nonMutating',
  'Write Contract': 'mutating'
}

interface Props {
  userContract: UserContractDetailsWithAbi
}

interface AccordionElement {
  title: string
  content: React.ReactNode
  id: string
}

function getElements(
  abiMessages: GroupedAbiMessages,
  substrateRegistry: Registry,
  contractPromise: ContractPromise,
  type: ContractTabType
): AccordionElement[] {
  const group = abiMessages[groupedIndex[type]]

  return group.map(msg => ({
    title: msg.method,
    content: (
      <ContractInteractionForm
        abiMessage={msg}
        substrateRegistry={substrateRegistry}
        contractPromise={contractPromise}
        type={type}
      />
    ),
    id: msg.identifier
  }))
}

export function ContractsTabInteraction({ userContract }: Props) {
  const [type, setType] = React.useState(types[0])
  const isReadContract = type === 'Read Contract'
  const contractPromise = useContractPromiseFromSource(userContract)
  const sortedAbiMessages = useMemo(
    () =>
      contractPromise && groupAndSortAbiMessages(contractPromise.abi.messages),
    [contractPromise]
  )

  const handleChange = (newValue: number) => {
    setType(types[newValue])
  }

  if (!contractPromise) {
    return (
      <FallbackSpinner
        sx={{
          mt: '3rem',
          justifyContent: 'start'
        }}
        text="Getting the connected network API..."
      />
    )
  }

  if (!sortedAbiMessages) {
    return (
      <FallbackSpinner
        sx={{
          mt: '3rem',
          justifyContent: 'start'
        }}
        text="Getting the metadata interface (ABI) to interact with the Smart Contract"
      />
    )
  }

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <BasicTabs
          options={[
            `Read (${sortedAbiMessages.nonMutating.length})`,
            `Write (${sortedAbiMessages.mutating.length})`
          ]}
          onChange={handleChange}
        >
          <>
            {isReadContract ? (
              <>
                <Typography variant="h4">
                  Learn more about your contract 🔁
                </Typography>
                <Typography variant="body1">
                  Explore the smart contract&apos;s data by selecting the
                  desired information.
                </Typography>
              </>
            ) : (
              <>
                <Typography variant="h4">
                  Interact with your contract 🔁
                </Typography>
                <Typography variant="body1">
                  Select the method you want to execute and fill in the required
                  parameters to perform a transaction.
                </Typography>
              </>
            )}
            <SimpleAccordion
              elements={
                isReadContract
                  ? getElements(
                      sortedAbiMessages,
                      contractPromise.abi.registry,
                      contractPromise.contractPromise,
                      types[0]
                    )
                  : getElements(
                      sortedAbiMessages,
                      contractPromise.abi.registry,
                      contractPromise.contractPromise,
                      types[1]
                    )
              }
            />
          </>
        </BasicTabs>
      </Box>
    </>
  )
}
