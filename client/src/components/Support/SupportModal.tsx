import React, { useContext } from 'react';
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
  Spinner,
} from '@nextui-org/react';
import { type WriteContractErrorType } from '@wagmi/core';
import { type BaseError, useChainId } from 'wagmi';
import { sepolia } from 'viem/chains';

import { EthPriceContext } from '@/contexts';
import { shortenAddress, copyAddress, formatToUSD } from '@/utils';
import { CopySVG } from '@/assets/svg';
import EthereumPrice from '../Ethereum/EthereumPrice';

interface SupportModalProps {
  candidateFullName: string;
  feeAmount: number | null;
  hash: `0x${string}` | undefined;
  amount: string | undefined;
  setAmount: (value: string | undefined) => void;
  isPending: boolean;
  isConfirming: boolean;
  isConfirmed: boolean;
  error: WriteContractErrorType | null;
  handleSupport: (e: React.FormEvent<HTMLFormElement>) => void;
  supportStateCleared: boolean;
  clearSupportState: () => void;
  onClose: () => void;
}

const SupportModal: React.FC<SupportModalProps> = ({
  candidateFullName,
  feeAmount,
  amount,
  hash,
  setAmount,
  isPending,
  isConfirming,
  isConfirmed,
  error,
  handleSupport,
  supportStateCleared,
  clearSupportState,
  onClose,
}) => {
  // Context
  const ethPrices = useContext(EthPriceContext);

  // Chain ID
  const chainId = useChainId();

  /**
   * Opens the etherscan link for the transaction
   * @param hash `0x${string}`
   */
  const openEtherscan = (hash: `0x${string}`): void => {
    const etherscanUrl =
      chainId === sepolia.id
        ? `https://sepolia.etherscan.io/tx/${hash}`
        : `https://etherscan.io/tx/${hash}`;
    window.open(etherscanUrl, '_blank', 'noopener,noreferrer');
  };

  /**
   * Handles clearing the support state
   * @param e React.MouseEvent<HTMLButtonElement, MouseEvent>
   */
  const clearState = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.preventDefault();
    clearSupportState();
  };

  /**
   * Renders a progress bar for the transaction
   * @param finished boolean | undefined
   * @returns JSX.Element
   */
  const renderProgress = (finished?: boolean): JSX.Element => (
    <Progress
      size="sm"
      isIndeterminate={!finished}
      aria-label={finished ? 'Sent' : 'Sending...'}
      className="max-w-md"
      value={finished ? 100 : undefined}
      color={error ? 'danger' : finished ? 'success' : 'primary'}
    />
  );

  return (
    <Modal data-testid="support-modal" isOpen={true} onOpenChange={onClose}>
      <ModalContent>
        <form onSubmit={handleSupport}>
          <ModalHeader className="flex flex-col gap-1">
            <h2>Send ETH to {candidateFullName}'s Campaign</h2>
          </ModalHeader>
          <ModalBody>
            {ethPrices && (
              <EthereumPrice
                ethPrice={ethPrices[0].current_price}
                ethSupport={amount}
              />
            )}
            <Input
              label="Amount in ETH"
              type="number"
              name="ethAmount"
              placeholder="Enter amount in ETH"
              value={amount !== undefined ? amount.toString() : ''}
              onChange={(e) => {
                const value = e.target.value;
                if (value === '') {
                  setAmount(undefined);
                } else {
                  // Only set the parsed float value if it's a valid number
                  setAmount(value);
                }
              }}
              disabled={
                !supportStateCleared &&
                (isPending || isConfirming || isConfirmed)
              }
              description={
                <span data-testid="support-modal-input-usd">
                  {ethPrices && ethPrices[0].current_price && amount
                  ? `Approx. ${formatToUSD(parseFloat(amount) * ethPrices[0].current_price)}`
                  : ''}
                </span>
              }
              style={{ fontSize: 16 }}
            />
            {hash && !supportStateCleared && (
              <div className="w-full max-w-full">
                <p>Transaction Hash:</p>
                <Tooltip content="View on Etherscan">
                  <Code
                    style={{ cursor: 'pointer' }}
                    onClick={() => openEtherscan(hash)}
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
            {isConfirming && !supportStateCleared && (
              <div className="w-full max-w-full">
                <p>Waiting for confirmation...</p>
                {renderProgress()}
              </div>
            )}
            {isConfirmed && !supportStateCleared && (
              <div className="w-full max-w-full">
                <p>Transaction confirmed!</p>
                {renderProgress(true)}
              </div>
            )}
            {error && !supportStateCleared && (
              <div className="w-full max-w-full">
                <p className="text-red-500">
                  Error: {(error as BaseError).shortMessage || error.message}
                </p>
              </div>
            )}
          </ModalBody>
          <ModalFooter className="justify-between">
            {feeAmount ? (
              <p className="text-xs text-left flex items-center justify-center text-foreground-500">
                This dApp charges a {feeAmount}% service fee
              </p>
            ) : (
              <></>
            )}
            <div className="flex flex-row justify-end items-center">
              <Button
                disabled={isPending}
                color="default"
                variant="light"
                onPress={onClose}
              >
                Close
              </Button>
              <Button
                disabled={isPending || isConfirming || !!error}
                color={isPending || isConfirming ? 'default' : 'primary'}
                type={!supportStateCleared && isConfirmed ? 'button' : 'submit'}
                onClick={
                  !supportStateCleared && isConfirmed ? clearState : undefined
                }
              >
                {!supportStateCleared && isConfirmed ? (
                  'Support Again'
                ) : isPending || isConfirming ? (
                  <Spinner size="sm" />
                ) : (
                  'Support'
                )}
              </Button>
            </div>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default SupportModal;
