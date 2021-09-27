import { createContext, useCallback, useState } from 'react';
import { testScript } from '../utils/constants/testSketch';

export interface MintManagerState {
  script: string;
  htmlData?: string;
  name?: string;
  description?: string;
}

export const MintManagerContext = createContext<MintManagerState>({});

export default function MintManager({ children }) {
  const [state, setState] = useState<MintManagerState>({ script: testScript });

  const setScript = useCallback(
    (script: string) => {
      setState({ ...state, script });
    },
    [state, setState]
  );

  const setName = useCallback(
    (name: string) => {
      setState({ ...state, name });
    },
    [state, setState]
  );

  const setDescription = useCallback(
    (description: string) => {
      setState({ ...state, description });
    },
    [state, setState]
  );

  const saveHtmlFromFrame = useCallback(
    (frame: HTMLIFrameElement) => {
      const content = frame.contentDocument.documentElement.outerHTML;
      console.log({ content });
      const encoded = Buffer.from(content).toString('base64');
      console.log({ encoded });
      setState({ ...state, htmlData: `text/html;base64,${encoded}` });
    },
    [state]
  );

  return (
    <MintManagerContext.Provider
      value={{
        setScript,
        setName,
        setDescription,
        saveHtmlFromFrame,
        script: state.script,
        name: state.name,
        description: state.description,
      }}
    >
      {children}
    </MintManagerContext.Provider>
  );
}
