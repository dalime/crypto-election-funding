// app/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
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
  // Constants
  const contractAddress =
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ??
    '0x0000000000000000000000000000000000000000';

  config.setState((x) => ({
    ...x,
    chainId: x.current ? x.chainId : mainnet.id,
  }));

  // Hooks
  const { isConnected, isConnecting } = useAccount();
  const readDetailsResult = useReadContract({
    abi,
    address: contractAddress as `0x${string}`,
    functionName: 'readDetails',
    config,
    chainId: sepolia.id,
  });
  const feePercentageResult = useReadContract({
    abi,
    address: contractAddress as `0x${string}`,
    functionName: 'FEE_PERCENTAGE',
    config,
    chainId: sepolia.id,
  });

  // State
  const [showWallets, setShowWallets] = useState<boolean>(false);
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setIsMobile(window.innerWidth <= 500);
    setIsTablet(window.innerWidth <= 1024 && window.innerWidth > 500);
  }, []);

  const resultDataArr: any = readDetailsResult.data;
  const readDetailsResultData: ContractDetails | null =
    readDetailsResult &&
    readDetailsResult.data &&
    (readDetailsResult.data as BigInt[]).length === 4
      ? {
          amountTrump: Number(resultDataArr[0]),
          numTrump: Number(resultDataArr[1]),
          amountKamala: Number(resultDataArr[2]),
          numKamala: Number(resultDataArr[3]),
        }
      : null;

  return (
    <main
      className={`dark text-foreground bg-background flex min-h-screen flex-col items-center justify-between ${
        isClient ? `p-${isMobile ? 6 : isTablet ? 10 : 24}` : 'p-24'
      }`}
    >
      <ConnectWallet modalOpen={showWallets} setModalOpen={setShowWallets} />
      <div className="z-10 w-full items-center justify-between font-mono text-sm lg:flex">
        <h1
          className={`text-xl font-bold left-0 top-0 flex w-full justify-center pb-6 pt-8 lg:static lg:w-auto ${
            isClient ? (isMobile ? 'hidden' : isTablet ? 'mt-32' : '') : ''
          }`}
        >
          Support a presidential candidate with Crypto!
        </h1>
        <div
          className={`fixed top-0 right-0 flex w-full items-${
            isClient ? (isMobile ? 'center' : 'end') : 'end'
          } justify-end lg:static lg:size-auto lg:bg-none bg-background p-7 z-50`}
        >
          {isClient && isMobile && (
            <h1 className="text-sma font-bold">
              Support a presidential candidate with Crypto!
            </h1>
          )}
          {isConnected ? (
            <Account />
          ) : (
            <ConnectButton
              isConnecting={isConnecting}
              onClick={() => setShowWallets(true)}
            />
          )}
        </div>
      </div>

      <div
        className={`mb-10 grid text-center lg:mb-0 lg:w-full sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 lg:text-center gap-5 ${
          isClient ? (isMobile ? 'mt-32' : 'mt-4') : 'mt-4'
        }`}
      >
        <CandidateCard
          candidate="Trump"
          contractDetails={
            readDetailsResult && readDetailsResult.data
              ? readDetailsResultData
              : null
          }
          feeAmount={
            feePercentageResult && feePercentageResult.data
              ? Number(feePercentageResult.data)
              : null
          }
        />
        <CandidateCard
          candidate="Kamala"
          contractDetails={
            readDetailsResult && readDetailsResult.data
              ? readDetailsResultData
              : null
          }
          feeAmount={
            feePercentageResult && feePercentageResult.data
              ? Number(feePercentageResult.data)
              : null
          }
        />
      </div>
      <footer className={isClient && isMobile ? 'mt-5' : 'mt-10'}>
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
