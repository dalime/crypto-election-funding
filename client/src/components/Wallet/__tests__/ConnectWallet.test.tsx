import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useAccount } from 'wagmi';

import ConnectWallet from '../ConnectWallet';

jest.mock('wagmi', () => ({
  useConnect: jest.fn(() => ({
    connectors: [],
    connect: jest.fn(),
  })),
  useAccount: jest.fn(() => ({ isConnected: false })),
}));

describe('ConnectWallet component', () => {
  const mockSetModalOpen = jest.fn();

  it('Should render nothing if the user is connected', () => {
    (useAccount as jest.Mock).mockReturnValue({ isConnected: true });

    render(<ConnectWallet modalOpen={true} setModalOpen={mockSetModalOpen} />);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('Should render WalletOptions if the user is not connected', () => {
    (useAccount as jest.Mock).mockReturnValue({ isConnected: false });

    render(<ConnectWallet modalOpen={true} setModalOpen={mockSetModalOpen} />);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});
