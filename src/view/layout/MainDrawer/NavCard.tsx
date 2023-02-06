import * as React from 'react';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';

import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import BookmarkAddedRoundedIcon from '@mui/icons-material/BookmarkAddedRounded';

export default function NavCard() {
  return (
    <Paper
      sx={{ width: 280, maxWidth: '100%', mt: 3, background: 'transparent', }}
    >
      <MenuList>
        <MenuItem>
          <ListItemIcon>
            <DashboardRoundedIcon fontSize="medium" sx={{ color: '#E6007A', }} />
          </ListItemIcon>
          <ListItemText>
            <Typography
              sx={{ color: '#E6007A', fontSize: '1.4rem', fontWeight: 'bold', }}
            >
              Dashboard
            </Typography>
          </ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <BookmarkAddedRoundedIcon fontSize="medium" />
          </ListItemIcon>
          <ListItemText>
            <Typography
              sx={{ color: 'white', fontSize: '1.4rem', fontWeight: 'bold', }}
            >
              Learn
            </Typography>
          </ListItemText>
        </MenuItem>
      </MenuList>
    </Paper>
  );
}
