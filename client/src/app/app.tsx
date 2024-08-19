'use client';

import React, { createContext, useState, useEffect } from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { config } from './config';
import { EthPriceContext } from '@/contexts';
import { CoinGeckoEthPrice } from '@/types';
import { getEthPrice } from '@/actions';

const queryClient = new QueryClient();

export function App({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // State
  const [ethPrices, setEthPrices] = useState<CoinGeckoEthPrice[]>([]);

  // Effects
  useEffect(() => {
    const fetchEthPrice = async () => {
      const prices: CoinGeckoEthPrice[] | undefined = await getEthPrice();
      setEthPrices(prices || []);
    };

    fetchEthPrice();
  }, []);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <NextUIProvider>
          <NextThemesProvider attribute="class" defaultTheme="dark">
            <EthPriceContext.Provider value={ethPrices}>
              {children}
            </EthPriceContext.Provider>
          </NextThemesProvider>
        </NextUIProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
