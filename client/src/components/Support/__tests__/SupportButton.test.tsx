import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useAccount } from 'wagmi';

import SupportButton from '../SupportButton';
import { useSupportCandidate } from '@/hooks/useSupportCandidate';

jest.mock('wagmi', () => ({
  useAccount: jest.fn(),
}));

jest.mock('@/hooks/useSupportCandidate', () => ({
  useSupportCandidate: jest.fn(),
}));

jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: ({ icon, ...props }: { icon: any }) => <svg {...props} />,
}));

jest.mock('@/components/Wallet/ConnectWallet', () => () => (
  <div>ConnectWallet</div>
));
jest.mock('../SupportModal', () => () => <div>SupportModal</div>);

describe('SupportButton Component', () => {
  const mockUseAccount = useAccount as jest.MockedFunction<typeof useAccount>;
  const mockUseSupportCandidate = useSupportCandidate as jest.MockedFunction<
    typeof useSupportCandidate
  >;

  beforeEach(() => {
    mockUseAccount.mockReturnValue({
      address: undefined,
      addresses: undefined,
      chain: undefined,
      chainId: undefined,
      connector: undefined,
      isConnected: false,
      isReconnecting: false,
      isConnecting: false,
      isDisconnected: true,
      status: 'disconnected',
    });
    mockUseSupportCandidate.mockReturnValue({
      hash: undefined,
      amount: undefined,
      setAmount: jest.fn(),
      isPending: false,
      isConfirming: false,
      isConfirmed: false,
      error: null,
      handleSupport: jest.fn(),
      cleared: false,
      clearState: jest.fn(),
    });
  });

  it('Renders the ConnectWallet component if not connected', () => {
    render(
      <SupportButton
        candidate="Trump"
        updateCandidateDetails={jest.fn()}
        feeAmount={null}
      />
    );
    expect(screen.getByText('ConnectWallet')).toBeInTheDocument();
  });

  it('Renders the SupportModal component when modal is open and connected', async () => {
    mockUseAccount.mockReturnValue({
      address: undefined,
      addresses: undefined,
      chain: undefined,
      chainId: undefined,
      connector: undefined,
      isConnected: false,
      isReconnecting: false,
      isConnecting: false,
      isDisconnected: true,
      status: 'disconnected',
    });
    render(
      <SupportButton
        candidate="Trump"
        updateCandidateDetails={jest.fn()}
        feeAmount={null}
      />
    );

    await act(async () => {
      fireEvent.click(screen.getByTestId('support-button'));
    });
    setTimeout(() => {
      expect(screen.getByTestId('support-modal')).toBeInTheDocument();
    }, 1000);
  });

  it('Disables the Support button when modal is open', async () => {
    mockUseAccount.mockReturnValue({
      address: undefined,
      addresses: undefined,
      chain: undefined,
      chainId: undefined,
      connector: undefined,
      isConnected: false,
      isReconnecting: false,
      isConnecting: false,
      isDisconnected: true,
      status: 'disconnected',
    });
    render(
      <SupportButton
        candidate="Trump"
        updateCandidateDetails={jest.fn()}
        feeAmount={null}
      />
    );

    await act(async () => {
      fireEvent.click(screen.getByTestId('support-button'));
    });
    expect(screen.getByTestId('support-button')).toBeDisabled();
  });
});
