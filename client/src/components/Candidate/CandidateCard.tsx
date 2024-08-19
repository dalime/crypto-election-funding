import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/react';
import { formatUnits } from 'viem';

import { ContractDetails } from '@/types';
import { useCandidateDetails } from '@/hooks/useCandidateDetails';
import FundingBar from '../FundingBar';
import CandidateInfo from './CandidateInfo';
import CandidateFooter from './CandidateFooter';

interface Props {
  candidate: 'Trump' | 'Kamala';
  contractDetails: ContractDetails | null;
  feeAmount: number | null;
}

function CandidateCard({ candidate, contractDetails, feeAmount }: Props) {
  const candidateDetails = useCandidateDetails(candidate);
  if (!candidateDetails) return null;

  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [amount, setAmount] = useState<number>(0);
  const [num, setNum] = useState<number>(0);

  useEffect(() => {
    setIsClient(true);

    // Check for media queries on client-side
    setIsMobile(window.innerWidth <= 640);
    setIsTablet(window.innerWidth <= 1024 && window.innerWidth > 640);

    const weiDonated = BigInt(
      candidate === 'Trump'
        ? contractDetails?.amountTrump || ''
        : contractDetails?.amountKamala || ''
    );
    const ethDonated = parseFloat(formatUnits(weiDonated, 18));

    setAmount(ethDonated);
    setNum(
      candidate === 'Trump'
        ? contractDetails?.numTrump || 0
        : contractDetails?.numKamala || 0
    );
  }, [candidate, contractDetails]);

  const updateCandidateDetails = (newDonation: number): void => {
    const newAmount = amount + newDonation;
    setAmount(newAmount);
    setNum(num + 1);
  };

  return (
    <Card>
      <CardHeader className="z-0">
        <h2 className="font-bold text-2xl mt-2">{candidateDetails.name}</h2>
      </CardHeader>
      <CardBody>
        {isClient ? (
          <div
            className={`flex flex-row gap-${isMobile ? 1 : 2} justify-between items-start h-full`}
          >
            <CandidateInfo
              details={candidateDetails}
              isMobile={isMobile}
              isTablet={isTablet}
            />
            <FundingBar amount={amount} />
          </div>
        ) : (
          <div className="flex flex-row justify-between items-start h-full">
            <div>Loading...</div>
          </div>
        )}
      </CardBody>
      <CardFooter>
        <CandidateFooter
          candidate={candidate}
          amount={amount}
          num={num}
          updateCandidateDetails={updateCandidateDetails}
          contractDetails={contractDetails}
          feeAmount={feeAmount ? feeAmount : 0}
        />
      </CardFooter>
    </Card>
  );
}

export default CandidateCard;
