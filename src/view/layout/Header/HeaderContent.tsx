import { Box, IconButton, Link, Theme, useMediaQuery } from '@mui/material';
import { GitHub } from '@mui/icons-material';

// project import
// import Search from './Search';
// import Profile from './Profile';
// import Notification from './Notification';
import MobileSection from './MobileSection';

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
    const matchesXs = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

    return (
        <>
            {/* {!matchesXs && <Search />} */}
            {matchesXs && <Box sx={{ width: '100%', ml: 1 }} />}

            <IconButton
                component={Link}
                href="https://github.com/codedthemes/mantis-free-react-admin-template"
                target="_blank"
                disableRipple
                color="secondary"
                title="Download Free Version"
                sx={{ color: 'text.primary', bgcolor: 'grey.100' }}
            >
                <GitHub />
            </IconButton>

            {/* <Notification /> */}
            {/* {!matchesXs && <Profile />} */}
            {matchesXs && <MobileSection />}
        </>
    );
};

export default HeaderContent;

