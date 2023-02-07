import { Typography } from "@mui/material";
import Accordion from "src/view/components/Accordion";

export default function Home() {
  return (
    <>
      <Typography variant="h1" align="center" mt="2">
        Learn more about Polkadot
      </Typography>
      <Accordion />
    </>
  );
}
