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
    <div className="flex flex-col justify-center items-end w-full">
      {ensAvatar ? (
        <img
          src={ensAvatar}
          alt="ENS Avatar"
          width="40"
          height="40"
          style={{
            width: 40,
            height: 40,
            objectFit: 'cover',
            borderRadius: '50%',
          }}
        />
      ) : (
        <></>
      )}
      {ethAddress && (
        <Code style={{ marginBottom: 10 }}>
          {ensName ? `${ensName} (${ethAddress})` : ethAddress}
        </Code>
      )}
      <Button color="primary" className="w-fit" onClick={() => disconnect()}>
        Disconnect
      </Button>
    </div>
  );
}

export default Account;
