'use client';

import React, { useState, useEffect } from 'react';
import {
  type BaseError,
  useWriteContract,
  useWaitForTransactionReceipt,
  useAccount,
} from 'wagmi';
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from '@nextui-org/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDemocrat, faRepublican } from '@fortawesome/free-solid-svg-icons';

import { abi } from '@/abis/crowdfunding-abi';
import ConnectWallet from './Wallet/ConnectWallet';

function SupportButton({
  candidate,
  updateCandidateDetails,
}: {
  candidate: 'Trump' | 'Kamala';
  updateCandidateDetails: (amount: number) => void;
}) {
  // Hooks
  const {
    data: hash,
    error,
    writeContract,
    isPending,
    isSuccess,
  } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });
  const { isConnected } = useAccount();

  // State
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [amount, setAmount] = useState<number | undefined>(undefined);

  // Effects
  useEffect(() => {
    if (isConfirmed) {
      setModalOpen(false);
      if (amount && candidate)
        updateCandidateDetails(parseFloat(amount.toString()));
    }
  }, [isConfirmed]);

  // Constants
  const candidateFullName =
    candidate === 'Trump' ? 'Donald Trump' : 'Kamala Harris';

  /**
   * Handles form submission to support a candidate
   * @param e React.FormEvent<HTMLFormElement
   */
  const handleSupport = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '';

    if (!amount || amount <= 0) return alert('Please enter a valid amount.');

    if (contractAddress) {
      const weiValue = BigInt(Math.floor(amount * 1e18));

      writeContract({
        address: contractAddress as `0x${string}`,
        abi,
        functionName: 'support',
        args: [candidate],
        value: weiValue,
      });
    } else {
      alert('Contract address not found.');
    }
  };

  return (
    <>
      {isConnected ? (
        <Modal isOpen={modalOpen} onOpenChange={() => setModalOpen(!modalOpen)}>
          <ModalContent>
            {(onClose) => (
              <form onSubmit={handleSupport}>
                <ModalHeader className="flex flex-col gap-1">
                  Send ETH to {candidateFullName}'s Campaign
                </ModalHeader>
                <ModalBody>
                  <Input
                    label="Amount in ETH"
                    type="number"
                    name="ethAmount"
                    placeholder="Enter amount in ETH"
                    value={amount ? amount.toString() : undefined}
                    onChange={(e) => setAmount(e.target.valueAsNumber)}
                  />
                  <div>
                    Transaction Hash:
                    0xc13d7905be5c989378a945487cd2a1193627ae606009e28e296d48ddaec66162
                  </div>
                  {/* {isConfirming && <div>Waiting for confirmation...</div>}
                  {isConfirmed && <div>Transaction confirmed.</div>}
                  {error && (
                    <div>
                      Error:{' '}
                      {(error as BaseError).shortMessage || error.message}
                    </div>
                  )} */}
                </ModalBody>
                <ModalFooter>
                  <Button
                    disabled={isPending}
                    color="default"
                    variant="light"
                    onPress={onClose}
                  >
                    Close
                  </Button>
                  <Button disabled={isPending} color="success" type="submit">
                    Support
                  </Button>
                </ModalFooter>
              </form>
            )}
          </ModalContent>
        </Modal>
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
}

export default SupportButton;
