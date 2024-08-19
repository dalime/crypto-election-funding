import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import ConnectButton from '../ConnectButton';

describe('ConnectButton component', () => {
  it('Renders the Connect button when not connecting', () => {
    const handleClick = jest.fn();
    render(<ConnectButton isConnecting={false} onClick={handleClick} />);

    const button = screen.getByRole('button', { name: 'Connect Wallet' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('w-full');
    expect(button).toHaveTextContent('Connect Wallet');
  });

  it('Renders the Disconnect button when connecting', () => {
    const handleClick = jest.fn();
    render(<ConnectButton isConnecting={true} onClick={handleClick} />);

    const button = screen.getByRole('button', { name: 'Disconnect' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('w-full');
    expect(button).toHaveTextContent('Disconnect');
  });

  it('Calls the onClick handler when the button is clicked', () => {
    const handleClick = jest.fn();
    render(<ConnectButton isConnecting={false} onClick={handleClick} />);

    const button = screen.getByRole('button', { name: 'Connect Wallet' });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('Renders Loading... text when connecting', () => {
    render(<ConnectButton isConnecting={true} onClick={jest.fn()} />);

    const loadingText = screen.getByText('Loading...');
    expect(loadingText).toBeInTheDocument();
  });
});
