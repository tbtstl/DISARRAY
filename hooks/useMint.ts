import { useContext } from 'react';
import { MintManagerContext, MintManagerState } from '../providers/MintManager';

export function useMint(): MintManagerState {
  return useContext(MintManagerContext);
}
