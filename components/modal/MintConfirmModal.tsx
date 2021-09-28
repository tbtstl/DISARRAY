import ModalContainer from './ModalContainer';
import { useMint } from '../../hooks/useMint';
import { Box } from '@theme-ui/components';
import theme from '../../styles/theme';
import { DisarrayPreview } from '../DisarrayPreview';
import { useCallback, useEffect, useState } from 'react';
import { useWeb3 } from '../../hooks/useWeb3';
import { Disarray, Disarray__factory } from '../../typechain';
import { useRouter } from 'next/router';

enum MintingState {
  NOT_READY = 'NOT_READY',
  READY = 'READY',
  ERROR = 'ERROR',
  BROADCASTED = 'BROADCASTED',
  CONFIRMED = 'CONFIRMED',
}

export default function MintConfirmModal() {
  const { name, prepareMintData, ready } = useMint();
  const { library, account } = useWeb3();
  const router = useRouter();
  const [mintingState, setMintingState] = useState<MintingState>(
    MintingState.NOT_READY
  );

  useEffect(() => {
    if (ready && mintingState === MintingState.NOT_READY) {
      setMintingState(MintingState.READY);
    }
  }, [ready, mintingState, setMintingState]);

  const handleMint = useCallback(async () => {
    if (mintingState === MintingState.NOT_READY) {
      return;
    }
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
    const disarray = Disarray__factory.connect(
      process.env.NEXT_PUBLIC_DISARRAY_ADDRESS || '',
      await library.getSigner()
    );
    const data = prepareMintData();

    try {
      const tx = await disarray.mint(account, data);
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
    case MintingState.NOT_READY:
      'PREPARING...';
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
        <DisarrayPreview takeScreenshots={true} />
      </Box>
      <Box sx={theme.button} onClick={handleMint}>
        {buttonText}
      </Box>
    </ModalContainer>
  );
}
