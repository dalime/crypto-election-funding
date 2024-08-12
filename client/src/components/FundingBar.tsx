'use client';

import React from 'react';
import { Slider } from '@nextui-org/react';

function FundingBar({
  amount,
  num,
  candidate,
}: {
  amount: number | undefined;
  num: number | undefined;
  candidate: 'Trump' | 'Kamala';
}) {
  return (
    <Slider
      size="md"
      color={candidate === 'Trump' ? 'danger' : 'primary'}
      maxValue={100}
      value={amount}
      minValue={0}
      orientation="vertical"
      aria-label="Temperature"
      defaultValue={0}
      hideThumb
      startContent={<p>100 ETH</p>}
      endContent={<p>0 ETH</p>}
    />
  );
}

export default FundingBar;
