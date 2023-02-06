import { Stack, Typography } from '@mui/material';
import CustomizedButtons from 'src/view/components/Button';
import { HomeButton } from '@components';
import { TOKEN_PATHS } from '@constants';

export default function Home() {
  return (
    <>
      <Typography variant="h1" align="center" mt="2">
        Start building something amazing on Polkadot
      </Typography>
      <Stack spacing={4} direction="column" m={8}>
        <HomeButton title='TOKEN | PSP22' subtitle='Standard smart contract for a fungible token'
          imgPath={TOKEN_PATHS.TokenIcon} imgProps={{ width: 75, height: 65 }} />
        <HomeButton title='NFT | PSP34' subtitle='Standard smart contract for a non-fungible token'
          imgPath={TOKEN_PATHS.NFTIcon} imgProps={{ width: 75, height: 65 }} />
        <HomeButton title='MULTITOKEN | PSP37' subtitle='Standard smart contract for a Multi Token'
          imgPath={TOKEN_PATHS.MultiTokenIcon} imgProps={{ width: 75, height: 65 }} />
      </Stack>

      <CustomizedButtons></CustomizedButtons>
    </>
  );
}
