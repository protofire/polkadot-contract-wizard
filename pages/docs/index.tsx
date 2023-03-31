import { Box, Link, Stack, Typography } from '@mui/material'
import Accordion from 'src/view/LearnView/Accordion'

export default function Home() {
  return (
    <Box
      sx={{
        width: { sm: '90%', md: '75%', lg: '60%' },
        margin: 'auto'
      }}
    >
      <Typography variant="h1" align="center">
        Learn more about Polkadot Contract Wizard
      </Typography>
      <Stack mt={8} flexDirection="row" gap={4} justifyContent={'center'}>
        <Typography variant="h5">
          1. Choose your contract features 🪄
        </Typography>
        <Typography variant="h5">2. Compile your smart contract ⚙️</Typography>
        <Typography variant="h5">
          3. Deploy and use your smart contract 🚀
        </Typography>
      </Stack>
      <Stack mt={8} flexDirection="column" gap={4} justifyContent={'center'}>
        <Typography variant="h4">How it works</Typography>
        <Typography variant="body1">
          The Polkadot Contract Wizard is a non-code tool to generate, compile
          and deploy smart contracts on Polkadot. It provides{' '}
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
          <ul>
            <li>PSP22</li>
            <li>PSP34</li>
            <li>PSP37</li>
          </ul>
        </Typography>

        <Typography variant="h4">1. Extensions choices</Typography>
        <Typography variant="body1">
          Once you select one of the options (Token, NFT or Multi Token), you
          will be able to choose one or more Extensions: Functionalities and
          Security. All the Extensions are explained in the wizard but if you
          want to learn more, you can check our Extension section [link to
          Learn/#extensions].
        </Typography>
        <Typography variant="h4">2. Compile your contract</Typography>
        <Typography variant="body1">
          Now you have your contract ready to be compiled. If you prefer you can
          copy/download the contract code and use it separately. For the compile
          step, you need to connect your wallet.
        </Typography>
        <Typography variant="h4">3. Deploy your contract</Typography>
        <Typography variant="body1">
          After the smart contract compilation, you can deploy your contract
          directly on Polkadot or other parachains and testnets.
        </Typography>
      </Stack>
      {/* <Accordion /> */}
    </Box>
  )
}
