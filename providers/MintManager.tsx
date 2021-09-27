import {
  createContext,
  IframeHTMLAttributes,
  MutableRefObject,
  useCallback,
  useRef,
  useState,
} from 'react';
import { testScript } from '../utils/constants/testSketch';

export interface MintManagerState {
  script: string;
  htmlData?: string;
  name?: string;
  description?: string;
}

export const MintManagerContext = createContext<MintManagerState>(
  {} as MintManagerState
);

export default function MintManager({ children }) {
  const [state, setState] = useState<MintManagerState>({ script: testScript });

  const setScript = useCallback(
    (script: string) => {
      setState({ ...state, script });
    },
    [state, setState]
  );

  const setName = useCallback(
    (name: string, description?: string) => {
      setState({ ...state, name, description });
    },
    [state, setState]
  );

  const saveHtmlFromFrame = useCallback(
    (content: string) => {
      const encoded = Buffer.from(content).toString('base64');
      setState({ ...state, htmlData: `data:text/html;base64,${encoded}` });
    },
    [state]
  );

  return (
    <MintManagerContext.Provider
      value={{
        setScript,
        setName,
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
