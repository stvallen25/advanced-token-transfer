import { ethers } from 'ethers';

import { ROPSTEN_PROVIDER_URL } from '../constants';

export const getProvider = (providerUrl?: string) =>
  new ethers.providers.StaticJsonRpcProvider(
    providerUrl || ROPSTEN_PROVIDER_URL,
  );
