'use client';

import React, { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button,
} from '@nextui-org/react';
import { formatUnits } from 'viem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDemocrat,
  faRepublican,
  faBitcoinSign,
  faCaretDown,
  faCaretUp,
} from '@fortawesome/free-solid-svg-icons';
import { useMediaQuery } from 'react-responsive';

import { CandidateDetails, ContractDetails } from '@/types';
import { trumpDetails, kamalaDetails } from '@/constants/candidateDetails';
import { roundTo6Decimals } from '@/utils';
import SupportButton from './SupportButton';
import FundingBar from './FundingBar';

interface props {
  candidate: 'Trump' | 'Kamala';
  contractDetails: ContractDetails | null;
}

function CandidateCard({ candidate, contractDetails }: props) {
  // Conditional Rendering for candidate details
  let candidateDetails: CandidateDetails | null = null;
  if (candidate === 'Trump') {
    candidateDetails = trumpDetails;
  } else if (candidate === 'Kamala') {
    candidateDetails = kamalaDetails;
  }
  if (!candidateDetails) return <></>;

  // Hooks
  const isMobile = useMediaQuery({ query: '(max-width: 500px)' });
  const isTablet = useMediaQuery({ query: '(max-width: 1024px)' });

  // Constants
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

  // State
  const [amount, setAmount] = useState<number>(parseFloat(ethDonated));
  const [num, setNum] = useState<number>(numDonations || 0);
  const [mobileStanceExpanded, setMobileStanceExpanded] =
    useState<boolean>(false);

  // Effects
  useEffect(() => {
    setAmount(parseFloat(ethDonated));
    setNum(numDonations || 0);
  }, [ethDonated, numDonations]);

  /**
   * Updates the amount and number of donations for the candidate
   * @param newDonation number
   */
  const updateCandidateDetails = (newDonation: number): void => {
    const newAmount = parseFloat(ethDonated) + newDonation;
    setAmount(newAmount);
    setNum(num + 1);
  };

  const { name, age, party, stanceOnCrypto, image } = candidateDetails;

  return (
    <Card>
      <CardHeader>
        <h2 className="font-bold text-2xl mt-2">{name}</h2>
      </CardHeader>
      <CardBody>
        <div className="flex flex-row gap-2 justify-between items-start h-full">
          <div className="flex flex-col justify-start items-start">
            <Image
              src={image}
              width={500}
              height={571}
              style={{
                width: isMobile ? 250 : isTablet ? 300 : 500,
                height: isMobile ? 285 : isTablet ? 342 : 570,
                zIndex: 2,
                objectFit: 'cover',
              }}
            />
            <h3 className="font-bold text-xl mb-3 mt-3">
              {party}{' '}
              <FontAwesomeIcon
                icon={candidate === 'Trump' ? faRepublican : faDemocrat}
                style={{ marginLeft: 5 }}
                color={candidate === 'Trump' ? '#e9252b' : '#1fb1f4'}
              />
            </h3>
            <h3 className="font-bold text-large mb-3">Age: {age}</h3>
            <p className="mb-2">
              <span className="font-bold">
                Stance on Crypto
                <FontAwesomeIcon
                  icon={faBitcoinSign}
                  style={{ marginLeft: 5 }}
                  color="#F2A900"
                />
                :{' '}
              </span>
              <Button
                onClick={() => setMobileStanceExpanded(!mobileStanceExpanded)}
                variant="bordered"
                color="primary"
                size="sm"
                style={{ width: 'fit-content', height: 'fit-content' }}
              >
                <FontAwesomeIcon
                  icon={mobileStanceExpanded ? faCaretUp : faCaretDown}
                  size="xl"
                />
              </Button>
              {isTablet && mobileStanceExpanded === false
                ? `${stanceOnCrypto.substring(0, 100)}...`
                : stanceOnCrypto}
            </p>
          </div>
          <FundingBar amount={amount} num={num} candidate={candidate} />
        </div>
      </CardBody>
      <CardFooter>
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
      </CardFooter>
    </Card>
  );
}

export default CandidateCard;
