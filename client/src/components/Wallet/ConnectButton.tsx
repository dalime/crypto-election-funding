import React from 'react';
import { Button, Code } from '@nextui-org/react';

function ConnectButton({
  isConnecting,
  onClick,
}: {
  isConnecting: boolean;
  onClick: () => void;
}) {
  return (
    <div>
      {isConnecting && (
        <>
          {/* <img
            src={'./placeholder-avatar.png'}
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
          <Code style={{ marginBottom: 10 }}>Loading...</Code>
        </>
      )}
      <Button
        color={isConnecting ? 'primary' : 'secondary'}
        onClick={onClick}
        className="w-full"
      >
        {isConnecting ? 'Disconnect' : 'Connect Wallet'}
      </Button>
    </div>
  );
}

export default ConnectButton;
