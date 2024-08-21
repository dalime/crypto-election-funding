import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CandidateFooter from '../CandidateFooter';

import { ContractDetails } from '@/types';

jest.mock('../../Support/SupportButton', () => () => <button>Support</button>);

describe('CandidateFooter Component', () => {
  const mockContractDetails: ContractDetails = {
    amountTrump: 0,
    amountKamala: 0,
    numTrump: 0,
    numKamala: 0,
  }

  const mockProps = {
    candidate: 'Trump' as 'Trump',
    amount: 1.234567,
    num: 5,
    updateCandidateDetails: jest.fn(),
    contractDetails: mockContractDetails,
    feeAmount: 2,
  };

  it('Renders the SupportButton component', () => {
    render(<CandidateFooter {...mockProps} />);
    expect(screen.getByText('Support')).toBeInTheDocument();
  });

  it('Displays the correct ETH amount raised', () => {
    render(<CandidateFooter {...mockProps} />);
    expect(screen.getByText('1.234567 ETH Raised')).toBeInTheDocument();
  });

  it('Displays the correct number of donations', () => {
    render(<CandidateFooter {...mockProps} />);
    expect(screen.getByText('5 Donations')).toBeInTheDocument();
  });

  it('Handles singular donation count correctly', () => {
    const singularProps = { ...mockProps, num: 1 };
    render(<CandidateFooter {...singularProps} />);
    expect(screen.getByText('1 Donation')).toBeInTheDocument();
  });

  it('Handles zero donations correctly', () => {
    const zeroDonationsProps = { ...mockProps, num: 0 };
    render(<CandidateFooter {...zeroDonationsProps} />);
    expect(screen.getByText('0 Donations')).toBeInTheDocument();
  });

  it('Does not display ETH raised or donation count if contractDetails is null', () => {
    const noContractProps = { ...mockProps, contractDetails: null };
    render(<CandidateFooter {...noContractProps} />);
    expect(screen.queryByText('1.234567 ETH Raised')).not.toBeInTheDocument();
    expect(screen.queryByText('5 Donations')).not.toBeInTheDocument();
  });
});