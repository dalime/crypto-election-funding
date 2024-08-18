'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/react';
import { formatUnits } from 'viem';
import { useMediaQuery } from 'react-responsive';

import { ContractDetails } from '@/types';
import { useCandidateDetails } from '@/hooks/useCandidateDetails';
import FundingBar from '../FundingBar';
import CandidateInfo from './CandidateInfo';
import CandidateFooter from './CandidateFooter';

interface Props {
  candidate: 'Trump' | 'Kamala';
  contractDetails: ContractDetails | null;
}

function CandidateCard({ candidate, contractDetails }: Props) {
  const candidateDetails = useCandidateDetails(candidate);
  if (!candidateDetails) return null;

  const isMobile = useMediaQuery({ query: '(max-width: 640px)' });
  const isTablet = useMediaQuery({ query: '(max-width: 1024px)' });

  const amountDonated =
    candidate === 'Trump'
      ? contractDetails?.amountTrump
      : contractDetails?.amountKamala;
  const numDonations =
    candidate === 'Trump'
      ? contractDetails?.numTrump
      : contractDetails?.numKamala;

  const weiDonated = BigInt(amountDonated || '');
  const ethDonated = formatUnits(weiDonated, 18);

  const [amount, setAmount] = useState<number>(parseFloat(ethDonated));
  const [num, setNum] = useState<number>(numDonations || 0);

  useEffect(() => {
    setAmount(parseFloat(ethDonated));
    setNum(numDonations || 0);
  }, [ethDonated, numDonations]);

  const updateCandidateDetails = (newDonation: number): void => {
    const newAmount = parseFloat(ethDonated) + newDonation;
    setAmount(newAmount);
    setNum(num + 1);
  };

  return (
    <Card>
      <CardHeader className="z-0">
        <h2 className="font-bold text-2xl mt-2">{candidateDetails.name}</h2>
      </CardHeader>
      <CardBody>
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
      </CardBody>
      <CardFooter>
        <CandidateFooter
          candidate={candidate}
          amount={amount}
          num={num}
          updateCandidateDetails={updateCandidateDetails}
          contractDetails={contractDetails}
        />
      </CardFooter>
    </Card>
  );
}

export default CandidateCard;
