import { useContext } from 'react';
import {
  FetchManagerContext,
  FetchManagerState,
} from '../providers/FetchManager';

export function useFetcher(): FetchManagerState {
  return useContext(FetchManagerContext);
}
