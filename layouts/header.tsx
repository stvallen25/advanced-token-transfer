import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import { AppBar, Typography, Toolbar, Box, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { ConnectModal } from '../components/modals';
import { shorttenString } from '../utils/strings';

import type { RootState } from '../store';

const useStyles = makeStyles((theme) => {
  return {
    appBar: {
      position: 'relative',
      borderBottom: `1px solid ${theme.palette.divider}`,
    },

    toolBar: {
      display: 'flex',
      justifyContent: 'space-between',
    },

    walletInfo: {
      display: 'flex',
      flexDirection: 'column',
      '& .balance': {
        color: theme.palette.grey[500],
      },
    },
  };
});

export const Header: React.FC = () => {
  const classes = useStyles();
  const { active, account, library, chainId } = useWeb3React();
  const ethBalance = useSelector((state: RootState) => state.ethBalance);

  const [openConnectModal, setOpenConnectModal] = useState(false);

  return (
    <AppBar
      position="absolute"
      color="default"
      elevation={0}
      className={classes.appBar}
    >
      <Toolbar className={classes.toolBar}>
        <Typography variant="h6" color="inherit" noWrap>
          Advanced Token Transfer
        </Typography>
        {!account && (
          <Button variant="contained" onClick={() => setOpenConnectModal(true)}>
            Connect Wallet
          </Button>
        )}
        {account && (
          <Box className={classes.walletInfo}>
            <Box className="address"> {shorttenString(account, 10)}</Box>
            <Box className="balance">
              {parseFloat(ethBalance).toFixed(4)} ETH
            </Box>
          </Box>
        )}
      </Toolbar>
      <ConnectModal
        open={openConnectModal}
        handleClose={() => setOpenConnectModal(false)}
      />
    </AppBar>
  );
};
