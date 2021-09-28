import ModalRoot from '../components/modal/ModalRoot';
import { createContext, useCallback, useState } from 'react';
import Web3ConnectModal from '../components/modal/Web3ConnectModal';
import MintConfirmModal from '../components/modal/MintConfirmModal';
import MintFormModal from '../components/modal/MintFormModal';

export enum ModalType {
  NONE,
  WEB3_CONNECT,
  MINT_FORM,
  MINT_CONFIRM,
}

const modalMap: Record<ModalType, JSX.Element | null> = {
  [ModalType.NONE]: null,
  [ModalType.WEB3_CONNECT]: <Web3ConnectModal />,
  [ModalType.MINT_FORM]: <MintFormModal />,
  [ModalType.MINT_CONFIRM]: <MintConfirmModal />,
};

export interface ModalContext {
  modalType: ModalType;
  openModal: (modalType: ModalType) => void;
  closeModal: () => void;
}

export const ModalManagerContext = createContext<ModalContext>(
  {} as ModalContext
);

export default function ModalManager({ children }: { children: any }) {
  const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);

  const openModal = useCallback((mt: ModalType) => {
    setModalType(mt);
  }, []);

  const closeModal = useCallback(() => {
    setModalType(ModalType.NONE);
  }, []);

  return (
    <ModalManagerContext.Provider
      value={{
        modalType,
        openModal,
        closeModal,
      }}
    >
      <ModalRoot showModal={modalType !== ModalType.NONE}>
        {modalMap[modalType]}
      </ModalRoot>
      {children}
    </ModalManagerContext.Provider>
  );
}
