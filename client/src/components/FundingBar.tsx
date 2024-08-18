'use client';

import React from 'react';
import { Slider } from '@nextui-org/react';
import { useMediaQuery } from 'react-responsive';

import { roundTo6Decimals } from '@/utils';

function FundingBar({ amount }: { amount: number | undefined }) {
  // Hooks
  const isMobile = useMediaQuery({ query: '(max-width: 500px)' });

  return (
    <Slider
      size="md"
      color="success"
      step={0.000001}
      maxValue={1}
      value={amount}
      minValue={0}
      orientation="vertical"
      aria-label="Temperature"
      defaultValue={0}
      hideThumb
      startContent={
        <label
          className={isMobile ? 'text-xs' : ''}
          style={{ whiteSpace: 'nowrap' }}
        >
          1 ETH
        </label>
      }
      endContent={
        <label className={isMobile ? 'text-sm' : ''}>
          {amount ? roundTo6Decimals(amount) : 0} ETH
        </label>
      }
    />
  );
}

export default FundingBar;
