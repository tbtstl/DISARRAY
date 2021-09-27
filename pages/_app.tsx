import type { AppProps } from 'next/app';
import getLibrary from '../utils/web3/getLibrary';
import Web3ReactManager from '../providers/Web3ReactManager';
import { ThemeProvider } from '@theme-ui/core';
import theme from '../styles/theme';
import ModalManager from '../providers/ModalManager';
import { Web3ReactProvider } from '@web3-react/core';
import MintManager from '../providers/MintManager';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ReactManager>
        <ThemeProvider theme={theme}>
          <MintManager>
            <ModalManager>
              <Component {...pageProps} />
            </ModalManager>
          </MintManager>
        </ThemeProvider>
      </Web3ReactManager>
    </Web3ReactProvider>
  );
}
