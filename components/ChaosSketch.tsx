import React, { useCallback, useEffect, useRef } from 'react';
import { isClientSide } from '../utils/constants/window';
import {
  encodedBaseHtml,
  encodedScript,
  testScript,
} from '../utils/constants/testSketch'; //Import this for typechecking and intellisense

export function ChaosSketch({ sketchCode }: { sketchCode: string }) {
  const frame = useRef<HTMLIFrameElement>();

  const handleFrameLoad = useCallback(() => {
    const encoded = Buffer.from(sketchCode).toString('base64');
    const script = `data:text/javascript;base64,${encoded}`;

    frame.current?.contentWindow?.postMessage(script, '*');
  }, [frame, sketchCode]);

  useEffect(() => {
    handleFrameLoad();
  }, [frame.current, sketchCode]);

  if (!isClientSide) {
    return null;
  }

  return (
    <iframe
      src={`${encodedBaseHtml}`}
      ref={frame}
      height={500}
      width={500}
      frameBorder="0"
      sandbox="allow-pointer-lock
      allow-same-origin allow-scripts"
      onLoad={handleFrameLoad}
    />
  );
}
