import React from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
} from '@nextui-org/react';

import { CandidateDetails } from '@/types';
import { trumpDetails, kamalaDetails } from '@/constants/candidateDetails';
import FundingBar from './FundingBar';

interface props {
  candidate: 'Trump' | 'Kamala';
}

function CandidateCard({ candidate }: props) {
  let candidateDetails: CandidateDetails | null = null;

  if (candidate === 'Trump') {
    candidateDetails = trumpDetails;
  } else if (candidate === 'Kamala') {
    candidateDetails = kamalaDetails;
  }

  if (!candidateDetails) return <></>;

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
        <div className="flex flex-row gap-4">
          <Button>Support</Button>
          <h3>$40,0000 Raised</h3>
          <h3>$1,000 Donations</h3>
        </div>
      </CardFooter>
    </Card>
  );
}

export default CandidateCard;
