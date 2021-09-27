import { Box, Flex } from '@theme-ui/components';
import { useFetcher } from '../hooks/useFetcher';
import { useState } from 'react';
import { ChaosTokenData } from '../providers/FetchManager';
import useAsyncEffect from 'use-async-effect';
import SandboxIFrame from './SandboxIFrame';

export default function TokenViewer({
  tokenData,
}: {
  tokenData: ChaosTokenData;
}) {
  return (
    <Flex>
      <Box>
        <SandboxIFrame src={tokenData?.htmlData} frameBorder="0" />
      </Box>
    </Flex>
  );
}
