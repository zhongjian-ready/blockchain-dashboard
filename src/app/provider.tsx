'use client';

import { TouchProvider } from '@/components/display/hybrid';
import { ThemeWatcher } from '@/components/display/theme-watcher';
import useEthereumNetwork from '@/hooks/use-ethereum-network';
import { cn } from '@/lib/utils';
import { ReactNode, useEffect } from 'react';

interface Props {
  children: ReactNode;
  header?: ReactNode;
}

export function Provider({ children, header }: Props) {
  const ethereumNetwork = useEthereumNetwork();

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
      <ThemeWatcher />
      <main className={cn('bg-white dark:bg-black')}>{children}</main>
    </TouchProvider>
  );
}
