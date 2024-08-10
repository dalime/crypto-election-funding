'use client';

import { useState, useEffect } from 'react';
import { Connector, useConnect, useAccount } from 'wagmi';
import { Button } from '@nextui-org/react';

import Account from './Account';
import {
  CoinbaseSVG,
  InjectedSVG,
  MetaMaskSVG,
  PhantomSVG,
  SafeSVG,
  WalletConnectSVG,
} from '@/assets/svg';

function WalletOption({
  connector,
  onClick,
}: {
  connector: Connector;
  onClick: () => void;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      const provider = await connector.getProvider();
      setReady(!!provider);
    })();
  }, [connector]);

  const renderIcon = (connector: Connector): JSX.Element => {
    switch (connector.name) {
      case 'Coinbase Wallet':
        return <CoinbaseSVG />;
      case 'Injected':
        return <InjectedSVG />;
      case 'MetaMask':
        return <MetaMaskSVG />;
      case 'Phantom':
        return <PhantomSVG />;
      case 'Safe':
        return <SafeSVG />;
      case 'WalletConnect':
        return <WalletConnectSVG />;
      default:
        return <></>;
    }
  };

  return (
    <Button color="default" disabled={!ready} onClick={onClick}>
      {renderIcon(connector)}
      {connector.name}
    </Button>
  );
}

function WalletOptions() {
  const { connectors, connect } = useConnect();

  return connectors.map((connector: Connector) => (
    <WalletOption
      key={connector.uid}
      connector={connector}
      onClick={() => connect({ connector })}
    />
  ));
}

export default function ConnectWallet() {
  const { isConnected } = useAccount();
  if (isConnected) return <Account />;
  return <WalletOptions />;
}
