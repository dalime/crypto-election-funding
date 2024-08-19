import React from 'react';
import { Code } from '@nextui-org/react';

import { formatToUSD } from '@/utils';
import { EthereumSVG, CoinGeckoSVG } from '@/assets/svg';

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
          width: 30,
          height: 30,
          background: 'transparent',
          marginRight: 10,
        }}
      />
      <p>
        Current ETH Price: <Code>{formatToUSD(ethPrice)}</Code>
      </p>
      <CoinGeckoSVG style={{ width: 28, height: 28, marginLeft: 10 }} />
    </div>
  );
}

export default EthereumPrice;
