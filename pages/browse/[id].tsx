import Root from '../../components/Root';
import { Box, Flex } from '@theme-ui/components';
import TokenViewer from '../../components/TokenViewer';
import { SX } from '../../styles/theme';
import { getTokenData } from '../../utils/web3/chaos';
import { Chaos__factory } from '../../typechain';
import { defaultProvider } from '../../utils/web3/connectors';

export default function Browse({ tokenData }) {
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
    </Root>
  );
}

export async function getStaticPaths() {
  const chaosContract = Chaos__factory.connect(
    process.env.NEXT_PUBLIC_CHAOS_ADDRESS,
    defaultProvider
  );
  const numTokens = (await chaosContract.totalSupply()).toNumber();

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
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  infoContainer: {
    flexDirection: 'column',
  },
};
