import Image from 'next/image';

import { LOGO_POLKADOT } from 'src/constants/images';

export default function Logo() {
  return (
    <Image alt="Logo polkadot" src={LOGO_POLKADOT} width={186} height={40} />
  );
}
