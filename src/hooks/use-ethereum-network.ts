'use client';

import { HOMESTEAD, supportedChains } from '@/constants/chain';
import { useEthereumNetworkParam } from './use-ethereum-network-param';
import { useMemo } from 'react';
import { Chain } from '@/types';

const supportedChainsHelper = new Map(
  supportedChains.map(chain => [chain.network, chain])
);

export default function useEthereumNetwork() {
  const network = useEthereumNetworkParam();
  const ethereumNetwork = useMemo(() => {
    if (network != null && supportedChainsHelper.has(network)) {
      return supportedChainsHelper.get(network);
    }
    return HOMESTEAD;
  }, [network]);
  return ethereumNetwork as Chain;
}
