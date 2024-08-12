import React from 'react';
import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi';
import { Button, Code } from '@nextui-org/react';

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
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-end',
      }}
    >
      {ensAvatar ? <img src={ensAvatar} alt="ENS Avatar" /> : <></>}
      {address && (
        <Code style={{ marginBottom: 10 }}>
          {ensName ? `${ensName} (${address})` : address}
        </Code>
      )}
      <Button color="primary" onClick={() => disconnect()}>
        Disconnect
      </Button>
    </div>
  );
}

export default Account;
