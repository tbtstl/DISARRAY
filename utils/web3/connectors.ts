/*
 * Thanks Uniswap ❤️🦄
 * https://github.com/Uniswap/uniswap-interface/blob/master/src/connectors/index.ts
 */

import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { JsonRpcProvider } from "@ethersproject/providers";

export const NETWORK_URL = process.env.NEXT_PUBLIC_NETWORK_URL;
export const NETWORK_CHAIN_ID: number = parseInt(
  process.env.NEXT_PUBLIC_CHAIN_ID ?? "1"
);

if (typeof NETWORK_URL === "undefined") {
  throw new Error(
    `NEXT_PUBLIC_NETWORK_URL must be a defined environment variable`
  );
}

export const injected = new InjectedConnector({
  supportedChainIds: [NETWORK_CHAIN_ID],
});

export const walletconnect = new WalletConnectConnector({
  rpc: { [NETWORK_CHAIN_ID]: NETWORK_URL },
  qrcode: true,
  pollingInterval: 15000,
});

export const defaultProvider = new JsonRpcProvider(
  NETWORK_URL,
  NETWORK_CHAIN_ID
);

