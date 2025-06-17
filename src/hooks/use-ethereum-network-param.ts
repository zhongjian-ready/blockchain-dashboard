'use client';

import { HOMESTEAD } from '@/constants/chain';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export function useEthereumNetworkParam(
  defaultNetwork: string = HOMESTEAD.network
) {
  const searchParams = useSearchParams();
  const networkParam = searchParams.get('network');
  return networkParam || defaultNetwork;
}

export function useEthereumSetNetworkParam() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const createQueryString = useCallback(
    (network?: string) => {
      const params = new URLSearchParams(searchParams);
      if (network === HOMESTEAD.network || network == null) {
        // default network 'homestead'
        params.delete('network');
      } else {
        params.set('network', network);
      }
      return params.toString();
    },
    [searchParams]
  );
  const setNetworkParam = useCallback(
    (network: string) => {
      router.push(pathname + '?' + createQueryString(network));
    },
    [router, pathname, createQueryString]
  );
  return setNetworkParam;
}
