import ModalContainer from './ModalContainer';
import { useMint } from '../../hooks/useMint';
import { Box } from '@theme-ui/components';
import theme from '../../styles/theme';
import { DisarrayPreview } from '../DisarrayPreview';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useWeb3 } from '../../hooks/useWeb3';
import { Disarray, Disarray__factory } from '../../typechain';
import { useRouter } from 'next/router';
import { useModal } from '../../hooks/useModal';

enum MintingState {
  NOT_READY = 'NOT_READY',
  READY = 'READY',
  WAITING = 'WAITING',
  ERROR = 'ERROR',
  BROADCASTED = 'BROADCASTED',
  CONFIRMED = 'CONFIRMED',
}

export default function MintConfirmModal() {
  const { name, prepareMintData, ready } = useMint();
  const { library, account } = useWeb3();
  const router = useRouter();
  const { closeModal } = useModal();
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
    if (mintingState === MintingState.ERROR) {
      setMintingState(MintingState.READY);
    }
    if (mintingState === MintingState.CONFIRMED) {
      closeModal();
      await router.push('/');
      setMintingState(MintingState.READY);
    }
    if (
      ![MintingState.READY, MintingState.ERROR].includes(mintingState as any)
    ) {
      return;
    }
    const disarray = Disarray__factory.connect(
      process.env.NEXT_PUBLIC_DISARRAY_ADDRESS || '',
      await library.getSigner()
    ) as Disarray;
    const data = prepareMintData();

    try {
      setMintingState(MintingState.WAITING);
      const tx = await disarray.mint(account, data);
      setMintingState(MintingState.BROADCASTED);
      await tx.wait();
      setMintingState(MintingState.CONFIRMED);
    } catch (e) {
      console.error(e);
      setMintingState(MintingState.ERROR);
    }
  }, [mintingState]);

  const buttonText = useMemo(() => {
    switch (mintingState) {
      case MintingState.NOT_READY:
        return 'PREPARING...';
      case MintingState.WAITING:
        return 'CHECK YOUR WALLET TO CONFIRM';
      case MintingState.BROADCASTED:
        return 'AWAITING CONFIRMATION';
      case MintingState.CONFIRMED:
        return 'CONFIRMED. CLICK TO CLOSE';
      case MintingState.ERROR:
        return 'SOMETHING WENT WRONG, TRY AGAIN';
      default:
        return 'MINT';
    }
  }, [mintingState]);

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
