import { createContext, useCallback, useMemo, useState } from 'react';
import { useWeb3 } from '../hooks/useWeb3';
import { Chaos__factory } from '../typechain';
import useAsyncEffect from 'use-async-effect';
import { defaultProvider } from '../utils/web3/connectors';
import { getTokenData } from '../utils/web3/chaos';

export interface ChaosTokenData {
  creatorAddress: string;
  creatorName: string;
  ownerAddress: string;
  ownerName?: string;
  htmlData: string;
  name: string;
  description?: string;
}

export interface FetchManagerState {
  allTokens: ChaosTokenData[];
  allTokenCount: number;
  userTokens: ChaosTokenData[];
  userTokenCount: number;
  fetchTokens: (
    startIndex: number,
    batchSize: number,
    ownerAddress?: string
  ) => ChaosTokenData[];
  fetchToken: (tokenId: number) => ChaosTokenData;
  loading: boolean;
}

export const FetchManagerContext = createContext<FetchManagerState>(
  {} as FetchManagerState
);

export default function FetchManager({ children }) {
  const { account } = useWeb3();
  const [allTokens, setAllTokens] = useState<ChaosTokenData[]>([]);
  const [userTokens, setAllUserTokens] = useState<ChaosTokenData[]>([]);
  const [allTokenCount, setAllTokenCount] = useState<number>(0);
  const [userTokenCount, setUserTokenCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  // Instantiate chaos contract
  const chaosContract = useMemo(() => {
    return Chaos__factory.connect(
      process.env.NEXT_PUBLIC_CHAOS_ADDRESS,
      defaultProvider
    );
  }, []);

  // Fetch user and all token counts
  useAsyncEffect(async () => {
    console.log({ chaosContract });
    if (!chaosContract) {
      return;
    }

    setLoading(true);

    if (account) {
      setUserTokenCount((await chaosContract.balanceOf(account)).toNumber());
    }

    setAllTokenCount((await chaosContract.totalSupply()).toNumber());
    setLoading(false);
  }, [account, chaosContract]);

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
    [chaosContract]
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
