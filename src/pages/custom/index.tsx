/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Stack, Typography } from '@mui/material'
import { StyledTextField } from '@/components'
import { DropZone } from '@/view/components/DropZone'
import { DropzoneWrapper } from '@/view/components/DropZone/DropzoneWrapper'

export default function CustomContracts() {
  return (
    <Box
      sx={{
        width: { sm: '90%', md: '75%', lg: '80%', xl: '60%' },
        margin: '0 auto 2rem auto'
      }}
    >
      <Typography variant="h1" align="center">
        Import Custom Contract
      </Typography>
      <Stack mt={8} flexDirection="column" gap={4} justifyContent={'center'}>
        <StyledTextField label="Contract Address" placeholder="502d1..." />
        <StyledTextField
          label="Contract Name"
          placeholder="My imported contract"
        />
        <DropzoneWrapper>
          <DropZone
            label="Drop a .json file or click to select it"
            accept={{}}
            file={undefined}
            onChange={function (_file: File): void {
              throw new Error('Function not implemented.')
            }}
            onRemove={function (): void {
              throw new Error('Function not implemented.')
            }} // file={metadataFile}
            // onChange={onChange}
            //  onRemove={_onRemove}
          />
        </DropzoneWrapper>
      </Stack>
    </Box>
  )
}
