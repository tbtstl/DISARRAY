import { createContext, useCallback, useState } from 'react';
import { testScript } from '../utils/constants/testSketch';

export interface MintManagerState {
  script: string;
  htmlData?: string;
  image?: string;
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
    [state, setState]
  );

  const saveImageFromFrame = useCallback(
    (image: string) => {
      setState({ ...state, image });
    },
    [setState, state]
  );

  const prepareMintData = useCallback(() => {
    const data = {
      image: state.image,
      external_url: state.htmlData,
      description: state.description || '',
      name: state.name,
      animation_url: state.htmlData,
    };
    const dataJSONString = JSON.stringify(data);
    return `application/json;base64,${Buffer.from(dataJSONString).toString(
      'base64'
    )}`;
  }, [state]);

  return (
    <MintManagerContext.Provider
      value={{
        setScript,
        setName,
        saveHtmlFromFrame,
        saveImageFromFrame,
        prepareMintData,
        script: state.script,
        name: state.name,
        description: state.description,
        htmlData: state.htmlData,
      }}
    >
      {children}
    </MintManagerContext.Provider>
  );
}
