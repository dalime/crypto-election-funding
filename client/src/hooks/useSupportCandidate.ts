import { useState, useEffect } from 'react';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { abi } from '@/abis/crowdfunding-abi';

export const useSupportCandidate = (
  candidate: 'Trump' | 'Kamala',
  updateCandidateDetails: (amount: number) => void
) => {
  // Hooks
  const { data: hash, error, writeContract, isPending } =
    useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  // State
  const [amount, setAmount] = useState<string | undefined>(undefined);
  const [cleared, setCleared] = useState<boolean>(false);

  // Effects
  useEffect(() => {
    if (isConfirmed) {
      if (amount && candidate) updateCandidateDetails(parseFloat(amount.toString()));
    }
  }, [isConfirmed]);

  /**
   * Handles writing the support transaction to the contract
   * @param e React.FormEvent<HTMLFormElement>
   */
  const handleSupport = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '';

    if (!amount || parseFloat(amount) <= 0) return alert('Please enter a valid amount.');

    if (contractAddress) {
      try {
        const weiValue = BigInt(Math.floor(parseFloat(amount) * 1e18));
        const candidateName: string = candidate  === 'Trump' ? 'Trump' : 'Kamala';

        writeContract({
          address: contractAddress as `0x${string}`,
          abi: abi,
          functionName: 'support',
          args: [candidateName],
          value: weiValue,
        });
      } catch (error) {
        console.error('Write to contract error: ', error);
      }
    } else {
      alert('Contract address not found.');
    }
    setCleared(false);
  };

  /**
   * Clears the amount state
   */
  const clearState = () => {
    setAmount(undefined);
    setCleared(true);
  };

  return {
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
  };
};