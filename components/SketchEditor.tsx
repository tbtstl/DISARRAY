import dynamic from 'next/dynamic';
import '@uiw/react-textarea-code-editor/dist.css';
import { useCallback, useState } from 'react';
import { Box } from '@theme-ui/components';
import theme from '../styles/theme';
import { useWeb3 } from '../hooks/useWeb3';
import { useModal } from '../hooks/useModal';
import { ModalType } from '../providers/ModalManager';
import { useMint } from '../hooks/useMint';

const CodeEditor = dynamic(
  () => import('@uiw/react-textarea-code-editor').then((mod) => mod.default),
  { ssr: false }
);

export default function SketchEditor() {
  const { script, setScript } = useMint();
  const [code, setCode] = useState<string>(script);
  const { account } = useWeb3();
  const { openModal } = useModal();

  const handleChange = useCallback((e) => {
    setCode(e.target.value);
  }, []);

  const handleRunClick = useCallback(() => {
    setScript(code);
  }, [code]);

  const handleMintClick = useCallback(() => {
    if (!account) {
      openModal(ModalType.WEB3_CONNECT);
    } else {
      // TODO open mint flow
    }
  }, []);

  return (
    <>
      <CodeEditor
        value={script}
        language="js"
        placeholder="Please enter JS code."
        padding={15}
        onChange={handleChange}
        style={{
          fontSize: 12,
          backgroundColor: '#f5f5f5',
          fontFamily:
            'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
          textTransform: 'none',
        }}
      />
      <Box
        onClick={handleRunClick}
        sx={theme.button}
        style={{ textAlign: 'center' }}
      >
        Run
      </Box>
      <Box
        sx={theme.button}
        style={{ textAlign: 'center' }}
        onClick={handleMintClick}
      >
        {account ? 'Mint' : 'Connect to Mint'}
      </Box>
    </>
  );
}
