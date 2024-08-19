import React from 'react';
import { Code } from '@nextui-org/react';

import { formatToUSD } from '@/utils';
import { EthereumSVG } from '@/assets/svg';

interface Props {
  price: number | null;
}

function EthereumPrice({ price }: Props) {
  if (!price) return <></>;
  return (
    <div className="flex flex-row items-start items-center">
      <EthereumSVG
        style={{ width: 20, height: 20, background: 'transparent' }}
      />
      <p>
        Current ETH Price: <Code>{formatToUSD(price)}</Code>
      </p>
    </div>
  );
}

export default EthereumPrice;
