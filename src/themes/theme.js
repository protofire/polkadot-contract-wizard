import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme(
  {
    typography: {
      fontFamily: [
        'Inter',
        'Roboto',
        ].join(','),
    },
  },
);

export default theme;
