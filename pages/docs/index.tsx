import { Box, Link, Stack, Typography } from '@mui/material'
import Image from 'next/image'

export default function Home() {
  return (
    <Box
      sx={{
        width: { sm: '90%', md: '75%', lg: '80%', xl: '60%' },
        margin: '0 auto 2rem auto'
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
            <li>MULTITOKEN | PSP37: standard contract for a multi token.</li>
          </ul>
        </Box>
        <Image alt="description" src='/assets/docs1.png' height={340} width={600} />
        <Typography variant="h4">1. Extensions choices 🪄</Typography>
        <Typography variant="body1">
          Once you select one of the options (Token, NFT or Multi Token), you
          will be able to choose one or more Extensions: Functionalities and
          Security.
        </Typography>
        <Image alt="description" src='/assets/docs2.png' height={340} width={600} />
        <Typography variant="h4">2. Compile your contract ⚙️</Typography>
        <Typography variant="body1">
          Now you have your contract ready to be compiled. If you prefer you can
          copy/download the contract code and use it separately.
          First, you need to connect your wallet.
        </Typography>
        <Typography variant="body1">
          First, you need to connect your wallet.
        </Typography>
        <Image alt="description" src='/assets/docs3.png' height={340} width={600} />
        <Typography variant="body1">
          Then, you can compile your contract.
        </Typography>
        <Image alt="description" src='/assets/docs4.png' height={340} width={600} />
        <Typography variant="h4">3. Deploy your contract 🚀</Typography>
        <Typography variant="body1">
          After the smart contract has been compiled, it is ready to be deployed to any parachain that supports the Contracts Pallet.
        </Typography>
        <Typography variant="body1">
          Now you need to fill in the required fields for the contract constructor.
        </Typography>
        <Image alt="description" src='/assets/docs5.png' height={340} width={600} />
        <Typography variant="body1">
          Once you have finished, you can deploy your contract.
        </Typography>
        <Image alt="description" src='/assets/docs6.png' height={340} width={600} />
        <Typography variant="h4">4. Interact with your contract 💻</Typography>
        <Typography variant="h4">Coming Soon 🛠️</Typography>
      </Stack>
      {/* <Accordion /> */}
    </Box>
  )
}
