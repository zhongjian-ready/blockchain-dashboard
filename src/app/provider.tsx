'use client';

import { TouchProvider } from '@/components/display/hybrid';
import useEthereumNetwork from '@/hooks/use-ethereum-network';
import { cn } from '@/lib/utils';
import { ReactNode, useEffect } from 'react';

interface Props {
  children: ReactNode;
  header?: ReactNode;
}

export function Provider({ children, header }: Props) {
  const ethereumNetwork = useEthereumNetwork();

  console.log('useEthereumNetwork', ethereumNetwork);

  useEffect(() => {
    const classNames = [
      ethereumNetwork.testnet ? 'testnet' : 'mainnet',
      ethereumNetwork.network,
    ];
    document.documentElement.classList.add(...classNames);
    return () => {
      document.documentElement.classList.remove(...classNames);
    };
  }, [ethereumNetwork.network, ethereumNetwork.testnet]);

  return (
    <TouchProvider>
      <div className="sticky top-0 w-full z-50">{header}</div>
      <main
        className={cn(
          'dark:bg-black flex-auto',
          'flex flex-col dark:text-white transition-colors'
          // 'bg-network-50/25 dark:bg-network-500/20'
        )}
      >
        {children}
      </main>
    </TouchProvider>
  );
}
