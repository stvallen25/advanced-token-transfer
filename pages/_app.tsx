import { CssBaseline } from '@mui/material';
import type { AppProps } from 'next/app';
import AppThemeProvider from '../theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppThemeProvider>
      <CssBaseline />
      <Component {...pageProps} />
    </AppThemeProvider>
  );
}

export default MyApp;
