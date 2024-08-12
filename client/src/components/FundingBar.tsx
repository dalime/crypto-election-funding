'use client';

import React from 'react';
import { Slider } from '@nextui-org/react';

import { roundTo6Decimals } from '@/utils';

function FundingBar({
  amount,
  num,
  candidate,
}: {
  amount: number | undefined;
  num: number | undefined;
  candidate: 'Trump' | 'Kamala';
}) {
  console.log('candidate', candidate, 'amount', amount, ', max: ', 1);

  return (
    <Slider
      size="md"
      color={candidate === 'Trump' ? 'danger' : 'primary'}
      step={0.0001}
      maxValue={1}
      value={amount}
      minValue={0}
      orientation="vertical"
      aria-label="Temperature"
      defaultValue={0}
      hideThumb
      startContent={<label style={{ whiteSpace: 'nowrap' }}>1 ETH</label>}
      endContent={<label>{amount ? roundTo6Decimals(amount) : 0} ETH</label>}
    />
  );
}

export default FundingBar;
