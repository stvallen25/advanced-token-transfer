import * as React from 'react';
import { useWeb3React } from '@web3-react/core';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';
import Link from '@mui/material/Link';
import { makeStyles } from '@mui/styles';

import { injectedConnector, walletConnector } from '../../utils/web3utils';
import { shorttenString } from '../../utils/strings';

const useStyles = makeStyles((theme) => {
  return {
    modalContainer: {
      position: 'absolute' as 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '300px',
      backgroundColor: theme.palette.background.paper,
      borderRadius: '10px',
      boxShadow: `2px 2px 3px 3px ${theme.palette.grey[500]}`,
      padding: theme.spacing(2),
    },
  };
});

export interface IConnectModalProps {
  open: boolean;
  handleClose: () => void;
}

export const ConnectModal: React.FC<IConnectModalProps> = ({
  open,
  handleClose,
}) => {
  const classes = useStyles();
  const { activate } = useWeb3React();

  const handleConnectMetamask = async () => {
    activate(injectedConnector);
    handleClose();
  };

  const handleConnectWalletConnect = async () => {
    activate(walletConnector);
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={classes.modalContainer}>
        <Button
          variant="contained"
          onClick={handleConnectMetamask}
          sx={{ width: '100%' }}
        >
          Connect MetaMask
        </Button>
        <Button
          variant="contained"
          onClick={handleConnectWalletConnect}
          sx={{ width: '100%', mt: 1 }}
        >
          Connect WalletConnect
        </Button>
      </Box>
    </Modal>
  );
};
