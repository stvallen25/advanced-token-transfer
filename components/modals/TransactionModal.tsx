import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';
import Link from '@mui/material/Link';
import { makeStyles } from '@mui/styles';
import type { Theme } from '@mui/material/styles';

import { shorttenString } from '../../utils/strings';

const useStyles = makeStyles((theme: Theme) => {
  return {
    modalContainer: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '400px',
      backgroundColor: theme.palette.background.paper,
      borderRadius: '10px',
      boxShadow: `2px 2px 3px 3px ${theme.palette.grey[500]}`,
      padding: theme.spacing(2),
    },

    loadingWrapper: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  };
});

export interface ITransactionModalProps {
  open: boolean;
  handleClose: () => void;
  txHash: string;
}

export const TransactionModal: React.FC<ITransactionModalProps> = ({
  open,
  handleClose,
  txHash,
}) => {
  const classes = useStyles();

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={classes.modalContainer}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Transaction in progress
        </Typography>
        <Box className={classes.loadingWrapper}>
          <CircularProgress />
        </Box>
        <Box>
          <Typography sx={{ mt: 2 }}>Transaction hash:</Typography>
          <Link
            href={`https://ropsten.etherscan.io/tx/${txHash}`}
            target="_blank"
            rel="noopener"
            underline="none"
          >
            {shorttenString(txHash)}
          </Link>
        </Box>
      </Box>
    </Modal>
  );
};
