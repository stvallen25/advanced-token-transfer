import { ethers } from 'ethers';

import { PROVIDER_URL } from '../constants';

export const getProvider = (providerUrl?: string) =>
  new ethers.providers.StaticJsonRpcProvider(providerUrl || PROVIDER_URL);
