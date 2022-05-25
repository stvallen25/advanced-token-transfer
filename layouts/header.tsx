import React from 'react';
import { AppBar, Typography, Toolbar } from '@mui/material';

export const Header: React.FC = () => {
  return (
    <AppBar
      position="absolute"
      color="default"
      elevation={0}
      sx={{
        position: 'relative',
        borderBottom: (t) => `1px solid ${t.palette.divider}`,
      }}
    >
      <Toolbar>
        <Typography variant="h6" color="inherit" noWrap>
          Advanced Token Transfer
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
