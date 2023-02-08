import { Stack, Typography } from "@mui/material";
import Accordion from "src/view/components/Accordion";

export default function Home() {
  return (
    <>
      <Typography variant="h1" align="center" mt="2">
        Learn more about Polkadot Contract Wizard
      </Typography>
      <Stack mt={8} flexDirection='row' gap={4}>
        <Typography variant="h4">1. Choose your contract features</Typography>
        <Typography variant="h4">2. Deploy your smart contract</Typography>
        <Typography variant="h4">3. Use your smart contract</Typography>
      </Stack>
      <Accordion />
    </>
  );
}
