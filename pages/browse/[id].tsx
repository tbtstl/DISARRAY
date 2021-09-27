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
};
