import ModalContainer from './ModalContainer';
import { useMint } from '../../hooks/useMint';
import { Box } from '@theme-ui/components';
import theme from '../../styles/theme';
import { ChaosPreview } from '../ChaosPreview';
import { useCallback, useState } from 'react';
import { useWeb3 } from '../../hooks/useWeb3';
import { Chaos, Chaos__factory } from '../../typechain';
import { useRouter } from 'next/router';

enum MintingState {
  READY = 'READY',
  ERROR = 'ERROR',
  BROADCASTED = 'BROADCASTED',
  CONFIRMED = 'CONFIRMED',
}

export default function MintConfirmModal() {
  const { name, prepareMintData } = useMint();
  const { library, account } = useWeb3();
  const router = useRouter();
  const [mintingState, setMintingState] = useState<MintingState>(
    MintingState.READY
  );

  const handleMint = useCallback(async () => {
    if (!account) {
      console.error('No account found');
      setMintingState(MintingState.ERROR);
      return;
    }
    if (mintingState === MintingState.CONFIRMED) {
      setMintingState(MintingState.READY);
      await router.push('/');
    }
    if (mintingState !== MintingState.READY) {
      return;
    }
    const chaos = Chaos__factory.connect(
      process.env.NEXT_PUBLIC_CHAOS_ADDRESS || '',
      await library.getSigner()
    );
    const data = prepareMintData();

    try {
      const tx = await chaos.mint(account, data);
      setMintingState(MintingState.BROADCASTED);
      await tx.wait();
      setMintingState(MintingState.CONFIRMED);
    } catch (e) {
      console.error(e);
      setMintingState(MintingState.ERROR);
    }
  }, [mintingState]);

  let buttonText;
  switch (mintingState) {
    case MintingState.BROADCASTED:
      buttonText = 'AWAITING CONFIRMATION';
    case MintingState.CONFIRMED:
      buttonText = 'CONFIRMED. CLICK TO CLOSE';
    case MintingState.ERROR:
      buttonText = 'SOMETHING WENT WRONG, TRY AGAIN';
    default:
      buttonText = 'MINT';
  }

  return (
    <ModalContainer title={'Mint'} canClose={true}>
      <Box>YOU ARE ABOUT TO MINT "{name}"</Box>
      <Box>
        <ChaosPreview takeScreenshots={true} />
      </Box>
      <Box sx={theme.button} onClick={handleMint}>
        {buttonText}
      </Box>
    </ModalContainer>
  );
}
