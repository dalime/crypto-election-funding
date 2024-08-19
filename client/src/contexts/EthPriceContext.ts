import { createContext } from 'react';
import { CoinGeckoEthPrice } from '@/types';

export const EthPriceContext = createContext<CoinGeckoEthPrice[]>([]);