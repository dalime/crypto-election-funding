import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import CandidateCard from '../CandidateCard';
import { ContractDetails } from '@/types';
import { useCandidateDetails } from '@/hooks/useCandidateDetails';

jest.mock('@/hooks/useCandidateDetails', () => ({
  useCandidateDetails: jest.fn(),
}));

jest.mock('@nextui-org/react', () => ({
  Card: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  CardHeader: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  CardBody: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  CardFooter: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

jest.mock('@/components/FundingBar', () => ({ amount }: { amount: number }) => (
  <div>{`Funding Bar: ${amount} ETH`}</div>
));

jest.mock('../CandidateInfo', () => ({
  __esModule: true,
  default: ({ details, isMobile, isTablet }: any) => (
    <div>
      <p>{details.name}</p>
      <p>{isMobile ? 'Mobile View' : isTablet ? 'Tablet View' : 'Desktop View'}</p>
    </div>
  ),
}));

jest.mock('../CandidateFooter', () => ({
  __esModule: true,
  default: ({ amount, num }: any) => (
    <div>{`${amount} ETH Raised, ${num} Donations`}</div>
  ),
}));

describe('CandidateCard Component', () => {
  const contractDetails: ContractDetails = {
    amountTrump: 5000000000000000000, // 5 ETH
    numTrump: 3,
    amountKamala: 3000000000000000000, // 3 ETH
    numKamala: 2,
  };

  beforeEach(() => {
    (useCandidateDetails as jest.Mock).mockReturnValue({
      name: 'Donald Trump',
      age: 75,
      party: 'Republican',
      stanceOnCrypto: 'Pro-cryptocurrency',
      image: 'trump.jpg',
    });
  });

  it('Renders the candidate details correctly', async () => {
    render(<CandidateCard candidate="Trump" contractDetails={contractDetails} feeAmount={2} />);

    const candidateNameH2 = screen.getByTestId('candidate-name-h2');

    expect(candidateNameH2.textContent).toBe('Donald Trump');
    await waitFor(() =>
      expect(screen.getByText('5 ETH Raised, 3 Donations')).toBeInTheDocument()
    );
    expect(screen.getByText('Funding Bar: 5 ETH')).toBeInTheDocument();
  });

  it('Displays mobile view when isMobile is true', async () => {
    window.innerWidth = 600; // Set width to mobile size
    render(<CandidateCard candidate="Trump" contractDetails={contractDetails} feeAmount={2} />);

    await waitFor(() =>
      expect(screen.getByText('Mobile View')).toBeInTheDocument()
    );
  });

  it('Displays tablet view when isTablet is true', async () => {
    window.innerWidth = 800; // Set width to tablet size
    render(<CandidateCard candidate="Trump" contractDetails={contractDetails} feeAmount={2} />);

    await waitFor(() =>
      expect(screen.getByText('Tablet View')).toBeInTheDocument()
    );
  });
});