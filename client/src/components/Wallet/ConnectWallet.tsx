import React from 'react';
import { useAccount } from 'wagmi';

import WalletOptions from './WalletOptions';

interface Props {
  modalOpen: boolean;
  setModalOpen(b: boolean): void;
}

export default function ConnectWallet({ modalOpen, setModalOpen }: Props) {
  const { isConnected } = useAccount();
  if (isConnected) return <></>;
  return (
    <WalletOptions
      modalOpen={isConnected ? false : modalOpen}
      setModalOpen={setModalOpen}
    />
  );
}
