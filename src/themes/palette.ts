// material-ui
import { createTheme, Theme } from '@mui/material/styles';

// third-party
import { presetPalettes } from '@ant-design/colors';

// project import
import ThemeOption from './theme';
import { Settings } from './types';

// ==============================|| DEFAULT THEME - PALETTE  ||============================== //

type LookSettings = Pick<Settings, 'mode' | 'skin'>;

const Palette = ({ mode, }: LookSettings): Theme => {
  const colors = presetPalettes;

  const greyPrimary = [
    '#ffffff',
    '#fafafa',
    '#f5f5f5',
    '#f0f0f0',
    '#d9d9d9',
    '#bfbfbf',
    '#8c8c8c',
    '#595959',
    '#262626',
    '#141414',
    '#000000',
  ];
  const greyAscent = ['#fafafa', '#bfbfbf', '#434343', '#1f1f1f',];
  const greyConstant = ['#fafafb', '#e6ebf1',];

  colors.grey = [...greyPrimary, ...greyAscent, ...greyConstant,];

  const paletteColor = ThemeOption(colors);

  return createTheme({
    palette: {
      mode,
      common: {
        black: '#000',
        white: '#fff',
      },
      ...paletteColor,
      text: {
        primary: paletteColor.grey[700],
        secondary: paletteColor.grey[500],
        disabled: paletteColor.grey[400],
      },
      action: {
        disabled: paletteColor.grey[300],
      },
      divider: paletteColor.grey[200],
      background: {
        paper: '#20222D',
        default: '#0D0E13',
      },
    },
  });
};

export default Palette;
