import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Connector } from 'wagmi';

import WalletOption from '../WalletOption';

jest.mock('@/assets/svg', () => ({
  CoinbaseSVG: () => <div data-testid="coinbase-icon" />,
  InjectedSVG: () => <div data-testid="injected-icon" />,
  MetaMaskSVG: () => <div data-testid="metamask-icon" />,
  PhantomSVG: () => <div data-testid="phantom-icon" />,
  SafeSVG: () => <div data-testid="safe-icon" />,
  WalletConnectSVG: () => <div data-testid="walletconnect-icon" />,
}));

const mockConnector: Connector = {
  name: 'MetaMask',
  ready: true,
  getProvider: jest.fn().mockResolvedValue(true),
} as any;

describe('WalletOption component', () => {
  it('Renders the correct icon and name for the connector', async () => {
    render(<WalletOption connector={mockConnector} onClick={jest.fn()} />);

    expect(await screen.findByTestId('metamask-icon')).toBeInTheDocument();
    expect(screen.getByText('MetaMask')).toBeInTheDocument();
  });

  it('Calls the onClick handler when the button is clicked', async () => {
    const handleClick = jest.fn();
    mockConnector.getProvider = jest.fn().mockResolvedValue(true);

    render(<WalletOption connector={mockConnector} onClick={handleClick} />);

    const button = await screen.findByRole('button', { name: /MetaMask/i });
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('Disables the button when the connector is not ready', async () => {
    mockConnector.getProvider = jest.fn().mockResolvedValue(false);

    render(<WalletOption connector={mockConnector} onClick={jest.fn()} />);

    const button = await screen.findByRole('button', { name: /MetaMask/i });
    expect(button).toBeDisabled();
  });
});
