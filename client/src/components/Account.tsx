import React, { useState, useEffect } from 'react';
import {
  useAccount,
  useDisconnect,
  // useEnsAvatar,
  useEnsName,
} from 'wagmi';
import { Button, Code, Tooltip } from '@nextui-org/react';

import { shortenAddress, copyAddress } from '@/utils';

function Account(): JSX.Element {
  // Hooks
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  // const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

  // State to track if we're on the client side
  const [isClient, setIsClient] = useState<boolean>(false);
  const [addressCopied, setAddressCopied] = useState<boolean>(false);

  // Set the isClient flag when the component mounts on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle copying the address
  const handleCopy = () => {
    if (isClient && isConnected && address) {
      copyAddress(address);
      setAddressCopied(true);
      setTimeout(() => setAddressCopied(false), 2000); // Reset after 2 seconds
    }
  };

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
      <Tooltip
        data-testid="account-address-tooltip"
        content={
          isClient && isConnected
            ? addressCopied
              ? 'Copied!'
              : 'Copy address'
            : ''
        }
      >
        <Code
          style={{ marginBottom: 10, cursor: 'pointer' }}
          onClick={() =>
            isClient && isConnected && address ? handleCopy() : {}
          }
        >
          {isClient && isConnected
            ? ensName
              ? `${ensName} (${ethAddress})`
              : ethAddress
            : 'Loading...'}
        </Code>
      </Tooltip>
      <Button color="secondary" className="w-fit" onClick={() => disconnect()}>
        Disconnect
      </Button>
    </div>
  );
}

export default Account;
