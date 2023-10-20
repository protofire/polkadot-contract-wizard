import { Box, Link, Stack, Typography } from '@mui/material'
import Image from 'next/image'

const ImageResponsive = ({ alt, src }: { alt: string; src: string }) => {
  return (
    <Image
      alt={alt}
      src={src}
      width={0}
      height={0}
      sizes="100vw"
      style={{ width: '100%', height: 'auto' }}
    />
  )
}

export default function Home() {
  return (
    <Box
      sx={{
        width: { sm: '90%', md: '75%', lg: '100%', xl: '75%' },
        margin: { lg: '1rem auto 2rem auto', xl: '2rem auto 2rem auto' }
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
        <ImageResponsive alt="select a contract" src="/assets/docs1.png" />
        <Typography variant="h4">1. Extensions choices 🪄</Typography>
        <Typography variant="body1">
          Once you select one of the options (Token, NFT or Multi Token), you
          will be able to choose one or more Extensions: Functionalities and
          Security.
        </Typography>
        <ImageResponsive alt="select a extension" src="/assets/docs2.png" />
        <Typography variant="h4">2. Compile your contract ⚙️</Typography>
        <Typography variant="body1">
          Now you have your contract ready to be compiled. If you prefer you can
          copy/download the contract code and use it separately. First, you need
          to connect your wallet.
        </Typography>
        <Typography variant="body1">
          First, you need to connect your wallet.
        </Typography>
        <ImageResponsive alt="connect your wallet" src="/assets/docs3.png" />
        <Typography variant="body1">
          Then, you can compile your contract.
        </Typography>
        <ImageResponsive alt="compile your contract" src="/assets/docs4.png" />
        <Typography variant="h4">3. Deploy your contract 🚀</Typography>
        <Typography variant="body1">
          After the smart contract has been compiled, it is ready to be deployed
          to any parachain that supports the Contracts Pallet.
        </Typography>
        <Typography variant="body1">
          Now you need to fill in the required fields for the contract
          constructor.
        </Typography>
        <ImageResponsive alt="fill the fields" src="/assets/docs5.png" />
        <Typography variant="body1">
          Once you have finished, you can deploy your contract.
        </Typography>
        <ImageResponsive alt="deploy your contract" src="/assets/docs6.png" />
        <Typography variant="body1">
          You will be prompted to sign the transaction with your wallet.
        </Typography>
        <ImageResponsive alt="sign transaction" src="/assets/docs7.png" />
        <Typography variant="body1">
          After a little while, your contract will be deployed.
        </Typography>
        <ImageResponsive alt="contract deployed" src="/assets/docs9.png" />
        <Typography variant="h4">4. Interact with your contract 💻</Typography>
        <Typography
          variant="h5"
          sx={{
            background: '#20222d',
            padding: '1.2rem',
            borderRadius: '0.5rem'
          }}
          align="center"
        >
          🛠️ We&apos;re working to offer you direct smart contract interaction
          from our site. 🛠️
        </Typography>

        <Typography variant="body1">
          In the meantime, we recommend using{' '}
          <Link
            href="https://contracts-ui.substrate.io/"
            underline="hover"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://contracts-ui.substrate.io/
          </Link>{' '}
          as a temporary solution by following the next steps:
        </Typography>
        <Typography variant="body1">
          First, go to the main dashboard and copy the address where your
          contract was deployed.
        </Typography>
        <ImageResponsive alt="copy address" src="/assets/docs10.png" />
        <Typography variant="body1">
          Second, click the icon in the same row as your contract to download
          the Metadata file.
        </Typography>
        <ImageResponsive alt="download metadata" src="/assets/docs11.png" />
        <Typography variant="body1">
          Then, go to contracts-ui site and select the network where you
          deployed your contract.
        </Typography>
        <ImageResponsive alt="select network" src="/assets/docs12.png" />
        <Typography variant="body1">
          Click &apos;Add new contract&apos; from the top left corner and then
          &apos;Use On-Chain Contract Address&apos;
        </Typography>
        <ImageResponsive alt="add new contract" src="/assets/docs13.png" />
        <Typography variant="body1">
          Fill in the address field with the address you copied from the
          Polkadot Contract Wizard and upload the Metadata file you downloaded.
          Click &apos;Add Contract&apos;.
        </Typography>
        <ImageResponsive alt="fill fields" src="/assets/docs14.png" />
        <Typography variant="body1">
          Now you are ready to interact with your contract!!
        </Typography>
        <ImageResponsive alt="ready to interact" src="/assets/docs15.png" />
      </Stack>
    </Box>
  )
}
