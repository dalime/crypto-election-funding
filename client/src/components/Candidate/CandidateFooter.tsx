import React from 'react';

import { ContractDetails } from '@/types';
import { roundTo6Decimals } from '@/utils';
import SupportButton from '../Support/SupportButton';

interface Props {
  candidate: 'Trump' | 'Kamala';
  amount: number;
  num: number;
  updateCandidateDetails: (newDonation: number) => void;
  contractDetails: ContractDetails | null;
}

const CandidateFooter: React.FC<Props> = ({
  candidate,
  amount,
  num,
  updateCandidateDetails,
  contractDetails,
}) => (
  <div className="flex flex-row gap-4 justify-between items-center w-full m-2">
    <SupportButton
      candidate={candidate}
      updateCandidateDetails={updateCandidateDetails}
    />
    {contractDetails && (
      <>
        <h3>{amount ? roundTo6Decimals(amount) : 0} ETH Raised</h3>
        <h3>
          {num} Donation
          {!num || num !== 1 ? 's' : ''}
        </h3>
      </>
    )}
  </div>
);

export default CandidateFooter;
