import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

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
  const handleViewEtherscan = () => {
    window.open(`https://ropsten.etherscan.io/tx/${txHash}`, '_blink');
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Transaction in progress
        </Typography>
        <Box>
          <CircularProgress />
        </Box>
        <Typography sx={{ mt: 2 }}>Transaction hash: {txHash}</Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <Button onClick={handleViewEtherscan}> View on Etherscan </Button>
        </Typography>
      </Box>
    </Modal>
  );
};
