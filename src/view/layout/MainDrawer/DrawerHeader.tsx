import { useTheme } from '@mui/material/styles';
import { Stack, IconButton } from '@mui/material';

import DrawerHeaderStyled from './DrawerHeaderStyled';
import Logo from 'src/view/components/Logo';
import { Close as CloseIcon } from '@mui/icons-material';

const DrawerHeader = ({ open, handleDrawerToggle  }: { 
  open: boolean,
  handleDrawerToggle: () => void;
}) => {
  const theme = useTheme();

  return (
    <DrawerHeaderStyled theme={theme} open={open}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Logo />
      </Stack>
    </DrawerHeaderStyled>
  );
};

export default DrawerHeader;
