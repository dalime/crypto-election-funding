import React from 'react';
import { Button } from '@nextui-org/react';

function ConnectButton({ onClick }: { onClick: () => void }) {
  return (
    <Button color="secondary" onClick={onClick} className="w-full">
      Connect Wallet
    </Button>
  );
}

export default ConnectButton;
