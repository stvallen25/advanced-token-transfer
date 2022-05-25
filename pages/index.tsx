import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { Box, Container, TextField, Button } from '@mui/material';
import { Header } from '../layouts/header';

const Home: NextPage = () => {
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
            />
          </Box>
          <Box sx={{ width: '100%', mt: 1 }}>
            <TextField
              id="outlined-basic"
              label="Receipient Address"
              variant="outlined"
              fullWidth
            />
          </Box>
          <Button variant="contained" fullWidth sx={{ mt: 1 }}>
            Send
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
