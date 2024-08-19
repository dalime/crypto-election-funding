import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Account from './Account';
import { useAccount, useDisconnect, useEnsName } from 'wagmi';
import { shortenAddress } from '../utils';

jest.mock('wagmi', () => ({
  useAccount: jest.fn(),
  useDisconnect: jest.fn(),
  useEnsName: jest.fn(),
}));

jest.mock('../utils', () => ({
  shortenAddress: jest.fn(),
  copyAddress: jest.fn(),
}));

describe('Account Component', () => {
  const mockAddress = '0x1234567890abcdef1234567890abcdef12345678';
  const mockEnsName = 'example.eth';
  const mockShortenedAddress = '0x1234...5678';
  const disconnectMock = jest.fn();

  beforeEach(() => {
    (useAccount as jest.Mock).mockReturnValue({
      address: mockAddress,
      isConnected: true,
    });
    (useDisconnect as jest.Mock).mockReturnValue({
      disconnect: disconnectMock,
    });
    (useEnsName as jest.Mock).mockReturnValue({ data: mockEnsName });
    (shortenAddress as jest.Mock).mockReturnValue(mockShortenedAddress);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Renders the account address and ENS name correctly', () => {
    render(<Account />);
    expect(
      screen.getByText(`${mockEnsName} (${mockShortenedAddress})`)
    ).toBeInTheDocument();
  });

  it('Renders "Loading..." when not connected', () => {
    (useAccount as jest.Mock).mockReturnValue({
      address: null,
      isConnected: false,
    });
    render(<Account />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('Calls disconnect when the disconnect button is clicked', () => {
    render(<Account />);
    const button = screen.getByText('Disconnect');
    fireEvent.click(button);
    expect(disconnectMock).toHaveBeenCalled();
  });
});
