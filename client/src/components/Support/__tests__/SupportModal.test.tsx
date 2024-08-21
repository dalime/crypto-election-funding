import React, { act } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import { CoinGeckoEthPrice } from '@/types';
import { EthPriceContext } from '@/contexts';
import SupportModal from '../SupportModal';

const mockEthPriceContextValue: CoinGeckoEthPrice[] = [
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
  }
];

const mockProps = {
  candidateFullName: 'Kamala Harris',
  feeAmount: 3,
  hash: '0x1234567890abcdef1234567890abcdef12345678' as `0x${string}`,
  amount: '0.5',
  setAmount: jest.fn(),
  isPending: false,
  isConfirming: false,
  isConfirmed: false,
  error: null,
  handleSupport: jest.fn(),
  supportStateCleared: false,
  clearSupportState: jest.fn(),
  onClose: jest.fn(),
};

describe('SupportModal Component', () => {
  it('Renders the modal with correct candidate name', () => {
    render(
      <EthPriceContext.Provider value={mockEthPriceContextValue}>
        <SupportModal {...mockProps} />
      </EthPriceContext.Provider>
    );

    expect(
      screen.getByText(`Send ETH to Kamala Harris's Campaign`)
    ).toBeInTheDocument();
  });

  it('Displays the correct ETH amount and USD equivalent', () => {
    render(
      <EthPriceContext.Provider value={mockEthPriceContextValue}>
        <SupportModal {...mockProps} />
      </EthPriceContext.Provider>
    );

    expect(screen.getByDisplayValue('0.5')).toBeInTheDocument();
    const supportModalInput = screen.getByTestId('support-modal-input-usd');
    expect(supportModalInput.textContent).toBe('Approx. 1,500.00 USD');
  });

  it('Calls the handleSupport function when the form is submitted', () => {
    render(
      <EthPriceContext.Provider value={mockEthPriceContextValue}>
        <SupportModal {...mockProps} />
      </EthPriceContext.Provider>
    );

    act(() => {
      fireEvent.click(screen.getByText('Support'));
    });

    expect(mockProps.handleSupport).toHaveBeenCalled();
  });

  it('Displays a progress bar during confirmation', () => {
    render(
      <EthPriceContext.Provider value={mockEthPriceContextValue}>
        <SupportModal {...mockProps} isConfirming={true} />
      </EthPriceContext.Provider>
    );

    expect(screen.getByLabelText('Sending...')).toBeInTheDocument();
  });

  it('Displays an error message when there is an error', () => {
    render(
      <EthPriceContext.Provider value={mockEthPriceContextValue}>
        <SupportModal {...mockProps} error={{
            message: 'Transaction failed',
            name: 'Error',
        }} />
      </EthPriceContext.Provider>
    );

    expect(screen.getByText('Error: Transaction failed')).toBeInTheDocument();
  });
});