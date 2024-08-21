import { CoinGeckoEthPrice } from '@/types';

/**
 * Gets the current ETH price from CoinGecko
 * @returns Promise<CoinGeckoEthPrice[] | undefined>
 */
export const getEthPrice = async (): Promise<CoinGeckoEthPrice[] | undefined> => {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum');
    if (!response.ok) {
      throw new Error('Network Error');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch ETH price:', error);
    return undefined;
  }
};