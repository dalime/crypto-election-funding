'use client';

import React from 'react';
import { Slider } from '@nextui-org/react';

function FundingBar() {
  return (
    <Slider
      size="md"
      color="success"
      step={0.01}
      maxValue={1}
      minValue={0}
      orientation="vertical"
      aria-label="Temperature"
      defaultValue={0.6}
    />
  );
}

export default FundingBar;
