import { useState, useEffect } from 'react';
import { Connector } from 'wagmi';
import { Button } from '@nextui-org/react';

import {
  CoinbaseSVG,
  InjectedSVG,
  MetaMaskSVG,
  PhantomSVG,
  SafeSVG,
  WalletConnectSVG,
} from '@/assets/svg';

export default function WalletOption({
  connector,
  onClick,
}: {
  connector: Connector;
  onClick: () => void;
}) {
  const [ready, setReady] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

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
    <Button
      color="default"
      disabled={!ready}
      onClick={onClick}
      className="text-left"
    >
      {isClient ? renderIcon(connector) : null}
      {connector.name}
    </Button>
  );
}
