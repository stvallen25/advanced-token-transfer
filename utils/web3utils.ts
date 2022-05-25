import { Web3Provider } from '@ethersproject/providers';
import { InjectedConnector } from '@web3-react/injected-connector';

export const getLibrary = (provider: any) => {
  const library = new Web3Provider(provider, 'any');
  library.pollingInterval = 15000;
  return library;
};

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42],
});
