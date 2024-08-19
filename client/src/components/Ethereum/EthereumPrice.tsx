import React from 'react';
import { Code } from '@nextui-org/react';

import { formatToUSD } from '@/utils';
import { EthereumSVG } from '@/assets/svg';

interface Props {
  ethPrice: number | null;
  ethSupport: string | undefined;
}

function EthereumPrice({ ethPrice, ethSupport }: Props) {
  if (!ethPrice) return <></>;
  return (
    <div className="flex flex-row justify-start items-center">
      <EthereumSVG
        style={{
          width: 20,
          height: 20,
          background: 'transparent',
          marginRight: 10,
        }}
      />
      <p>
        Current ETH Price: <Code>{formatToUSD(ethPrice)}</Code>
      </p>
    </div>
  );
}

export default EthereumPrice;
