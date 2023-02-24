import { Stack, Typography } from "@mui/material";
import Accordion from "src/view/LearnView/Accordion";

export default function Home() {
  return (
    <>
      <Typography variant="h1" align="center">
        Learn more about Polkadot Contract Wizard
      </Typography>
      <Stack mt={8} flexDirection='row' gap={4} justifyContent={'center'}>
        <Typography variant="h5">1. Choose your contract features 🪄</Typography>
        <Typography variant="h5">2. Deploy your smart contract 🚀</Typography>
        <Typography variant="h5">3. Use your smart contract 💡</Typography>
      </Stack>
      <Accordion />
    </>
  )
}
