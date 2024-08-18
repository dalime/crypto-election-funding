import React from 'react';
import { Button, Code, Tooltip } from '@nextui-org/react';

function ConnectButton({
  isConnecting,
  onClick,
}: {
  isConnecting: boolean;
  onClick: () => void;
}) {
  return (
    <div className="flex flex-col justify-center items-end w-full">
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
          <Tooltip content="">
            <Code
              style={{ marginBottom: 10, cursor: 'pointer' }}
              onClick={() => {}}
            >
              Loading...
            </Code>
          </Tooltip>
        </>
      )}
      <Button
        color={isConnecting ? 'secondary' : 'primary'}
        onClick={onClick}
        className="w-full"
      >
        {isConnecting ? 'Disconnect' : 'Connect Wallet'}
      </Button>
    </div>
  );
}

export default ConnectButton;
