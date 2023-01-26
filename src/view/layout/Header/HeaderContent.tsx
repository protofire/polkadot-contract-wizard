import { Box, IconButton, Link, Theme, useMediaQuery } from '@mui/material';

// import Search from './Search';
// import Profile from './Profile';
// import Notification from './Notification';
import MobileSection from './MobileSection';

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
  const matchesXs = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('md'),
  );

  return (
    <>
      {/* {!matchesXs && <Search />} */}
      {matchesXs && <Box sx={{ width: '100%', ml: 1 }} />}

      {/* <Notification /> */}
      {/* {!matchesXs && <Profile />} */}
      {matchesXs && <MobileSection />}
    </>
  );
};

export default HeaderContent;
