import React from 'react';
import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi';
import { Button, Code } from '@nextui-org/react';
import { useMediaQuery } from 'react-responsive';

import { shortenAddress } from '@/utils';

function Account(): JSX.Element {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });
  const isMobile = useMediaQuery({ query: '(max-width: 500px)' });

  const ethAddress = isMobile && address ? shortenAddress(address) : address;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-end',
        width: '100%',
      }}
    >
      {ensAvatar ? <img src={ensAvatar} alt="ENS Avatar" /> : <></>}
      {ethAddress && (
        <Code style={{ marginBottom: 10 }}>
          {ensName ? `${ensName} (${ethAddress})` : ethAddress}
        </Code>
      )}
      <Button color="primary" onClick={() => disconnect()}>
        Disconnect
      </Button>
    </div>
  );
}

export default Account;
