import { Box, Typography } from '@mui/material'
import React, { useMemo } from 'react'
import { UserContractDetailsWithAbi } from '@/domain'
import BasicTabs from '@/components/Tabs'
import SimpleAccordion from '@/components/Accordion'
import { groupAndSortAbiMessages } from './groupAndSortAbiMessages'
import { useContractPromiseFromSource } from '@/hooks/useContractPromise'
import { FallbackSpinner } from '@/components/FallbackSpinner'
import { AbiMessage } from '@/services/substrate/types'

type ContractTabType = 'Read Contract' | 'Write Contract'
const types: ContractTabType[] = ['Read Contract', 'Write Contract']

interface Props {
  userContract: UserContractDetailsWithAbi
}

interface AccordionElement {
  title: string
  content: string
  id: string
}

function getElements(abiMessages: AbiMessage[]): AccordionElement[] {
  return abiMessages.map(msg => ({
    title: msg.method,
    content: msg.docs.join(','),
    id: msg.identifier
  }))
}

export function ContractDetailsInteraction({ userContract }: Props) {
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
        text="Getting the metadata interface (ABI) to interact with the Smart Contract"
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
        text="Getting the methods of the Smart Contract"
      />
    )
  }

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <BasicTabs
          options={[
            `Read Contract (${sortedAbiMessages.nonMutating.length})`,
            `Write Contract (${sortedAbiMessages.mutating.length})`
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
                  Let&apos;start to work with your contract displaying each
                  method.
                </Typography>
              </>
            ) : (
              <>
                <Typography variant="h4">
                  Interact with your contract 🔁
                </Typography>
                <Typography variant="body1">
                  Let&apos;s start to work with your contract doing different
                  querys.
                </Typography>
              </>
            )}
            <SimpleAccordion
              elements={
                isReadContract
                  ? getElements(sortedAbiMessages.nonMutating)
                  : getElements(sortedAbiMessages.mutating)
              }
            />
          </>
        </BasicTabs>
      </Box>
    </>
  )
}
