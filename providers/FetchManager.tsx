import { createContext, useCallback, useMemo, useState } from 'react';
import { useWeb3 } from '../hooks/useWeb3';
import { Disarray__factory } from '../typechain';
import useAsyncEffect from 'use-async-effect';
import { defaultProvider } from '../utils/web3/connectors';
import { getTokenData } from '../utils/web3/disarray';

export interface DisarrayTokenData {
  creatorAddress: string;
  creatorName: string;
  ownerAddress: string;
  ownerName?: string;
  htmlData: string;
  name: string;
  description?: string;
}

export interface FetchManagerState {
  allTokens: DisarrayTokenData[];
  allTokenCount: number;
  userTokens: DisarrayTokenData[];
  userTokenCount: number;
  fetchTokens: (
    startIndex: number,
    batchSize: number,
    ownerAddress?: string
  ) => DisarrayTokenData[];
  fetchToken: (tokenId: number) => DisarrayTokenData;
  loading: boolean;
}

export const FetchManagerContext = createContext<FetchManagerState>(
  {} as FetchManagerState
);

export default function FetchManager({ children }) {
  const { account } = useWeb3();
  const [allTokens, setAllTokens] = useState<DisarrayTokenData[]>([]);
  const [userTokens, setAllUserTokens] = useState<DisarrayTokenData[]>([]);
  const [allTokenCount, setAllTokenCount] = useState<number>(0);
  const [userTokenCount, setUserTokenCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  // Instantiate disarray contract
  const disarrayContract = useMemo(() => {
    return Disarray__factory.connect(
      process.env.NEXT_PUBLIC_DISARRAY_ADDRESS,
      defaultProvider
    );
  }, []);

  // Fetch user and all token counts
  useAsyncEffect(async () => {
    if (!disarrayContract) {
      return;
    }

    setLoading(true);

    if (account) {
      setUserTokenCount((await disarrayContract.balanceOf(account)).toNumber());
    }

    setAllTokenCount((await disarrayContract.totalSupply()).toNumber());
    setLoading(false);
  }, [account, disarrayContract]);

  const fetchAllTokens = useCallback(
    async (startIndex: number, batchSize: number) => {
      const batch = [];
      const lastIndex = Math.min(startIndex + batchSize, allTokenCount);

      if (startIndex >= lastIndex) {
        return;
      }

      for (let i = startIndex; i < lastIndex; i++) {
        batch.push(await getTokenData(i));
      }

      setAllTokens(allTokens.concat(batch));
    },
    [allTokenCount, getTokenData]
  );

  const fetchTokens = useCallback(
    async (startIndex = 0, batchSize = 10, ownerAddress) => {
      setLoading(true);
      const batch = [];
      if (!ownerAddress) {
        await fetchAllTokens(startIndex, batchSize);
      }
      setLoading(false);
    },
    [fetchAllTokens]
  );

  const fetchToken = useCallback(
    async (tokenId) => {
      try {
        setLoading(true);
        return getTokenData(tokenId);
      } catch (e) {
        console.error(e);
        return {};
      } finally {
        setLoading(false);
      }
    },
    [disarrayContract]
  );

  return (
    <FetchManagerContext.Provider
      value={{
        allTokens,
        allTokenCount,
        userTokens,
        userTokenCount,
        fetchTokens,
        fetchToken,
        loading,
      }}
    >
      {children}
    </FetchManagerContext.Provider>
  );
}
