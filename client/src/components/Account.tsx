import React from 'react';
import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi';
import { Button } from '@nextui-org/react';

interface Props {
  closeShowConnect(): void;
}

function Account({ closeShowConnect }: Props): JSX.Element {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

  const handleDisconnect = () => {
    disconnect();
    closeShowConnect();
  };

  return (
    <div>
      {ensAvatar ? <img src={ensAvatar} alt="ENS Avatar" /> : <></>}
      {address && <p>{ensName ? `${ensName} (${address})` : address}</p>}
      <Button color="primary" onClick={() => disconnect()}>
        Disconnect
      </Button>
    </div>
  );
}

export default Account;
