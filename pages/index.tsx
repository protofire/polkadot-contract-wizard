import { Typography } from '@mui/material';
import CustomizedButtons from 'src/view/components/Button';
import Stepper from 'src/view/components/Stepper';

export default function Home() {
  return (
    <>
      <Typography variant="h1" align="center" mt="2">
        Start building something amazing on Polkadot
      </Typography>
      <Stepper />
      <CustomizedButtons></CustomizedButtons>
      
    </>
  );
}
