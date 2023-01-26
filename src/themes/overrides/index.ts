import { Theme } from '@mui/material';

import Badge from './Badge';
import Button from './Button';
import Typography from './Typography';

// ==============================|| OVERRIDES ||============================== //

function ComponentsOverrides(theme: Theme) {
  const badge = Badge(theme);
  const button = Button(theme);

  return Object.assign(badge, button, Typography);
}

export default ComponentsOverrides;
