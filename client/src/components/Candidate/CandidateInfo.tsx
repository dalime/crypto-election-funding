import React, { useState } from 'react';
import { Image } from '@nextui-org/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDemocrat, faRepublican } from '@fortawesome/free-solid-svg-icons';

import { CandidateDetails } from '@/types';
import StanceOnCrypto from './StanceOnCrypto';

interface Props {
  details: CandidateDetails;
  isMobile: boolean;
  isTablet: boolean;
}

const CandidateInfo: React.FC<Props> = ({ details, isMobile, isTablet }) => {
  const { name, age, party, stanceOnCrypto, image } = details;

  // State
  const [mobileStanceExpanded, setMobileStanceExpanded] =
    useState<boolean>(false);

  return (
    <div className="flex flex-col justify-start items-start p-3">
      <Image
        src={image}
        width={500}
        height={571}
        style={{
          width: isMobile ? '100%' : isTablet ? 300 : 500,
          height: isMobile ? 'auto' : isTablet ? 342 : 570,
          zIndex: 2,
          objectFit: 'cover',
        }}
      />
      <h3 className="font-bold text-xl mb-3 mt-3">
        {party}{' '}
        <FontAwesomeIcon
          icon={name === 'Donald Trump' ? faRepublican : faDemocrat}
          style={{ marginLeft: 5 }}
          color={name === 'Donald Trump' ? '#e9252b' : '#1fb1f4'}
        />
      </h3>
      <h3 className="font-bold text-large mb-3">Age: {age}</h3>
      <StanceOnCrypto
        stance={stanceOnCrypto}
        isMobile={isMobile}
        expanded={mobileStanceExpanded}
        toggleExpanded={() => setMobileStanceExpanded(!mobileStanceExpanded)}
      />
    </div>
  );
};

export default CandidateInfo;
