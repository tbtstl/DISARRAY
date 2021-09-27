import Root from '../components/Root';
import { Box, Flex } from '@theme-ui/components';
import { useFetcher } from '../hooks/useFetcher';
import { FetchManagerState } from '../providers/FetchManager';
import { useState } from 'react';
import TokenViewer from '../components/TokenViewer';

export default function Browse() {
  const { allTokens, loading } = useFetcher<FetchManagerState>();
  const [currIndex, setCurrIndex] = useState(0);

  return (
    <Root>
      <Flex>
        <TokenViewer tokenId={0} />
      </Flex>
    </Root>
  );
}
