import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useConnect } from 'wagmi';

import WalletOptions from '../WalletOptions';

// Mock the wagmi useConnect hook
jest.mock('wagmi', () => ({
  useConnect: jest.fn(),
}));

// Mock the WalletOption component
jest.mock('../WalletOption', () => ({ connector, onClick }: any) => (
  <button data-testid={connector.name} onClick={onClick}>
    {connector.name}
  </button>
));

describe('WalletOptions component', () => {
  const mockSetModalOpen = jest.fn();
  const mockConnect = jest.fn();
  const connectors = [
    { uid: '1', name: 'MetaMask' },
    { uid: '2', name: 'WalletConnect' },
  ];

  beforeEach(() => {
    // Mock the implementation of useConnect
    (useConnect as jest.Mock).mockReturnValue({
      connectors,
      connect: mockConnect,
    });
  });

  it('Renders the wallet options when modal is open', () => {
    render(<WalletOptions modalOpen={true} setModalOpen={mockSetModalOpen} />);

    connectors.forEach((connector) => {
      expect(screen.getByTestId(connector.name)).toBeInTheDocument();
    });
  });

  it('Calls the connect function with the correct connector when a wallet option is clicked', () => {
    render(<WalletOptions modalOpen={true} setModalOpen={mockSetModalOpen} />);

    connectors.forEach((connector) => {
      const button = screen.getByTestId(connector.name);
      fireEvent.click(button);
      expect(mockConnect).toHaveBeenCalledWith({ connector });
    });
  });

  it('Toggles the modal when onOpenChange is triggered', () => {
    render(<WalletOptions modalOpen={true} setModalOpen={mockSetModalOpen} />);

    const closeButton = screen.getByLabelText('Close');
    fireEvent.click(closeButton);

    expect(mockSetModalOpen).toHaveBeenCalledWith(false);
  });
});
