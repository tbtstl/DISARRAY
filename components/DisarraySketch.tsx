import React, { useCallback, useEffect, useRef } from 'react';
import { isClientSide } from '../utils/constants/window';
import {
  encodedBaseHtml,
  encodedScript,
  testScript,
} from '../utils/constants/testSketch';
import { useMint } from '../hooks/useMint';

export function DisarraySketch({ sketchCode }: { sketchCode: string }) {
  const frame = useRef<HTMLIFrameElement>();
  const { saveHtmlFromFrame } = useMint();

  const handleFrameLoad = useCallback(() => {
    const encoded = Buffer.from(sketchCode).toString('base64');
    const script = `data:text/javascript;base64,${encoded}`;

    frame.current?.contentWindow?.postMessage(['newScript', script], '*');
  }, [frame, sketchCode]);

  useEffect(() => {
    handleFrameLoad();
  }, [frame.current, sketchCode]);

  useEffect(() => {
    const onMessage = (e: MessageEvent<any>) => {
      if (e.data?.length && e.data.length === 2 && e.data[0] == 'newScript') {
        saveHtmlFromFrame(e.data[1]);
      }
    };

    window.addEventListener('message', onMessage);

    return () => {
      window.removeEventListener('message', onMessage);
    };
  });

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
