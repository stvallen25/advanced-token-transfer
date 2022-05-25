import React, { ReactText, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { Box, Container, TextField, Button, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { Header } from '../layouts/header';
import { TransactionModal } from '../components/modals';
import { DAI_TOKEN_ADDRESS } from '../constants';
import ERC20_ABI from '../constants/abis/erc20abi.json';
import { getProvider } from '../utils/web3provider';
import { parseEther, formatEther } from 'ethers/lib/utils';

import type { RootState } from '../store';
import { setDaiBalance, setEthBalance } from '../store/reducers';

const useStyles = makeStyles((theme) => {
  return {
    pageContainer: {
      paddingTop: '100px',
      display: 'flex',
      justifyContent: 'center',
    },

    formWrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '250px',

      '& .amount-input-wrapper': {
        width: '100%',
      },

      '& .recipient-input-wrapper': {
        width: '100%',
        marginTop: theme.spacing(2),
      },
    },
  };
});

const DAIContract = new ethers.Contract(
  DAI_TOKEN_ADDRESS,
  ERC20_ABI,
  getProvider(),
);

const Home: NextPage = () => {
  const classes = useStyles();
  const [amount, setAmount] = useState(0);
  const [recipient, setRecipient] = useState('');
  const { account, library, active, deactivate, chainId } = useWeb3React();
  const [txHash, setTxHash] = useState('');
  const [isTransferring, setIsTransferring] = useState(false);
  const [openTxModal, setOpenTxModal] = useState(false);

  const dispatch = useDispatch();

  const daiBalance = useSelector(
    (rootState: RootState) => rootState.daiBalance,
  );

  const fetchDaiBalance = async () => {
    if (account && active) {
      const daiBalanceInWei = await DAIContract.balanceOf(account);
      dispatch(setDaiBalance(formatEther(daiBalanceInWei)));
    }
  };

  const fetchEthBalance = async () => {
    if (account && active) {
      const ethBalanceInWei = await library.getBalance(account);
      dispatch(setEthBalance(formatEther(ethBalanceInWei)));
    }
  };

  React.useEffect(() => {
    if (chainId && chainId !== 3) {
      alert('We only use the Ropsten Test Network');
      deactivate();
    }
  }, [account, chainId, deactivate]);

  useEffect(() => {
    fetchDaiBalance();
    fetchEthBalance();
  }, [active, account]);

  const onChangeAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };

  const onChangeRecipient = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRecipient(event.target.value);
  };

  const handleClickSend = async () => {
    const daiWithSigner = DAIContract.connect(library.getSigner());

    try {
      const tx = await daiWithSigner.transfer(
        recipient,
        parseEther(amount.toString()),
      );

      setIsTransferring(true);
      setOpenTxModal(true);
      setTxHash(tx.hash);
      await tx.wait();
      setIsTransferring(false);
      setOpenTxModal(false);
      fetchDaiBalance();
    } catch (e) {
      setIsTransferring(false);
      setOpenTxModal(false);
    }
  };

  const shouldDisableSend = () => {
    if (amount === 0 || amount > parseFloat(daiBalance)) {
      return true;
    }
    return isTransferring || !active;
  };

  return (
    <Box>
      <Header />
      <Container maxWidth="lg" className={classes.pageContainer}>
        <Box className={classes.formWrapper}>
          <Box className="amount-input-wrapper">
            <TextField
              id="outlined-basic"
              label="DAI Amount"
              variant="outlined"
              fullWidth
              onChange={onChangeAmount}
              error={amount > parseFloat(daiBalance)}
              helperText={
                amount > parseFloat(daiBalance) ? 'invalid amount' : ''
              }
              type="number"
            />
            <Typography>
              Available: {parseFloat(daiBalance).toFixed(4)}
            </Typography>
          </Box>
          <Box className="recipient-input-wrapper">
            <TextField
              id="outlined-basic"
              label="Receipient Address"
              variant="outlined"
              fullWidth
              onChange={onChangeRecipient}
            />
          </Box>
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 1 }}
            onClick={handleClickSend}
            disabled={shouldDisableSend()}
          >
            {isTransferring
              ? 'Transferring ...'
              : !active
              ? 'Connect Wallet'
              : 'Send'}
          </Button>
        </Box>
      </Container>

      <TransactionModal
        open={openTxModal}
        txHash={txHash}
        handleClose={() => setOpenTxModal(false)}
      />
    </Box>
  );
};

export default Home;
