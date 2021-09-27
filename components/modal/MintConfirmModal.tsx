import ModalContainer from './ModalContainer';
import { useMint } from '../../hooks/useMint';
import { ChaosSketch } from '../ChaosSketch';
import { Box } from '@theme-ui/components';
import theme from '../../styles/theme';

export default function MintConfirmModal() {
  const { script, name } = useMint();
  console.log('opening');
  return (
    <ModalContainer title={'Mint'} canClose={true}>
      <Box>YOU ARE ABOUT TO MINT "{name}"</Box>
      <Box>
        <ChaosSketch sketchCode={script} />
      </Box>
      <Box sx={theme.button}>Confirm</Box>
    </ModalContainer>
  );
}
