'use client';

import { useState } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import { mainnet, sepolia } from 'viem/chains';
import { useMediaQuery } from 'react-responsive';

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
  const isMobile = useMediaQuery({ query: '(max-width: 500px)' });
  const isTablet = useMediaQuery({ query: '(max-width: 1024px)' });

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
    <main
      className={`dark text-foreground bg-background flex min-h-screen flex-col items-center justify-between p-${isMobile ? 6 : isTablet ? 10 : 24}`}
    >
      <ConnectWallet modalOpen={showWallets} setModalOpen={setShowWallets} />
      <div className="z-10 w-full items-center justify-between font-mono text-sm lg:flex">
        <h1
          className={`text-xl font-bold left-0 top-0 flex w-full justify-center pb-6 pt-8 lg:static lg:w-auto${isMobile ? ' hidden' : isTablet ? ' mt-32' : ''}`}
        >
          Support a presidential candidate with Crypto!
        </h1>
        <div
          className={`fixed top-0 right-0 flex w-full items-${isMobile ? 'center' : 'end'} justify-end lg:static lg:size-auto lg:bg-none bg-background p-7 z-50`}
        >
          {isMobile && (
            <h1 className={`text-sma font-bold`}>
              Support a presidential candidate with Crypto!
            </h1>
          )}
          {isConnected ? (
            <Account />
          ) : (
            <ConnectButton onClick={() => setShowWallets(true)} />
          )}
        </div>
      </div>

      <div
        className={`mb-10 grid text-center lg:mb-0 lg:w-full lg:grid-cols-2 lg:text-center mt-4 gap-5${isMobile ? ' mt-32' : ''}`}
      >
        <CandidateCard
          candidate="Trump"
          contractDetails={result && result.data ? resultData : null}
        />
        <CandidateCard
          candidate="Kamala"
          contractDetails={result && result.data ? resultData : null}
        />
      </div>
      <footer className={isMobile ? 'mt-5' : 'mt-10'}>
        <p>
          Created by Danny Lim{' '}
          <a href="https://github.com/dalime" target="_blank">
            (dalime)
          </a>
        </p>
      </footer>
    </main>
  );
}
