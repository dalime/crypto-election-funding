'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@nextui-org/react';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { ethers } from 'ethers';

function ConnectButton() {
  const [web3Modal, setWeb3Modal] = useState<Web3Modal | null>(null);

  useEffect(() => {
    const infuraId = process.env.NEXT_PUBLIC_INFURA_ID || '';
    console.log('infuraId', infuraId);

    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId,
        },
      },
    };

    const modal = new Web3Modal({
      cacheProvider: true,
      providerOptions,
    });

    setWeb3Modal(modal);
  }, []);

  const connectWallet = async () => {
    if (!web3Modal) return;

    try {
      const instance = await web3Modal.connect();
      const provider = new ethers.JsonRpcProvider(instance);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      console.log('Connected address:', address);
    } catch (error) {
      console.error('Could not connect to wallet', error);
    }
  };

  return (
    <Button color="secondary" onClick={connectWallet}>
      Connect Wallet
    </Button>
  );
}

export default ConnectButton;
