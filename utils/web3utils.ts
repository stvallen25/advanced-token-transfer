import { Web3Provider } from '@ethersproject/providers';
import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';

import { ROPSTEN_PROVIDER_URL } from '../constants';

export const getLibrary = (provider: any) => {
  const library = new Web3Provider(provider, 'any');
  library.pollingInterval = 15000;
  return library;
};

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42],
});

export const walletConnector = new WalletConnectConnector({
  rpc: { 3: ROPSTEN_PROVIDER_URL },
  qrcode: true,
});
