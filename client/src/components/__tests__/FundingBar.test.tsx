import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FundingBar from '../FundingBar';
import * as useMediaQueryModule from 'react-responsive';

// Mock the roundTo6Decimals utility function
jest.mock('../../utils', () => ({
  roundTo6Decimals: jest.fn((amount) => amount.toFixed(6)),
}));

describe('FundingBar Component', () => {
  it('Renders the component with the correct labels', () => {
    render(<FundingBar amount={0.1} />);

    expect(screen.getByText('1 ETH')).toBeInTheDocument();
    expect(screen.getByText('0.100000 ETH')).toBeInTheDocument();
  });

  it('Renders the component with no amount', () => {
    render(<FundingBar amount={undefined} />);

    expect(screen.getByText('1 ETH')).toBeInTheDocument();
    expect(screen.getByText('0 ETH')).toBeInTheDocument();
  });

  it('Renders the component with a mobile label size', () => {
    jest.spyOn(useMediaQueryModule, 'useMediaQuery').mockReturnValue(true);

    render(<FundingBar amount={0.5} />);

    const startLabel = screen.getByText('1 ETH');
    expect(startLabel).toHaveClass('text-xs');
  });

  it('Renders the component with a desktop label size', () => {
    jest.spyOn(useMediaQueryModule, 'useMediaQuery').mockReturnValue(false);

    render(<FundingBar amount={0.5} />);

    const startLabel = screen.getByText('1 ETH');
    expect(startLabel).not.toHaveClass('text-xs');
  });
});
