import { ModalContext, ModalManagerContext } from "../providers/ModalManager";
import { useContext } from "react";

export function useModal(): ModalContext {
  return useContext(ModalManagerContext);
}