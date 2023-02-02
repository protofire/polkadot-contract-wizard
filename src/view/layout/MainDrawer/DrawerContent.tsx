import Navigation from './Navigation'
import SimpleBar from 'src/view/components/third-party/SimpleBar';

const DrawerContent = () => (
  <SimpleBar
    sx={{
      '& .simplebar-content': {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        marginTop: '2rem',
      },
    }}
  >
    <Navigation />
  </SimpleBar>
);

export default DrawerContent;
