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
} from '@/components';
import { abi } from '@/abis/crowdfunding-abi';
import { config } from '@/app/config';

export default function Home() {
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
          <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
            <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
              Support a presidential candidate&nbsp;
              <code className="font-mono font-bold">with crypto!</code>
            </p>
            <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
              {isConnected ? (
                <Account closeShowConnect={() => setShowWallets(false)} />
              ) : (
                <ConnectButton onClick={() => setShowWallets(true)} />
              )}
            </div>
          </div>

          <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-2 lg:text-center">
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
