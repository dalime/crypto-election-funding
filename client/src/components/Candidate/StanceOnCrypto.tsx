import React from 'react';
import { Button } from '@nextui-org/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBitcoinSign,
  faCaretDown,
  faCaretUp,
} from '@fortawesome/free-solid-svg-icons';

interface Props {
  stance: string;
  isMobile: boolean;
  expanded: boolean;
  toggleExpanded: () => void;
}

const StanceOnCrypto: React.FC<Props> = ({
  stance,
  isMobile,
  expanded,
  toggleExpanded,
}) => (
  <div>
    <p className="mb-2">
      <span data-testid="stance-on-crypto-text">
        <b>Stance on Crypto</b>
        <FontAwesomeIcon
          icon={faBitcoinSign}
          style={{ marginLeft: 5 }}
          color="#F2A900"
        />
        :{' '}
      {isMobile && !expanded ? `${stance.substring(0, 100)}...` : stance}
      </span>
    </p>
    {isMobile && (
      <Button
        onClick={toggleExpanded}
        variant="bordered"
        color="default"
        size="sm"
        style={{ width: 'fit-content', height: 'fit-content' }}
      >
        <FontAwesomeIcon icon={expanded ? faCaretUp : faCaretDown} size="xl" />
      </Button>
    )}
  </div>
);

export default StanceOnCrypto;
