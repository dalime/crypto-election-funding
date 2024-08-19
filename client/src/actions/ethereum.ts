/**
 * Gets the current ETH price from CoinGecko
 * @returns Promise<CoinGeckoEthPrice[] | undefined>
 */
export const getEthPrice = async () => {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch ETH price:', error);
  }
};