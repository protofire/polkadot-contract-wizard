import React, { useMemo } from 'react'
import { Box, Typography } from '@mui/material'
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
import { ContractInteractionForm } from '@/view/ContractDetailView/ContractInteractionForm'
import { useNetworkApi } from '@/hooks/useNetworkApi'
import NetworkBadge from '../components/NetworkBadge'
import { getChain } from '@/constants/chains'

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
  type: ContractTabType,
  userContract: UserContractDetailsWithAbi
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
        userContract={userContract}
      />
    ),
    id: msg.identifier
  }))
}

export function ContractsTabInteraction({ userContract }: Props) {
  const [type, setType] = React.useState(types[0])
  const isReadContract = type === 'Read Contract'
  const { apiPromise, network } = useNetworkApi()
  const contractPromise = useContractPromiseFromSource(userContract, apiPromise)
  const sortedAbiMessages = useMemo(
    () =>
      contractPromise && groupAndSortAbiMessages(contractPromise.abi.messages),
    [contractPromise]
  )
  const { logo, name: networkName } = getChain(userContract.network)

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

  if (network !== userContract.network) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={6}
        mt="3rem"
        flexDirection="column"
      >
        <Box display="flex" alignItems="center" gap={1.25}>
          <Typography variant="h3">Your contract is deployed</Typography>
          <Typography variant="body1" component="p">
            on
          </Typography>
          <NetworkBadge
            name={networkName}
            logo={logo.src}
            logoSize={{ width: 20, height: 20 }}
            description={logo.alt}
            textTooltip="The network selected is different to this network."
          />
        </Box>
        <Typography variant="body1">
          You need to change the network in order to interact with this. 👆
        </Typography>
      </Box>
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
                      types[0],
                      userContract
                    )
                  : getElements(
                      sortedAbiMessages,
                      contractPromise.abi.registry,
                      contractPromise.contractPromise,
                      types[1],
                      userContract
                    )
              }
            />
          </>
        </BasicTabs>
      </Box>
    </>
  )
}
