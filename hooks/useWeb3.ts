import { useContext } from "react";
import {
  Web3ManagerContext,
  Web3ManagerState,
} from "../providers/Web3ReactManager";

export function useWeb3(): Web3ManagerState {
  return useContext(Web3ManagerContext);
}