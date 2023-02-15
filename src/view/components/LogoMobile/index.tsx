import { Stack } from '@mui/system';
import Image from 'next/image';

import { CW_POLKADOT, LOGO_POLKADOT } from 'src/constants/images';

export default function LogoMobile() {
  return (
    <Stack sx={{ marginTop: '0.3rem', display: 'flex', flexDirection: 'row', gap: '0.5rem' }}>
      <Image alt="Logo polkadot" src={LOGO_POLKADOT} width={100} height={25} />
      <Image alt="Contract wizard" src={CW_POLKADOT} width={120} height={30} />
    </Stack>
  );
}
