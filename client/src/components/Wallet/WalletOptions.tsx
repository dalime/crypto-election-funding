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

import WalletOption from './WalletOption';

interface WalletOptionsProps {
  modalOpen: boolean;
  setModalOpen(b: boolean): void;
}

export default function WalletOptions({
  modalOpen,
  setModalOpen,
}: WalletOptionsProps) {
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
