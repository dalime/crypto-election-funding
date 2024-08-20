import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import EthereumPrice from './EthereumPrice';

import { formatToUSD } from '@/utils';

jest.mock('@/utils', () => ({
  formatToUSD: jest.fn(),
}));

jest.mock('@/assets/svg', () => ({
  EthereumSVG: () => <svg data-testid="ethereum-svg" />,
  CoinGeckoSVG: () => <svg data-testid="coingecko-svg" />,
}));

describe('EthereumPrice Component', () => {
  it('Renders correctly when ethPrice is provided', () => {
    const ethPrice = 2000;
    (formatToUSD as jest.Mock).mockReturnValue('$2,000.00 USD');

    render(<EthereumPrice ethPrice={ethPrice} ethSupport={undefined} />);

    expect(screen.getByTestId('ethereum-svg')).toBeInTheDocument();
    expect(screen.getByText('Current ETH Price:')).toBeInTheDocument();
    expect(screen.getByText('$2,000.00 USD')).toBeInTheDocument();
    expect(screen.getByTestId('coingecko-svg')).toBeInTheDocument();
  });

  it('Does not render anything when ethPrice is null', () => {
    render(<EthereumPrice ethPrice={null} ethSupport={undefined} />);

    expect(screen.queryByTestId('ethereum-svg')).not.toBeInTheDocument();
    expect(screen.queryByTestId('coingecko-svg')).not.toBeInTheDocument();
  });
});