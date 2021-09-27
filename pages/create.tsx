import Root from '../components/Root';
import { Box, Flex } from '@theme-ui/components';
import { ChaosSketch } from '../components/ChaosSketch';
import SketchEditor from '../components/SketchEditor';
import { SX } from '../styles/theme';
import { useMint } from '../hooks/useMint';

export default function Create() {
  const { script } = useMint();
  return (
    <Root>
      <Flex sx={sx.createContainer}>
        <Box>
          <ChaosSketch sketchCode={script} />
        </Box>
        <Box>
          <SketchEditor />
        </Box>
      </Flex>
    </Root>
  );
}

const sx: SX = {
  createContainer: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
};
