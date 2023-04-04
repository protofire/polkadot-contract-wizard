import { Box, Link, Stack, Typography } from '@mui/material'

export default function Home() {
  return (
    <Box
      sx={{
        width: { sm: '90%', md: '75%', lg: '60%' },
        margin: '2rem auto'
      }}
    >
      <Typography variant="h1" align="center">
        Learn more about Polkadot Contract Wizard
      </Typography>
      <Stack mt={8} flexDirection="column" gap={4} justifyContent={'center'}>
        <Typography variant="h3">How it works</Typography>
        <Typography variant="body1">
          The Polkadot Contract Wizard is a non-code tool to generate, compile
          and deploy smart contracts on Polkadot Ecosystem. It provides{' '}
          <Link
            href="https://github.com/w3f/PSPs"
            underline="hover"
            target="_blank"
            rel="noopener noreferrer"
          >
            standard contracts based on PSP.
          </Link>
        </Typography>
        <Typography variant="body1">
          First of all, you need to select what kind of contract you prefer. We
          have these options:
        </Typography>
        <Box sx={{ marginLeft: '3rem' }}>
          <ul>
            <li>
              TOKEN | PSP22: standard smart contract for a fungible token.
            </li>
            <li>
              NFT | PSP34: standard smart contract for a non-fungible token.
            </li>
            <li>MULTITOKEN | PSP37: standar contract for a multi token.</li>
          </ul>
        </Box>

        <Typography variant="h4">1. Extensions choices 🪄</Typography>
        <Typography variant="body1">
          Once you select one of the options (Token, NFT or Multi Token), you
          will be able to choose one or more Extensions: Functionalities and
          Security.
        </Typography>
        <Typography variant="h4">2. Compile your contract ⚙️</Typography>
        <Typography variant="body1">
          Now you have your contract ready to be compiled. If you prefer you can
          copy/download the contract code and use it separately. For the compile
          step, you need to connect your wallet.
        </Typography>
        <Typography variant="h4">3. Deploy your contract 🚀</Typography>
        <Typography variant="body1">
          After the smart contract has been compiled, you can deploy your
          contract directly on any parachain that supports the Contracts Pallet.
        </Typography>
      </Stack>
      {/* <Accordion /> */}
    </Box>
  )
}
