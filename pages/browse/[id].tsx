import Root from '../../components/Root';
import { Box, Flex } from '@theme-ui/components';
import TokenViewer from '../../components/TokenViewer';
import theme, { SX } from '../../styles/theme';
import { getTokenData } from '../../utils/web3/disarray';
import { Disarray__factory } from '../../typechain';
import { defaultProvider } from '../../utils/web3/connectors';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useFetcher } from '../../hooks/useFetcher';

export default function Browse({ tokenData }) {
  const router = useRouter();
  const { allTokenCount } = useFetcher();

  const handlePrev = useCallback(async () => {
    const id = parseInt(router.query.id as string);

    if (id === 0) {
      await router.push('/');
    } else {
      await router.push(`/browse/${id - 1}`);
    }
  }, [router]);

  const handleNext = useCallback(async () => {
    const id = parseInt(router.query.id as string);

    if (id === allTokenCount - 1) {
      await router.push('/create');
    } else {
      await router.push(`/browse/${id + 1}`);
    }
  }, [router, allTokenCount]);

  return (
    <Root>
      <Flex sx={sx.flexContainer}>
        <Box>
          <TokenViewer tokenData={tokenData} />
        </Box>
        <Box>
          <Flex sx={sx.infoContainer}>
            <Box style={{ height: 60 }}>
              <h1>"{tokenData.name}"</h1>
            </Box>
            <Box style={{ flex: 1 }}>
              <h5>{tokenData.description}</h5>
            </Box>
            {tokenData.creatorAddress === tokenData.ownerAddress ? (
              <Box style={{ height: 60 }}>
                Created and Owned by <h5>{tokenData.creatorAddress}</h5>
              </Box>
            ) : (
              <>
                <Box style={{ height: 60 }}>
                  Created by <h5>{tokenData.creatorAddress}</h5>
                </Box>
                <Box style={{ height: 60 }}>
                  Owned by <h5>{tokenData.ownerAddress}</h5>
                </Box>
              </>
            )}
          </Flex>
        </Box>
      </Flex>
      <Flex sx={sx.navContainer}>
        <Box onClick={handlePrev} sx={theme.button}>
          ← Prev
        </Box>
        <Box sx={theme.button} onClick={handleNext}>
          Next →
        </Box>
      </Flex>
    </Root>
  );
}

export async function getStaticPaths() {
  const disarrayContract = Disarray__factory.connect(
    process.env.NEXT_PUBLIC_DISARRAY_ADDRESS,
    defaultProvider
  );
  const numTokens = (await disarrayContract.totalSupply()).toNumber();

  const paths = [...Array(numTokens).keys()].map((id) => ({
    params: { id: id.toString() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps(context) {
  const tokenData = await getTokenData(parseInt(context.params.id));
  return {
    props: {
      tokenData,
    },
    revalidate: 60,
  };
}

const sx: SX = {
  flexContainer: {
    height: '85%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  infoContainer: {
    flexDirection: 'column',
  },
  navContainer: {
    height: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },
};
