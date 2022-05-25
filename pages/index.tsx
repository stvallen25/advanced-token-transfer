import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { Box } from '@mui/material';
import { Header } from '../layouts/header';

const Home: NextPage = () => {
  return (
    <Box>
      <Header />
    </Box>
  );
};

export default Home;
