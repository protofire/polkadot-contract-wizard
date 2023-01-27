import { PaletteMode } from '@mui/material';

export type Skin = 'default';

export type Settings = {
  navOpen: boolean;
  mode: PaletteMode;
  skin: Skin;
  drawerWidth?: number;
};
