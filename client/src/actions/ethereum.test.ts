import { getEthPrice } from './ethereum';
import { CoinGeckoEthPrice } from '@/types';

describe('getEthPrice action', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should fetch and return the ETH price data from CoinGecko', async () => {
    const mockData: CoinGeckoEthPrice[] = [
      {
        id: 'ethereum',
        symbol: 'eth',
        name: 'Ethereum',
        current_price: 3000,
        market_cap: 1000000,
        ath: 1000,
        ath_date: '2022-01-01',
        ath_change_percentage: -10,
        atl: 1,
        atl_date: '2022-01-01',
        atl_change_percentage: 10,
        circulating_supply: 1000000,
        total_supply: 1000000,
        fully_diluted_valuation: 1000000,
        high_24h: 1000,
        low_24h: 1000,
        image: '',
        last_updated: '2022-01-01T00:00:00.000Z',
        market_cap_change_24h: 1000,
        market_cap_change_percentage_24h: 10,
        market_cap_rank: 2,
        max_supply: 1000000,
        price_change_24h: 1000,
        price_change_percentage_24h: 0,
        roi: null,
        total_volume: 1000000,
      },
    ];

    // Mock the fetch response
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const data = await getEthPrice();
    expect(data).toEqual(mockData);
  });

  it('Should return undefined and log an error if the fetch fails', async () => {
    console.error = jest.fn();
    
    // Mock the fetch response to simulate a failure
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    const data = await getEthPrice();
    expect(data).toBeUndefined();
    expect(console.error).toHaveBeenCalledWith(
      'Failed to fetch ETH price:',
      expect.any(Error)
    );
  });
});