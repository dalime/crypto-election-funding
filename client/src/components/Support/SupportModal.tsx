import React from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Button,
  Progress,
  Code,
  Tooltip,
} from '@nextui-org/react';
import { type WriteContractErrorType } from '@wagmi/core';
import { type BaseError } from 'wagmi';

import { shortenAddress, copyAddress } from '@/utils';
import { CopySVG } from '@/assets/svg';

interface SupportModalProps {
  candidateFullName: string;
  hash: `0x${string}` | undefined;
  amount: number | undefined;
  setAmount: (value: number | undefined) => void;
  isPending: boolean;
  isConfirming: boolean;
  isConfirmed: boolean;
  error: WriteContractErrorType | null;
  handleSupport: (e: React.FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
}

const SupportModal: React.FC<SupportModalProps> = ({
  candidateFullName,
  amount,
  hash,
  setAmount,
  isPending,
  isConfirming,
  isConfirmed,
  error,
  handleSupport,
  onClose,
}) => {
  const renderProgress = (finished?: boolean): JSX.Element => (
    <Progress
      size="sm"
      isIndeterminate={finished ? false : true}
      aria-label={finished ? 'Sent' : 'Sending...'}
      className="max-w-md"
      value={finished ? 100 : undefined}
    />
  );

  return (
    <Modal isOpen={true} onOpenChange={onClose}>
      <ModalContent>
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
            {hash && (
              <div className="w-full max-w-full">
                <p>Transaction Hash:</p>
                <Tooltip content="View on Etherscan">
                  <Code
                    style={{ cursor: 'pointer' }}
                    onClick={() =>
                      window.open(
                        `https://sepolia.etherscan.io/tx/${hash}`,
                        '_blank',
                        'noopener,noreferrer'
                      )
                    }
                  >
                    {shortenAddress(hash, 11)}
                  </Code>
                </Tooltip>
                <Tooltip content="Copy address">
                  <Button
                    isIconOnly
                    color="default"
                    onClick={() => copyAddress(hash)}
                  >
                    <CopySVG
                      style={{ width: 18, height: 18, color: '#ffffff' }}
                    />
                  </Button>
                </Tooltip>
              </div>
            )}
            {isConfirming && (
              <div className="w-full max-w-full">
                <p>Waiting for confirmation...</p>
                {renderProgress()}
              </div>
            )}
            {isConfirmed && (
              <div className="w-full max-w-full">
                <p>Transaction confirmed.</p>
                {renderProgress(true)}
              </div>
            )}
            {error && (
              <div className="w-full max-w-full">
                <p className="text-red-500">
                  Error: {(error as BaseError).shortMessage || error.message}
                </p>
              </div>
            )}
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
            <Button
              disabled={
                isPending || isConfirming || isConfirmed || error ? true : false
              }
              color="success"
              type="submit"
            >
              Support
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default SupportModal;
