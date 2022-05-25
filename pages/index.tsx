import React, { ReactText, useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { Box, Container, TextField, Button, Typography } from '@mui/material';

import { Header } from '../layouts/header';
import { TransactionModal } from '../components/modals';
import { DAI_TOKEN_ADDRESS } from '../constants';
import ERC20_ABI from '../constants/abis/erc20abi.json';
import { getProvider } from '../utils/web3provider';
import { parseEther, formatEther } from 'ethers/lib/utils';

const DAIContract = new ethers.Contract(
  DAI_TOKEN_ADDRESS,
  ERC20_ABI,
  getProvider(),
);

const Home: NextPage = () => {
  const [amount, setAmount] = useState(0);
  const [recipient, setRecipient] = useState('');
  const { account, library, active } = useWeb3React();
  const [txHash, setTxHash] = useState('');
  const [isTransferring, setIsTransferring] = useState(false);
  const [openTxModal, setOpenTxModal] = useState(false);
  const [daiBalance, setDaiBalance] = useState(0);

  const fetchDaiBalance = async () => {
    if (account && active) {
      const daiBalanceInWei = await DAIContract.balanceOf(account);
      setDaiBalance(formatEther(daiBalanceInWei));
    }
  };

  useEffect(() => {
    fetchDaiBalance();
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

  return (
    <Box>
      <Header />
      <Container
        maxWidth="lg"
        sx={{ paddingTop: '100px', display: 'flex', justifyContent: 'center' }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '250px',
          }}
        >
          <Box sx={{ width: '100%' }}>
            <TextField
              id="outlined-basic"
              label="DAI Amount"
              variant="outlined"
              fullWidth
              onChange={onChangeAmount}
            />
            <Typography>
              Available: {parseFloat(daiBalance).toPrecision(4)}
            </Typography>
          </Box>
          <Box sx={{ width: '100%', mt: 1 }}>
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
            disabled={isTransferring || !active}
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
