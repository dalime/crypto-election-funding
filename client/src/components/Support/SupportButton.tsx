import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { Button } from '@nextui-org/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDemocrat, faRepublican } from '@fortawesome/free-solid-svg-icons';

import { useSupportCandidate } from '@/hooks/useSupportCandidate';
import ConnectWallet from '../Wallet/ConnectWallet';
import SupportModal from './SupportModal';

interface SupportButtonProps {
  candidate: 'Trump' | 'Kamala';
  updateCandidateDetails: (amount: number) => void;
  feeAmount: number | null;
}

const SupportButton: React.FC<SupportButtonProps> = ({
  candidate,
  updateCandidateDetails,
  feeAmount,
}) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [isClient, setIsClient] = useState(false);
  const { isConnected } = useAccount();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const candidateFullName =
    candidate === 'Trump' ? 'Donald Trump' : 'Kamala Harris';

  const {
    hash,
    amount,
    setAmount,
    isPending,
    isConfirming,
    isConfirmed,
    error,
    handleSupport,
    cleared,
    clearState,
  } = useSupportCandidate(candidate, updateCandidateDetails);

  if (!isClient) {
    return <Button disabled>Loading...</Button>;
  }

  return (
    <>
      {isConnected ? (
        modalOpen && (
          <SupportModal
            candidateFullName={candidateFullName}
            feeAmount={feeAmount}
            hash={hash}
            amount={amount}
            setAmount={setAmount}
            isPending={isPending}
            isConfirming={isConfirming}
            isConfirmed={isConfirmed}
            error={error}
            handleSupport={handleSupport}
            supportStateCleared={cleared}
            clearSupportState={clearState}
            onClose={() => setModalOpen(false)}
          />
        )
      ) : (
        <ConnectWallet modalOpen={modalOpen} setModalOpen={setModalOpen} />
      )}
      <Button
        disabled={modalOpen}
        color="primary"
        onClick={() => setModalOpen(true)}
      >
        <FontAwesomeIcon
          icon={candidate === 'Trump' ? faRepublican : faDemocrat}
          style={{ marginLeft: 5 }}
          color="#ffffff"
        />
        Support
      </Button>
    </>
  );
};

export default SupportButton;
