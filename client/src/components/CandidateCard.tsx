'use client';

import React from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
} from '@nextui-org/react';
import { parseUnits, formatUnits } from 'viem';

import { CandidateDetails, ContractDetails } from '@/types';
import { trumpDetails, kamalaDetails } from '@/constants/candidateDetails';
import FundingBar from './FundingBar';
import SupportButton from './SupportButton';

interface props {
  candidate: 'Trump' | 'Kamala';
  contractDetails: ContractDetails | null;
}

function CandidateCard({ candidate, contractDetails }: props) {
  let candidateDetails: CandidateDetails | null = null;

  if (candidate === 'Trump') {
    candidateDetails = trumpDetails;
  } else if (candidate === 'Kamala') {
    candidateDetails = kamalaDetails;
  }

  if (!candidateDetails) return <></>;

  const amountDonated =
    candidate === 'Trump'
      ? contractDetails?.amountTrump
      : contractDetails?.amountKamala;
  const numDonations =
    candidate === 'Trump'
      ? contractDetails?.numTrump
      : contractDetails?.numKamala;

  const weiDonated = BigInt(amountDonated || '');
  const etherDonated = formatUnits(weiDonated, 18);

  return (
    <Card>
      <CardHeader>
        <h2>{candidateDetails.name}</h2>
      </CardHeader>
      <CardBody>
        <div className="flex flex-row gap-4 justify-between align-middle">
          <div>
            <Image
              src={candidateDetails.image}
              width={500}
              height={571}
              style={{ width: 500, height: 'auto', zIndex: 2 }}
            />
            <h3>{candidateDetails.party}</h3>
            <h3>Age: {candidateDetails.age}</h3>
            <h3>Stance on Crypto</h3>
            <p>{candidateDetails.stanceOnCrypto}</p>
          </div>
          <FundingBar />
        </div>
      </CardBody>
      <CardFooter>
        <div className="flex flex-row gap-4 justify-between items-center w-full">
          <SupportButton candidate={candidate} />
          {contractDetails && (
            <>
              <h3>{etherDonated} ETH Raised</h3>
              <h3>
                {numDonations} Donation
                {numDonations && numDonations > 1 ? 's' : ''}
              </h3>
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}

export default CandidateCard;
