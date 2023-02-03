import { Box } from '@mui/material';

import MobileSection from './MobileSection';

const HeaderContent = ({ isMobile, }: { isMobile: boolean }) => {
  return (
    <>
      {isMobile && <Box sx={{ width: '100%', ml: 1, }} />}

      {isMobile && <MobileSection />}
    </>
  );
};

export default HeaderContent;
