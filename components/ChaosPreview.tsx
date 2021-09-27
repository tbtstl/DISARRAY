import React, { useCallback, useEffect, useRef } from 'react';
import { isClientSide } from '../utils/constants/window';
import { useMint } from '../hooks/useMint';
import useInterval from '../hooks/useInterval';

export function ChaosPreview({
  takeScreenshots = false,
}: {
  takeScreenshots: boolean;
}) {
  const { htmlData, saveImageFromFrame } = useMint();
  const frame = useRef<HTMLIFrameElement>();

  if (!isClientSide) {
    return null;
  }

  useEffect(() => {
    const onMessage = (e: MessageEvent<any>) => {
      if (e.data?.length && e.data.length === 2 && e.data[0] == 'postImage') {
        saveImageFromFrame(e.data[1]);
      }
    };

    window.addEventListener('message', onMessage);

    return () => {
      window.removeEventListener('message', onMessage);
    };
  });

  useInterval(
    () => {
      if (takeScreenshots) {
        frame.current?.contentWindow?.postMessage(['postImage', null], '*');
      }
    },
    takeScreenshots ? 1000 : null
  );

  return (
    <iframe
      src={htmlData}
      height={500}
      width={500}
      frameBorder="0"
      ref={frame}
      sandbox="allow-pointer-lock allow-same-origin allow-scripts"
    />
  );
}
