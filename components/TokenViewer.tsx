import { Box, Flex } from '@theme-ui/components';
import { useFetcher } from '../hooks/useFetcher';
import { useState } from 'react';
import { ChaosTokenData } from '../providers/FetchManager';
import useAsyncEffect from 'use-async-effect';
import { Simulate } from 'react-dom/test-utils';
import SandboxIFrame from './SandboxIFrame';

export default function TokenViewer({ tokenId }: { tokenId: number }) {
  const { loading, fetchToken } = useFetcher();
  const [tokenData, setTokenData] = useState<ChaosTokenData>();

  useAsyncEffect(async () => {
    if (!tokenData && !loading) {
      setTokenData(await fetchToken(tokenId));
    }
  }, [tokenData, setTokenData, fetchToken]);

  if (loading) {
    return null;
  }

  return (
    <Flex>
      <Box>
        <SandboxIFrame src={tokenData?.htmlData} frameborder="0" />
      </Box>
    </Flex>
  );
}
