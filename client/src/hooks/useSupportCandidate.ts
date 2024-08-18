import { useState, useEffect } from 'react';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { abi } from '@/abis/crowdfunding-abi';

export const useSupportCandidate = (
  candidate: 'Trump' | 'Kamala',
  updateCandidateDetails: (amount: number) => void
) => {
  const { data: hash, error, writeContract, isPending, isSuccess } =
    useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const [amount, setAmount] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (isConfirmed) {
      if (amount && candidate) updateCandidateDetails(parseFloat(amount.toString()));
    }
  }, [isConfirmed]);

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

  return {
    hash,
    amount,
    setAmount,
    isPending,
    isConfirming,
    isConfirmed,
    error,
    handleSupport,
  };
};