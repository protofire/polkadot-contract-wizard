import { Box, Typography } from '@mui/material'
import React from 'react'
import { UserContractDetails } from '@/domain'
import BasicTabs from '@/components/Tabs'
import SimpleAccordion from '@/components/Accordion'

type ContractTabType = 'Read Contract' | 'Write Contract'
const types: ContractTabType[] = ['Read Contract', 'Write Contract']

interface Props {
  userContract: UserContractDetails
}

export function ContractDetailsInteraction({ userContract }: Props) {
  const [type, setType] = React.useState(types[0])
  const isReadContract = type === 'Read Contract'

  const handleChange = (newValue: number) => {
    setType(types[newValue])
  }

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <BasicTabs
          options={['Read Contract', 'Write Contract']}
          onChange={handleChange}
        >
          <>
            {/* <Typography variant="h4">{type}</Typography> */}
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
                  ? [
                      {
                        tittle: 'psp22::balance',
                        content: 'text balance',
                        id: '1'
                      },
                      {
                        tittle: 'psp22::owners',
                        content: 'text owners',
                        id: '2'
                      }
                    ]
                  : [
                      {
                        tittle: 'psp22::approve',
                        content: 'Form approve',
                        id: '1'
                      },
                      {
                        tittle: 'psp22::tranfer',
                        content: 'Form transfer',
                        id: '2'
                      }
                    ]
              }
            />
          </>
        </BasicTabs>
      </Box>
    </>
  )
}
