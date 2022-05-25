import { Web3ReactProvider } from '@web3-react/core';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import AppThemeProvider from '../theme';
import { store } from '../store';
import { getLibrary } from '../utils/web3utils';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <AppThemeProvider>
          <Component {...pageProps} />
        </AppThemeProvider>
      </Web3ReactProvider>
    </Provider>
  );
}

export default MyApp;
