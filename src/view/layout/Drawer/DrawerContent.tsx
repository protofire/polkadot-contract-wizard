import NavCard from './NavCard'
// import Navigation from './Navigation'
import SimpleBar from 'src/view/components/third-party/SimpleBar'

const DrawerContent = () => (
    <SimpleBar
        sx={{
            '& .simplebar-content': {
                display: 'flex',
                flexDirection: 'column'
            }
        }}
    >
        {/* <Navigation /> */}
        <NavCard />
    </SimpleBar>
);

export default DrawerContent;

