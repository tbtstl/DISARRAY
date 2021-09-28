import { Web3ReactContextInterface } from '@web3-react/core/dist/types';
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { injected, walletconnect } from '../utils/web3/connectors';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import useAsyncEffect from 'use-async-effect';
import { getFriendlyAddress } from '../utils/web3/addresses';
import { JsonRpcProvider } from '@ethersproject/providers';

export enum Web3Status {
  NOT_READY = 'NOT_READY',
  ERROR = 'ERROR',
  READY = 'READY',
}

export interface Web3ManagerState extends Web3ReactContextInterface<any> {
  isWrongNetwork: boolean;
  hasInjected: boolean;
  status: Web3Status;
  friendlyName?: string;
}

export const Web3ManagerContext = createContext<Web3ManagerState>(
  {} as Web3ManagerState
);

export enum ConnectorType {
  WALLETCONNECT = 'WALLETCONNECT',
  INJECTED = 'INJECTED',
}

const connectorLookup: {
  [key: string]: AbstractConnector;
} = {
  [ConnectorType.WALLETCONNECT]: walletconnect,
  [ConnectorType.INJECTED]: injected,
};

export default function Web3ReactManager({ children }: { children: any }) {
  const web3react = useWeb3React();
  const [hasInjected, setHasInjected] = useState<boolean>(false);
  const [status, setStatus] = useState<Web3Status>(Web3Status.NOT_READY);
  const [friendlyName, setFriendlyName] = useState<string>();
  const { active, activate, error, deactivate, connector, account, library } =
    web3react;

  const handleDeactivate = useCallback(async () => {
    deactivate();
    if (connector instanceof WalletConnectConnector) {
      await connector.close();
    }
  }, [connector, deactivate]);

  const handleActivate = useCallback(
    async (
      connector: AbstractConnector,
      onError?: (error: Error) => void,
      throwErrors?: boolean
    ) => {
      if (status === Web3Status.READY) {
        await handleDeactivate();
      }

      if (
        connector instanceof WalletConnectConnector &&
        connector.walletConnectProvider?.wc?.uri
      ) {
        connector.walletConnectProvider = undefined;
      }

      await activate(connector, onError, throwErrors);
    },
    [connector, activate]
  );

  const isWrongNetwork = useMemo(
    () => (error ? error instanceof UnsupportedChainIdError : false),
    [error]
  );

  useEffect(() => {
    // @ts-ignore
    if (!hasInjected && window && window.ethereum) {
      setHasInjected(true);
    }
  }, [hasInjected]);

  useEffect(() => {
    if (!active && !error && status !== Web3Status.NOT_READY) {
      setStatus(Web3Status.NOT_READY);
    }
  }, [active, error, status]);

  useEffect(() => {
    if (status !== Web3Status.ERROR && error) {
      setStatus(Web3Status.ERROR);
    }
  }, [error, status]);

  useEffect(() => {
    if (active && !error && status !== Web3Status.READY) {
      setStatus(Web3Status.READY);
    }
  }, [active, error, status]);

  useAsyncEffect(
    async (isMounted) => {
      if (!active || !account || !library) {
        return;
      }
      try {
        const ensName = await library.lookupAddress(account);

        if (ensName) {
          setFriendlyName(ensName);
        } else {
          setFriendlyName(getFriendlyAddress(account));
        }
      } catch (e) {
        setFriendlyName(getFriendlyAddress(account));
      }
    },
    [active, account, library]
  );

  return (
    <Web3ManagerContext.Provider
      value={{
        ...web3react,
        status,
        hasInjected,
        isWrongNetwork,
        deactivate: handleDeactivate,
        activate: handleActivate,
        friendlyName,
      }}
    >
      {children}
    </Web3ManagerContext.Provider>
  );
}
