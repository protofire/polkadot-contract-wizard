import { styled } from '@mui/material/styles';
import { Box, BoxProps } from '@mui/material';

type CustomBoxProps = BoxProps & {
  open: boolean;
};

const DrawerHeaderStyled = styled(Box, {
  shouldForwardProp: prop => prop !== 'open',
})<CustomBoxProps>(({ theme, open }) => ({
  ...theme.mixins.toolbar,
  display: 'flex',
  alignItems: 'center',
  justifyContent: open ? 'flex-start' : 'center',
  paddingLeft: theme.spacing(open ? 3 : 0),
}));

export default DrawerHeaderStyled;
