import React, { useState, useEffect } from 'react';
import {
  useAccount,
  useDisconnect,
  // useEnsAvatar,
  useEnsName
} from 'wagmi';
import { Button, Code } from '@nextui-org/react';

import { shortenAddress } from '@/utils';

function Account(): JSX.Element {
  // Hooks
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  // const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

  // State to track if we're on the client side
  const [isClient, setIsClient] = useState(false);

  // Set the isClient flag when the component mounts on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Render consistent content during SSR and client-side hydration
  const ethAddress = address ? shortenAddress(address) : '';

  return (
    <div className="flex flex-col justify-center items-end w-full">
      {/* <img
        src={
          isClient && isConnected && ensAvatar
            ? ensAvatar
            : './placeholder-avatar.png'
        }
        alt="ENS Avatar"
        width="40"
        height="40"
        style={{
          width: 40,
          height: 40,
          objectFit: 'cover',
          borderRadius: '50%',
        }}
      /> */}
      <Code style={{ marginBottom: 10 }}>
        {isClient && isConnected
          ? ensName
            ? `${ensName} (${ethAddress})`
            : ethAddress
          : 'Loading...'}
      </Code>
      <Button color="primary" className="w-fit" onClick={() => disconnect()}>
        Disconnect
      </Button>
    </div>
  );
}

export default Account;
