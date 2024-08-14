'use client';

import { useState } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import { mainnet, sepolia } from 'viem/chains';

import { ContractDetails } from '@/types';
import {
  Account,
  CandidateCard,
  ConnectButton,
  ConnectWallet,
  FundingBar,
} from '@/components';
import { abi } from '@/abis/crowdfunding-abi';
import { config } from '@/app/config';

export default function Home() {
  // Constants
  const contractAddress =
    (process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}` | undefined) ??
    '0x0000000000000000000000000000000000000000';
  config.setState((x) => ({
    ...x,
    chainId: x.current ? x.chainId : mainnet.id,
  }));

  // Hooks
  const { isConnected } = useAccount();
  const result = useReadContract({
    abi,
    address: contractAddress,
    functionName: 'readDetails',
    config,
    chainId: sepolia.id,
  });

  // State
  const [showWallets, setShowWallets] = useState<boolean>(false);

  const resultDataArr: any = result.data;
  const resultData: ContractDetails | null =
    result && result.data && (result.data as BigInt[]).length === 4
      ? {
          amountTrump: Number(resultDataArr[0]),
          numTrump: Number(resultDataArr[1]),
          amountKamala: Number(resultDataArr[2]),
          numKamala: Number(resultDataArr[3]),
        }
      : null;

  return (
    <main className="dark text-foreground bg-background flex min-h-screen flex-col items-center justify-between p-24">
      {showWallets && !isConnected ? (
        <ConnectWallet closeShowConnect={() => setShowWallets(false)} />
      ) : (
        <>
          <div className="z-10 w-full items-center justify-between font-mono text-sm lg:flex">
            <h1 className="text-xl font-bold fixed left-0 top-0 flex w-full justify-center pb-6 pt-8 lg:static lg:w-auto ">
              Support a presidential candidate with&nbsp;
              <code className="font-mono font-bold">Crypto!</code>
            </h1>
            <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
              {isConnected ? (
                <Account closeShowConnect={() => setShowWallets(false)} />
              ) : (
                <ConnectButton onClick={() => setShowWallets(true)} />
              )}
            </div>
          </div>

          <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:grid-cols-2 lg:text-center mt-4 gap-5">
            <CandidateCard
              candidate="Trump"
              contractDetails={result && result.data ? resultData : null}
            />
            <CandidateCard
              candidate="Kamala"
              contractDetails={result && result.data ? resultData : null}
            />
          </div>
        </>
      )}
    </main>
  );
}
