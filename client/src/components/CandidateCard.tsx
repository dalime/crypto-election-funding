'use client';

import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
} from '@nextui-org/react';
import { formatUnits } from 'viem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDemocrat, faRepublican } from '@fortawesome/free-solid-svg-icons';

import { CandidateDetails, ContractDetails } from '@/types';
import { trumpDetails, kamalaDetails } from '@/constants/candidateDetails';
import SupportButton from './SupportButton';
import FundingBar from './FundingBar';

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
  const ethDonated = formatUnits(weiDonated, 18);

  return (
    <Card>
      <CardHeader>
        <h2 className="font-bold text-2xl mt-2">{candidateDetails.name}</h2>
      </CardHeader>
      <CardBody>
        <div className="flex flex-row gap-2 justify-between items-end h-full">
          <div className="flex flex-col justify-start items-start">
            <Image
              src={candidateDetails.image}
              width={500}
              height={571}
              style={{ width: 500, height: 'auto', zIndex: 2 }}
            />
            <h3 className="font-bold text-xl mb-3 mt-3">
              {candidateDetails.party}{' '}
              <FontAwesomeIcon
                icon={candidate === 'Trump' ? faRepublican : faDemocrat}
                style={{ marginLeft: 5 }}
              />
            </h3>
            <h3 className="font-bold text-large mb-3">
              Age: {candidateDetails.age}
            </h3>
            <p className="mb-2">
              <span className="font-bold">Stance on Crypto: </span>
              {candidateDetails.stanceOnCrypto}
            </p>
          </div>
          <FundingBar
            amount={parseInt(ethDonated, 10)}
            num={numDonations}
            candidate={candidate}
          />
        </div>
      </CardBody>
      <CardFooter>
        <div className="flex flex-row gap-4 justify-between items-center w-full m-2">
          <SupportButton candidate={candidate} />
          {contractDetails && (
            <>
              <h3>{ethDonated} ETH Raised</h3>
              <h3>
                {numDonations} Donation
                {!numDonations || numDonations !== 1 ? 's' : ''}
              </h3>
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}

export default CandidateCard;
