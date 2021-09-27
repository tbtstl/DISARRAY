import React, { useCallback, useEffect, useRef } from 'react';
import { isClientSide } from '../utils/constants/window';
import { useMint } from '../hooks/useMint';

export function ChaosSketch({ sketchCode }: { sketchCode: string }) {
  const { htmlData } = useMint();

  if (!isClientSide) {
    return null;
  }

  return (
    <iframe
      src={`${htmlData}`}
      height={500}
      width={500}
      frameBorder="0"
      sandbox="allow-pointer-lock allow-same-origin allow-scripts"
    />
  );
}
