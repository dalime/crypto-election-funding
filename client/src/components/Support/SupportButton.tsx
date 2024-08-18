import React, { useState } from 'react';
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
}

const SupportButton: React.FC<SupportButtonProps> = ({
  candidate,
  updateCandidateDetails,
}) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { isConnected } = useAccount();
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
  } = useSupportCandidate(candidate, updateCandidateDetails);

  return (
    <>
      {isConnected ? (
        modalOpen && (
          <SupportModal
            candidateFullName={candidateFullName}
            hash={hash}
            amount={amount}
            setAmount={setAmount}
            isPending={isPending}
            isConfirming={isConfirming}
            isConfirmed={isConfirmed}
            error={error}
            handleSupport={handleSupport}
            onClose={() => setModalOpen(false)}
          />
        )
      ) : (
        <ConnectWallet modalOpen={modalOpen} setModalOpen={setModalOpen} />
      )}
      <Button
        disabled={modalOpen}
        color="success"
        onClick={() => setModalOpen(true)}
      >
        <FontAwesomeIcon
          icon={candidate === 'Trump' ? faRepublican : faDemocrat}
          style={{ marginLeft: 5 }}
          color="#000000"
        />
        Support
      </Button>
    </>
  );
};

export default SupportButton;
