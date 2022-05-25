import React from 'react';
import { useWeb3React } from '@web3-react/core';
import { AppBar, Typography, Toolbar } from '@mui/material';

import { ConnectButton } from '../components/Buttons';
import { shorttenString } from '../utils/strings';

export const Header: React.FC = () => {
  const { active, account, library, chainId } = useWeb3React();

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
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" color="inherit" noWrap>
          Advanced Token Transfer
        </Typography>
        {!account && (
          <ConnectButton variant="contained">Connect Wallet</ConnectButton>
        )}
        {account && <> {shorttenString(account, 10)}</>}
      </Toolbar>
    </AppBar>
  );
};
