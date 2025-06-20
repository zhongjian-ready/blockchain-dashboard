'use client';

import { TouchProvider } from '@/components/display/hybrid';
import { ThemeWatcher } from '@/components/display/theme-watcher';
import useEthereumNetwork from '@/hooks/use-ethereum-network';
import { cn } from '@/lib/utils';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useEffect } from 'react';
import { http, WagmiProvider } from 'wagmi';
import { bsc, mainnet, sepolia } from 'wagmi/chains';

const config = getDefaultConfig({
  appName: 'My DApp',
  projectId: 'YOUR_WALLETCONNECT_PROJECT_ID', // 从 https://cloud.walletconnect.com 申请
  chains: [mainnet, bsc, sepolia], // 支持的链
  transports: {
    [mainnet.id]: http(),
    [bsc.id]: http('https://bsc-dataseed.binance.org'),
    [sepolia.id]: http('https://rpc.sepolia.org'),
  },
  ssr: true, // 启用 SSR 支持
});

const queryClient = new QueryClient();

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
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <TouchProvider>
            <div className="sticky top-0 w-full z-20">{header}</div>
            <ThemeWatcher />
            <main className={cn('bg-white dark:bg-slate-900 p-8')}>
              {children}
            </main>
          </TouchProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
