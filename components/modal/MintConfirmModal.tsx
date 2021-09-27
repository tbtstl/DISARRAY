import ModalContainer from './ModalContainer';
import { useMint } from '../../hooks/useMint';
import { Box } from '@theme-ui/components';
import theme from '../../styles/theme';
import { ChaosPreview } from '../ChaosPreview';

export default function MintConfirmModal() {
  const { name } = useMint();
  return (
    <ModalContainer title={'Mint'} canClose={true}>
      <Box>YOU ARE ABOUT TO MINT "{name}"</Box>
      <Box>
        <ChaosPreview takeScreenshots={true} />
      </Box>
      <Box sx={theme.button}>Confirm</Box>
    </ModalContainer>
  );
}
