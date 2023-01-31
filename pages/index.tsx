import { Typography } from '@mui/material';
import CustomizedButtons from 'src/view/components/Button';

export default function Home() {
  return (
    <>
      <Typography variant="h1" align="center" mt="2">
        Start building something amazing on Polkadot
      </Typography>
      <CustomizedButtons></CustomizedButtons>
    </>
  );
}
