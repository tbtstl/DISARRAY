import Root from '../components/Root';
import { Box, Flex } from '@theme-ui/components';
import { DisarraySketch } from '../components/DisarraySketch';
import SketchEditor from '../components/SketchEditor';
import { SX } from '../styles/theme';
import { useMint } from '../hooks/useMint';

export default function Create() {
  const { script } = useMint();
  return (
    <Root>
      <Flex sx={sx.createContainer}>
        <Box>
          <DisarraySketch sketchCode={script} />
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
