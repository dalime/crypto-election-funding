'use client';

import { useState, useEffect } from 'react';
import { Connector, useConnect, useAccount } from 'wagmi';
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@nextui-org/react';

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
    <Button
      color="default"
      disabled={!ready}
      onClick={onClick}
      className="text-left"
    >
      {renderIcon(connector)}
      {connector.name}
    </Button>
  );
}

interface WalletOptionsProps {
  modalOpen: boolean;
  setModalOpen(b: boolean): void;
}

function WalletOptions({ modalOpen, setModalOpen }: WalletOptionsProps) {
  // Hooks
  const { connectors, connect } = useConnect();

  return (
    <Modal isOpen={modalOpen} onOpenChange={() => setModalOpen(!modalOpen)}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Connect Wallet
        </ModalHeader>
        <ModalBody>
          {connectors.map((connector: Connector) => (
            <WalletOption
              key={connector.uid}
              connector={connector}
              onClick={() => connect({ connector })}
            />
          ))}
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
}

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
